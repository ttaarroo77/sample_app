# 最終的な仕上げのUpdate plan： 
 - 注意：全部完成し終わったら、これに変更すること


1. **どのように新しい要件（Docker化・AWSデプロイ・CI/CD（GitHub Actions）・TerraformによるIaC）を既存のTodoアプリ要件に反映するか**  
2. **古いドキュメント（既存のmdファイル）をどうアップデートすべきか**  
3. **アップデート後の要件定義書のサンプル**

を示します。

---

# 1. どのように新しい要件を反映するか

**新しい要件**:  
- Dockerで環境構築  
- AWSにデプロイ (EC2 / ECS / Fargate / ECR など)  
- テストをしっかり書いて GitHub ActionsでCI/CD  
- インフラはTerraformでIaC (AWSリソースをコード管理)

**既存の要件**:  
- 「3画面構成」「AI連携」「Markdown連携」「Supabase or SQLiteでDB管理」など、**Todoアプリ自体の機能要件**が中心

そこで、以下のように文書を**追加・修正**します。

1. **製品概要 (product-brief.md)**  
   - **「デプロイ・インフラ・CI/CDに関する技術スタック」** を明記  
   - Docker対応、AWSデプロイ、Terraformで管理、GitHub Actionsでテスト＆デプロイ  
2. **プロジェクト構造 (project-structure.md)**  
   - `infra/` や `docker/` フォルダなど、**インフラ構成用ディレクトリ**を追加  
   - `.github/workflows/` に CI/CD用ファイル(gh-actions)がある前提を追記  
3. **必要に応じて**、`docs/system_design_2/architecture.md` などで  
   - 「**Dockerコンテナ構造** (フロント, バックエンド, DB)」  
   - 「**AWSリソース構成** (VPC, EC2/ECS, RDS など)」  
   - 「**Terraformプロジェクト構成**」  
   を大まかに書く  
4. **テスト周り**:  
   - `docs/testing_4/` 以下で、「**GitHub Actionsで単体テスト & E2Eテストを回す**」フローを追記

---

# 2. 古いmdファイルをどうアップデートすべきか (手順)

1. **製品概要 (product-brief.md) の更新**  
   - 「AI Todo Management」に**Docker+AWSデプロイ要素**を追記  
   - 「提供価値」や「主要機能」の末尾に「Dockerで環境構築してAWSへデプロイできる」旨を追加

2. **project-structure.md (プロジェクト構造概要) の更新**  
   - 新たに `infra/` (Terraformコード格納) や `docker/` (Dockerfile) フォルダが必要なら、それを**ディレクトリ一覧**に追記  
   - `.github/workflows/ci.yml` (GitHub Actions)の存在や役割を説明

3. **他のドキュメント**(architecture.mdなど)があれば、  
   - 「**Dockerコンテナ3つ(フロント, バック, DB) + TerraformでAWSリソース管理**」を概念図で示す  
   - CI/CDの流れ(GitHub Actions → Docker build → AWS ECR/ECS へデプロイ)をシーケンス図や箇条書きで追記

4. **最終的にコミット**  
   - 既存のmdファイルを上書き or 追記コメントし、**「更新履歴」**を明記すると履歴管理がスムーズ

---

# 3. アップデートされた要件定義 (サンプル)

ここでは、**`docs/overview_0/product-brief.md`** を中心に修正した例を示します。  

