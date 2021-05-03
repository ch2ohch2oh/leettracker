from fastapi import FastAPI, HTTPException, APIRouter

import api_v1
import os
import logging

app = FastAPI()

app.include_router(api_v1.router)

# @app.get('/test')
# def test():
#     print(123)
#     logging.info('test')