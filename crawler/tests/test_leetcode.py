import pytest
from datetime import datetime

import leetcode

def test_get_user_info():
    username = 'drcru'
    data = leetcode.get_user_info(username)
    assert data and data.get('username') == username
    
    profile = data.get('profile')
    assert profile and 'realName' in profile.keys()

def test_get_user_info_nonexistent():
    username = 'anuserthatabsolutelydoesnotexist'
    data = leetcode.get_user_info(username)
    assert not data
    
def test_get_user_submissions():
    username = 'drcru'
    data = leetcode.get_user_submissions(username)
    assert data
    fields = ['title', 'title_slug', 'timestamp', 'status', 'lang']
    for f in fields:
        assert f in data[0].keys()
    assert isinstance(data[0]['timestamp'], datetime)

def test_get_user_submissions_limit():
    username = 'drcru'
    limit = 1
    data = leetcode.get_user_submissions(username, limit)
    assert data
    assert len(data) <= limit

def test_get_problems():
    data = leetcode.get_problems()
    assert data and isinstance(data, list)
    fields = [
        'question_id', 
        'title', 
        'title_slug', 
        'total_acs', 
        'total_submitted', 
        'frontend_question_id', 
        'difficulty', 
        'paid_only'
    ]
    for f in fields:
        assert f in data[0].keys()

def test_get_active_users():
    users = leetcode.get_active_users(1367, first=10)
    assert users and len(users) == 10
    assert isinstance(users[0]['date'], datetime)