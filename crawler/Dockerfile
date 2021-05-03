# syntax=docker/dockerfile:1
FROM python:3.8-alpine AS crawler
WORKDIR /app
COPY . .
# RUN apt-get install python-pip
RUN apk update
RUN apk add alpine-sdk
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD ["python", "run_jobs.py"]