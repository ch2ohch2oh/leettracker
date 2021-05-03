#!/usr/bin/env python3
import argparse
import os
import sys
import pymongo
import logging
import time

DB_HOST = os.environ.get('DB_HOST') or 'mongodb://localhost'
DB_NAME = os.environ.get('DB_NAME') or 'test'

db = None

def get_db():
    global db
    if not db:
        logging.info(f'DB_HOST={DB_HOST} DB_NAME={DB_NAME}')
        client = pymongo.MongoClient(DB_HOST)
        db = client[DB_NAME]
    return db