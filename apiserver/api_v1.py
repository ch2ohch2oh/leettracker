from fastapi import FastAPI, HTTPException, APIRouter

import db
import os
# import logging

router = APIRouter(prefix="/api/v1")

@router.get('/user/{username}')
def get_user_digest(username: str, limit: int=20):
    data = db.get_user_info(username)
    if not data:
        db.push_pending_user(username)
        raise HTTPException(status_code=404, detail=f"User not found(username={username})")
    data['submissions'] =  db.get_recent_submissions(username, limit)
    return data

@router.get('/user/{username}/info')
def get_user_info(username: str):
    data = db.get_user_info(username) or {}
    if not data:
        # Trigger the crawler to find this user
        db.push_pending_user(username)
        # os.system(f'python ../crawler/crawler/update.py --username {username} &')
        raise HTTPException(status_code=404, detail=f"User not found(username={username})")
    return data

@router.get('/user/{username}/submissions')
def get_user_submissions(username: str, limit: int=50):
    subs = db.get_recent_submissions(username, limit) or []
    return {'username': username, 'submissions': subs}

@router.get('/submissions')
def get_recent_submissions(limit: int=50):
    subs = db.get_recent_submissions(None, limit) or []
    return {'submissions': subs}
