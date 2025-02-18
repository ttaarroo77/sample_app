#!/bin/bash

echo "Resetting Docker environment..."

# Dockerプロセスの停止
osascript -e 'quit app "Docker"'
sleep 5

# Docker関連プロセスの強制終了（必要な場合）
killall Docker
killall docker
killall com.docker.backend
sleep 2

# Dockerの再起動
open -a Docker
echo "Waiting for Docker to restart..."
while ! docker system info > /dev/null 2>&1; do
  echo -n "."
  sleep 1
done
echo -e "\nDocker has been reset and is ready!" 