# !/bin/sh
set -e
git pull
docker kill kushapi
docker rm kushapi
docker build -t kushapi .
docker run -d --name kushapi --link xyzdeploy_sitewatcher_1:xyz -e KATALOG_VHOSTS=default/cv-api kushapi
^D
