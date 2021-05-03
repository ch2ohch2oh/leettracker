#!/usr/bin/bash

for image in leetgg_apiserver leetgg_react leetgg_crawler; do 
    sudo docker tag $image gcr.io/leettracker/$image
    sudo docker push gcr.io/leettracker/$image
done
