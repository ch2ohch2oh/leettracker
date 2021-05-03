#!/usr/bin/env python3
import requests
import json
import logging
from datetime import datetime
import json
import argparse

import graphql

def _rename_key(d, old_name, new_name):
    '''Rename the key of a dict'''
    d[new_name] = d[old_name]
    del d[old_name]

def get_user_info(username):
    '''Get user information from leetcode'''
    data = graphql.query(graphql.q_getUserProfile, {'username': username})
    
    try:
        data = data.get('data').get('matchedUser')
        return data
    except:
        return None

def get_user_submissions(username, limit=20):
    '''Get recent user submissions from leetcode'''
    try:
        data = graphql.query(graphql.q_getRecentSubmissionList, 
                        {'username': username, 'limit': limit})
        data = data.get('data').get('recentSubmissionList')
        for entry in data:
            entry['timestamp'] = datetime.fromtimestamp(int(entry['timestamp']))
            _rename_key(entry, 'titleSlug', 'title_slug')
            _rename_key(entry, 'statusDisplay', 'status')
        return data
    except:
        return None

def get_active_users(question_id, first=20):
    '''Get the recent discussion participants for a problem from leetcode'''
    try: 
        data = graphql.query(graphql.q_questionTopicsList, {
            "orderBy": "newest_to_oldest",
            "query": "",
            "skip": 0,
            "first": first,
            "tags": [],
            "questionId": question_id
        })
        data = data['data']['questionTopicsList']['edges']
        users = []
        for e in data:
            users.append({
                'username': e['node']['post']['author']['username'],
                'date': datetime.fromtimestamp(int(e['node']['post']['creationDate']))
            })
        return users
    except:
        return None

def get_problems():
    '''Get a list of all problems from leetcode'''
    try:
        res = requests.get('https://leetcode.com/api/problems/all/')
        data = json.loads(res.text)
        data = data['stat_status_pairs']
        questions = []
        for e in data:
            questions.append({
                'question_id': e['stat']['question_id'],
                'title': e['stat']['question__title'],
                'title_slug': e['stat']['question__title_slug'],
                'total_acs': e['stat']['total_acs'],
                'total_submitted': e['stat']['total_submitted'],
                'frontend_question_id': e['stat']['frontend_question_id'],
                'difficulty': e['difficulty']['level'],
                'paid_only': e['paid_only'],
            })
        return questions
    except:
        return None
    
if __name__ == '__main__':
    pass