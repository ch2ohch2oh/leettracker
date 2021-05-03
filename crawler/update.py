#!/usr/bin/env python3
import argparse
import os
import sys
import pymongo
import logging
import time

import leetcode

logging.basicConfig(
    format='%(asctime)s %(levelname)s %(message)s',
    level=logging.INFO,
    datefmt='%Y-%m-%d %H:%M:%S')

from db import get_db

def update_user(username: str):
    '''Update user info and submissions from leetcode and save to db'''
    user_info = leetcode.get_user_info(username)
    if not user_info:
        logging.info(f'User not found on leetcode: {username}')
        return
    # Save userinfo to db
    db = get_db()
    db['users'].replace_one({'username': user_info['username']}, user_info, upsert=True)
    subs = leetcode.get_user_submissions(username)
    if subs:
        # Also save submissions
        for sub in subs:
            sub['username'] = username
            db['submissions'].replace_one({
                'username': sub['username'],
                'timestamp': sub['timestamp']},
                sub, upsert=True
            )

def update_problems():
    '''Update the problems from leetcode and write to db'''
    logging.info(f'Updating list of problems from leetcode')
    probs = leetcode.get_problems()
    if not probs:
        return 
    db = get_db()
    for p in probs:
        db.problems.replace_one({'question_id': p['question_id']}, p, upsert=True)
    logging.info(f'{len(probs)} problems found on leetcode')

def update_active_users():
    '''Update the list of active users based on discussion posts then update
    their user info and submissions and write to db'''
    logging.info("Updating active users based leetcode discussion posts")

    db = get_db()
    probs = list(db.problems.find({}))
    users = []
    unique_usernames = set()
    for prob in probs:
        users = leetcode.get_active_users(prob['question_id'])
        for user in users:
            username = user['username']
            # logging.info(username)
            if username in unique_usernames:
                continue
            unique_usernames.add(username)
            # Update submissions and user info
            update_user(username)
    logging.info(f"Updated info for {len(unique_usernames)} active discussion posters")
    
def update_all_user_submissions():
    '''Update submissions for all users in the db'''
    # First get all users from db
    db = get_db()
    users = db.users.find()
    logging.info('Updating all user submissions in the db')
    for user in users:
        update_user_submissions(user['username'])

def update_pending_users():
    '''Poll the db for pending users then add their info to db.
    This function does not end'''
    logging.info('Polling pending users from mongodb')
    db = get_db()
    while True:
        time.sleep(1)
        users = db.pending_users.find()
        if not users:
            continue
        for user in users:
            username = user['username']
            logging.info(f'Updated pending user {username}')
            update_user(username)
            db.pending_users.delete_one({'username': username})

def get_args():
    '''Get arguments from cmdline'''
    parser = argparse.ArgumentParser()
    parser.add_argument('--username', help='username to update')
    parser.add_argument('--problems', action='store_true', help='update the problems or not')
    parser.add_argument('--active_users', action='store_true', help='update active user list or not')
    parser.add_argument('--pending_users', action='store_true', help='update pending users')
    return parser.parse_args()
    
if __name__ == '__main__':
    args = get_args()
    username = args.username
    
    if username:
        update_user(username)
    elif args.problems:
        update_problems()
    elif args.active_users:
        update_active_users()
    elif args.pending_users:
        update_pending_users()
    else:
        update_all_user_submissions()
    
    logging.info('Done')
