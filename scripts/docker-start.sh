#!/bin/bash

# スクリプトを作成
cat << 'EOF' > scripts/docker-start.sh
#!/bin/bash

echo "Starting Docker Desktop..."
open -a Docker

# Dockerが起動するまで待機（最大60秒）
echo "Waiting for Docker to start..."
timeout=60
elapsed=0
while ! docker system info > /dev/null 2>&1; do
  if [ $elapsed -ge $timeout ]; then
    echo -e "\nError: Docker failed to start within $timeout seconds"
    exit 1
  fi
  echo -n "."
  sleep 1
  elapsed=$((elapsed+1))
done
echo -e "\nDocker is ready!"

# Supabaseの起動
echo "Starting Supabase..."
supabase start
EOF

# 実行権限を付与
chmod +x scripts/docker-start.sh 