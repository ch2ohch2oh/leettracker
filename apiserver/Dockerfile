# syntax=docker/dockerfile:1
FROM python:3.8-alpine AS python-api
WORKDIR /app
COPY . .
# RUN apt-get install python-pip
RUN pip install --upgrade pip
RUN pip install fastapi uvicorn aiofiles pymongo
CMD ["uvicorn", "web:app", "--host", "0.0.0.0", "--port", "80"]