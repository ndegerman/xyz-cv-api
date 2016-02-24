# !/bin/sh
set -e
git pull
docker build . -t kushapi
docker run
^D
