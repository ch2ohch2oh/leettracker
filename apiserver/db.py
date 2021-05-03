import pymongo
import os
import logging

DB_NAME = os.environ.get('DB_NAME') or 'test'
DB_HOST = os.environ.get('DB_HOST') or 'mongodb://localhost'

def get_recent_submissions(username, limit=20):
    '''Get recent submissions'''
    print(f'get_recent_submissions: {username}')
    client = pymongo.MongoClient(DB_HOST)
    db = client[DB_NAME]
    query = {}
    if username:
        query['username'] = username

    data = list(db.submissions.find(query, {'_id': 0}).sort('timestamp', -1).limit(limit))
    client.close()
    return data

def get_user_info(username):
    '''Get user info'''
    print(f'get_user_info: {username}')
    client = pymongo.MongoClient(DB_HOST)
    db = client[DB_NAME]
    data = db.users.find_one({'username': username}, {'_id': 0})
    client.close()
    return data

def push_pending_user(username):
    client = pymongo.MongoClient(DB_HOST)
    db = client[DB_NAME]
    data = db.pending_users.insert_one({'username': username})
    client.close()
    print(f'{username} pushed to pending user list')
# print(get_recent_submissions('lcgod'))