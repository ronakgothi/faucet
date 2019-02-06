#!/bin/bash
git pull origin master
docker build -t parmarrushabh/faucet .
docker stop faucet
docker run -d -p 80:3000 --name faucet --restart on-failure:10 parmarrushabh/faucet
