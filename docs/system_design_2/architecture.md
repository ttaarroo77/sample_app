# システムアーキテクチャ

## 1. 概要

### 1.1. システム名

AI Todo Management

### 1.2. 目的

AIを活用してユーザーのタスク管理を効率化し、生産性向上を支援する。

### 1.3. 主な機能

*   **ユーザー認証:**
    *   ログイン/ログアウト
    *   ユーザー登録
    *   パスワードリセット
    *   二段階認証 (将来予定)
*   **Todo 管理:**
    *   カンバン方式 (Todo, In Progress, Done)
    *   ドラッグ＆ドロップによるステータス変更
    *   Todo の作成、編集、削除
    *   検索、フィルター、ソート
    *   アーカイブ機能
*   **ユーザープロフィール管理:**
    *   プロフィール表示・編集
    *   アバター設定
    *   パスワード変更
    *   テーマ設定 (ダークモードなど)
    *   言語設定
    *   ショートカット設定
*   **AI 支援機能 (将来予定):**
    *   タスク自動分解
    *   GPTs 連携
    *   優先度提案
    *   習慣化支援
*   **管理者機能 (将来予定):**
    *   API ドキュメント表示
    *   ログ表示
    *   システム監視
    *   バックアップ管理
    *   IP アクセス制御



## 2. 技術スタック

*   **フロントエンド:** Next.js (React), TypeScript, (CSS Modules / Styled Components / Tailwind CSS のいずれか), 状態管理ライブラリ (Context API, Recoil, Zustand など)
*   **バックエンド:** Node.js, Express, TypeScript, JWT (JSON Web Token)
*   **データベース:** SQLite
*   **AI 連携:** OpenAI API (将来予定)



## 3. アーキテクチャ図
graph TD
    subgraph Frontend [Frontend - Next.js]
        User[User] --> Browser[Web Browser]
        Browser --> API[API Gateway]
        style Browser fill:#f9f,stroke:#333,stroke-width:2px
    end

    subgraph Backend [Backend - Node.js/Express]
        API --> Auth[Authentication Service]
        API --> TodoService[Todo Management Service]
        API --> UserService[User Profile Service]
    end

    subgraph Database [Database - SQLite]
        TodoService --> SQLiteDB[(SQLite)]
        UserService --> SQLiteDB
        Auth --> SQLiteDB
    end

    subgraph ExternalServices [External Services - 将来予定]
        GPTs[GPTs or AI APIs]
        TodoService --> GPTs
    end

    %% 以下のコメントアウトされた部分は、将来的に詳細化する際に使用
    %% subgraph API Gateway
    %%     API --> ServiceA[Service A]
    %%     API --> ServiceB[Service B]
    %% end



## 4. コンポーネント詳細

### 4.1. フロントエンド (Next.js)

- **責務:**
  - ユーザーインターフェース (UI) の表示とユーザー操作の処理
  - バックエンド API との通信
  - アプリケーションの状態管理
  - ルーティング (画面遷移) の制御

- **主要技術:**
  - **フレームワーク:** Next.js (React)
  - **言語:** TypeScript
  - **スタイリング:** CSS Modules, Styled Components, Tailwind CSS のいずれか
  - **状態管理:** Context API, Recoil, Zustand などから選択

### 4.2. バックエンド (Node.js/Express)

- **責務:**
  - RESTful API エンドポイントの提供
  - ビジネスロジックの実行
  - データベースとの連携 (データの読み書き)
  - ユーザー認証・認可
  - エラーハンドリング

- **コンポーネント:**
    - **認証サービス (Authentication Service):** ユーザー認証、認可、セッション管理
    - **Todo 管理サービス (Todo Management Service):** Todo の作成、読み取り、更新、削除 (CRUD) 操作、検索、フィルタリング
    - **ユーザープロファイルサービス (User Profile Service):** ユーザープロファイル情報の管理

- **主要技術:**
  - **フレームワーク:** Node.js, Express
  - **言語:** TypeScript
  - **認証:** JWT (JSON Web Token)
  - **データベース:** SQLite (ORM またはクエリビルダーを使用)

### 4.3. データベース (SQLite)

- **責務:**
  - データの永続化 (保存、読み取り、更新、削除)

- **主要技術:**
  - SQLite

### 4.4. 外部サービス (将来予定)

- **責務:**
  - AI 機能の提供 (タスクの自動分解、優先度提案など)

- **主要技術:**
  - OpenAI API (または他の AI 関連 API)

## 5. 補足事項

- API の詳細設計については、`overview_0/api-routes.md` を参照してください。
- 画面遷移図については、`system_design_2/ui.md` を参照してください。




Ohhhh !!??
Yessss !!!!