```markdown
---
name: "docs/overview_0/product-brief.md"
title: "製品概要 (Product Brief)"
description: "AI駆動 自己実現サポートアプリの概要 + Docker/AWS要件"
---

# AI駆動 自己実現サポートアプリ (AI Todo Management)

## 1. アプリ概要
本アプリケーションは、大きな目標(大目標)を中目標・小目標へと分解し、**カンバン形式**で管理する「自己実現サポートツール」です。  
さらに、**AI(例: OpenAI API)** を活用して、ユーザーの漠然とした目標を具体的なステップに落とし込みやすくします。

加えて、**本アプリはDockerでの環境構築、AWSへのデプロイ、TerraformによるIaC管理、そしてGitHub ActionsによるCI/CD**を含む実装を行い、エンジニアの総合的なスキルを示すことを目指します。

## 2. 呼称・キャッチフレーズ
- **プロダクト名**: AI Todo Management  
- **キャッチフレーズ**: 「AIを活用し、あなたの大きな目標を細分化する (Docker & AWS Ready)」

## 3. 提供機能 (簡易リスト)

### 3.1 3画面構成 (アプリ機能)
1. **ログイン画面** (ユーザー認証)  
2. **カンバン画面** (大中小の目標管理)  
3. **マイページ** (プロフィール/パスワード/アバター変更)

### 3.2 AIによる目標細分化 (オプション)
- 大目標を入力するとAIが中・小目標を提案

### 3.3 Markdown連携 (オプション)
- カンバン構造をMDファイル入出力

### 3.4 Docker & AWSデプロイ
- **Docker**: フロントエンド、バックエンドをDockerイメージとしてビルド  
- **AWSデプロイ**: ECSまたはEC2上にDockerコンテナを配置、TerraformでIaC管理

### 3.5 CI/CD (GitHub Actions)
- プルリク時の自動テスト (Jest, Cypress など)  
- mainブランチマージで自動デプロイ (Docker build → push to ECR → ECS update)

## 4. ターゲットユーザー
- 日々の学習・自己啓発を行う個人  
- 大きな目標を計画的に達成したい人  
- 軽量なカンバンツール + AI支援を試してみたい方  
- **Docker/AWS/Terraform/GitHub Actions**の実践ポートフォリオを作りたいエンジニア

## 5. 主要な特徴

- **3階層の目標管理**: 大目標→中目標→小目標
- **AI駆動の目標自動生成**: タスク洗い出しをAIがサポート
- **Markdown連携**: Ex/Imポートの簡易機能
- **Docker & Terraform**: 開発/本番をコンテナ化+IaCでインフラ構築
- **CI/CD**: GitHub Actionsによる自動テスト＆デプロイ

## 6. 提供価値

- **タスク・目標の可視化**: 大きな目標を見失わない
- **AIサポート**: 目標分解やアイデア出しを自動化
- **インフラ・DevOps学習**: Docker化＆AWSデプロイで本番運用を模擬
- **IaC & CI/CD**: Terraform + GitHub Actionsで再現性ある環境構築＆自動テスト

## 7. 詳細要件・関連文書
- **プロジェクト構造・DB設計**: [project-structure.md](./project-structure.md), [database.md](./database.md)
- **APIルート一覧**: [api-routes.md](./api-routes.md)
- **型定義**: [types.md](./types.md)
- **Docker/Infra設定**: `infra/` or `docker/` (Terraform, Dockerfileなど)
- **CI/CD設定**: `.github/workflows/ci.yaml` や `test_strategy.md`
- **コンポーネント概要**: [components.md](./components.md)

## 8. コード生成フロー
1. 要件書・UI モック準備
2. cursorrules 設定
3. Composer ステップA実行: 雛形生成 → Git コミット
4. Composer ステップB実行: UI コンポーネント生成 → Git コミット
5. Composer ステップC実行: ビジネスロジック → Git コミット
6. Composer ステップD実行: テストコード → Git コミット
7. **Dockerビルド & AWSデプロイ (Terraform)**  
8. **GitHub Actionsでテスト/デプロイ自動化**

---

以上が**更新後の要件定義**のサンプルです。実際には各ステップ(例: ECSかEC2か、RDSかSQLiteか)をさらに詳細化し、`project-structure.md` などにも追記するとよいでしょう。

https://chatgpt.com/c/67ab49b1-fa08-800c-bbb8-3068465fe6a3