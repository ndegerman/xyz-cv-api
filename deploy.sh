# !/bin/sh
set -e
git pull
docker kill kushapi
docker build -t kushapi .
docker run -d --name kushapi -e KATALOG_VHOSTS=default/cv-api kushapi
^D
