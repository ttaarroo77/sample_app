# Docker環境セットアップ手順 (2024/02/18)

## 1. 現状の問題点
- [x] Docker Desktopの起動が不安定
- [x] Supabaseのローカル環境が正常に動作しない
- [x] コンテナ間の通信エラー

## 2. 実行タスク

### 2-1. Docker環境の初期化
- [ ] Docker関連ファイルの完全削除
  ```bash
  sudo rm -rf /Applications/Docker.app
  sudo rm -rf ~/Library/Containers/com.docker.docker
  sudo rm -rf ~/Library/Application\ Support/Docker\ Desktop
  sudo rm -rf ~/Library/Group\ Containers/group.com.docker
  ```

- [ ] Docker Desktopの再インストール
  ```bash
  brew install --cask docker
  ```

### 2-2. Docker起動スクリプトの修正
- [ ] `scripts/docker-start.sh`の改善
  - Dockerの状態確認を強化
  - タイムアウト処理の追加
  - エラーハンドリングの実装

### 2-3. Supabase環境の設定
- [ ] Supabaseの初期化
  ```bash
  supabase init
  supabase start
  ```

- [ ] 環境変数の設定
  ```bash
  cp .env.example .env.local
  # .env.localを編集してSupabase関連の環境変数を設定
  ```

### 2-4. 動作確認項目
- [ ] Docker Desktopが正常に起動するか
- [ ] `docker ps`でコンテナ一覧が表示されるか
- [ ] Supabase Studioにアクセスできるか（http://localhost:54323）
- [ ] APIエンドポイントが応答するか（http://localhost:54321）

## 3. エラー発生時の対処

### 3-1. Docker Desktopが起動しない場合
- [ ] システム環境設定でDockerの権限を確認
- [ ] 再起動後に`docker-reset.sh`を実行
- [ ] ログを確認（`~/Library/Containers/com.docker.docker/Data/log/vm/dockerd.log`）

### 3-2. Supabaseが起動しない場合
- [ ] ポートの競合をチェック
  ```bash
  lsof -i :54321
  lsof -i :54323
  ```
- [ ] Supabaseのリセット
  ```bash
  supabase stop
  supabase db reset
  supabase start
  ```

## 4. 次のステップ
- [ ] Docker Composeファイルの作成
- [ ] 本番環境用Dockerfileの準備
- [ ] CI/CD用のDocker設定

## 5. 備考
- エラーが発生した場合は、エラーメッセージとログを`docs/error_countermeasures/`に記録
- 環境構築手順は`docs/setup_guide/`に追記
- チーム内で共有が必要な設定変更は`docs/progress_report/`に記録

以上