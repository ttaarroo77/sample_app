—--
name: "docs/overview_0/project-structure.md"
title: "プロジェクト構造概要 (Project Structure)"
description: "AI Todo Management - ディレクトリ構成など"
---

# プロジェクト構造概要

## 主要な変更点
- `backend`ディレクトリを`supabase`に置き換え
- 認証機能をSupabase Authに移行
- データベースをSupabase PostgreSQLに移行
- テストファイルをtests/に移行
- 古いディレクトリ構成は、backup/20250207にバックアップ


# プロジェクト構造概要：本アプリのディレクトリ構造は、以下のような**モノレポ**形式(一例)を想定します。

ai-todo-app/
├── .github/
│   └── workflows/
│       └── ci-test.yml
├── .gitignore
├── LICENSE
├── README.md
├── package.json   # モノレポ全体管理用
├── tsconfig.json
├── supabase/   # 旧backendディレクトリを置き換え
│   ├── migrations/
│   ├── seed.sql
│   ├── supabase/
│   │   ├── config.toml
│   │   └── ...
│   ├── package.json
│   └── ...
├── cursorrules/
├── docs/
│   ├── error_countermeasures/
│   ├── history/
│   ├── overview_0/
│   │   ├── api-routes.md
│   │   ├── components.md
│   │   ├── database.md
│   │   ├── product-brief.md
│   │   ├── project-structure.md
│   │   └── types.md
│   ├── plan/
│   │   └── next_plan.md
│   ├── requirements_1/
│   │   ├── function.csv
│   │   ├── functional_requirements.csv
│   │   └── non_functional_requirements.csv
│   ├── system_design_2/
│   │   ├── architecture.md       # 既存のファイル
│   │   ├── backendHandlesLists.csv
│   │   ├── commonComponents.csv
│   │   ├── database.md
│   │   ├── screensLists.csv
│   │   ├── sequences.md
│   │   ├── tableDefinitions.csv
│   │   └── ui.md
│   └── testing_4/
│       ├── integrationTests.csv
│       └── systemTests.csv
├── docs_backup/
│   └── 20250212/
│       └── # (バックアップされたドキュメント)

├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── kanban/
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── mypage/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   └── # (例: TaskList.tsx, TaskItem.tsx, Button.tsx など)
│   │   ├── lib/
│   │   │   └── # (例: api.ts, utils.ts など)
│   │   ├── public/
│   │   │   └── # (静的ファイル: images, fonts など)
│   │   ├── styles/
│   │   │   └── # (例: globals.css, theme.ts など)
│   │   └── types/
│   │       └── # (例: task.ts, user.ts など)
│   ├── package.json
│   └── yarn.lock

└── tests/
    ├── backend/
    │    └── # (バックエンドのテストファイル 例: taskController.test.ts)
    └── frontend/
         └── # (フロントエンドのテストファイル 例: TaskList.test.tsx)

1. フロントエンド (frontend/)
- Next.js or Reactベースのアプリ。
- app/login/, app/kanban/, app/mypage/ など、3画面を中心に実装。
- components/ に共通UIコンポーネント、lib/ にユーティリティ類、types/ に型定義(Front側使用)を配置。

2. バックエンド (supabase/)
- Node.js / Express などのAPIサーバ、または Supabase Edge Functions など。
- routes/ にエンドポイント、models/ にDBモデル(ORM等)、controllers/ に業務ロジックを配置。
- 目標のCRUD (/api/goals) やAI連携 (/api/ai) などを実装する想定。

3. テスト (tests/)
- フロント・バックの単体テスト、E2Eテストをここに配置 (Jest, Cypressなど)。
- CI/CDパイプライン (.github/workflows/*.yml) で自動実行可能。

4. ドキュメント (docs/)
- 要件定義や設計書をまとめるフォルダ。
- 現状、この overview_0 フォルダで概要を管理し、詳細はsystem_design_2以下にまとめる。

5. ポイント
- 不要な管理画面や余分なUIは生成しない。
- gear.indigo等の自動生成ツールで追加される画面は削除し、3画面のみをメインに保つ。
- DBはSQLiteやSupabase PostgreSQLなど自由。
- AI連携やMarkdown連携はあくまでオプション。