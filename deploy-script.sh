#!/bin/sh
echo 'Cloning project...'
cd /
FILE=/node-auth
if test -f "$FILE"; then
  echo "$FILE exists. Pulling new source..."
  cd /node-auth
  git checkout dev
  git pull
  echo ">>> Setting environment..."
  cp ./deployment/.env.production .env
  echo ">>> Building..."
  docker-compose up -d --build
  echo ">>> Built!"
else
  echo "Getting new source..."
  git clone git@bitbucket.org:daniel-ducbui/node-auth.git node-auth
  echo ">>> Checking access..."
  ssh-copy-id -i ~/.ssh/id_rsa.pub root@bitbucket.org
  ssh-keyscan -t rsa bitbucket.org > ~/.ssh/known_hosts
  cd /node-auth

  echo ">>> Setting environment..."
  cp ./deployment/.env.production .env
  echo ">>> Building..."
  docker-compose up -d
  echo ">>> Built"
fi
echo "SUCCESS"
