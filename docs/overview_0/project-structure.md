# プロジェクト構造概要 (overview_0/project-structure.md)

このドキュメントは、AI Driven Todo アプリケーションのプロジェクト構造の概要を示します。

## チェックリスト

*   [x] 主要なディレクトリとその役割の説明
*   [x] フロントエンドとバックエンドのディレクトリ構造
*   [x] 重要なファイル (設定ファイルなど) の簡単な説明

## プロジェクト構造
ai-driven-todo/
├── backend/ # バックエンド (Node.js/Express)
│ ├── src/
│ │ ├── controllers/ # API リクエストハンドラ
│ │ ├── models/ # データベースモデル
│ │ ├── routes/ # API ルーティング
│ │ ├── services/ # ビジネスロジック
│ │ ├── app.ts # Express アプリケーションのエントリポイント
│ │ └── ...
│ ├── .env # 環境変数
│ ├── package.json # 依存関係とスクリプト
│ └── ...
├── frontend/ # フロントエンド (Next.js/React)
│ ├── pages/
│ │ ├── api/ # API Routes (Next.js の機能)
│ │ ├── _app.tsx # アプリケーション全体のレイアウト
│ │ ├── index.tsx # ホームページ (ダッシュボード)
│ │ └── ...
│ ├── components/ # 再利用可能な UI コンポーネント
│ │ ├── Auth/ # 認証関連コンポーネント
│ │ ├── Todo/ # Todo関連コンポーネント
│ │ ├── User/ # ユーザー関連コンポーネント
│ │ ├── Common/ # 共通コンポーネント
│ │ └── ...
│ ├── styles/ # グローバルスタイル、CSS Modules
│ ├── public/ # 静的ファイル (画像など)
│ ├── lib/ # ユーティリティ関数など
│ ├── types/ # TypeScriptの型定義
│ ├── context/ # React Context
│ ├── hooks/ # カスタムフック
│ ├── .env # 環境変数
│ ├── package.json # 依存関係とスクリプト
│ └── ...
├── docs/ # ドキュメント
│ ├── overview_0/ # このディレクトリ
│ └── ...
├── .gitignore
├── README.md
└── ...


**主要なディレクトリ:**

*   **`backend/`**: Node.js (Express) を使用したバックエンドのソースコードが含まれます。
    *   `controllers/`: API リクエストを処理する関数を格納します。
    *   `models/`: データベースのテーブルに対応するモデルを定義します。
    *   `routes/`: API のエンドポイントとリクエストハンドラを紐付けます。
    *   `services/`: ビジネスロジックを実装します。
    *   `app.ts`: Express アプリケーションのエントリポイントです。

*   **`frontend/`**: Next.js (React + TypeScript) を使用したフロントエンドのソースコードが含まれます。
    *   `pages/`: ページコンポーネントを格納します。Next.js のファイルシステムベースのルーティングを使用します。
        *   `api/`: API Routes (サーバーレス関数) を格納します。
        *   `_app.tsx`: アプリケーション全体のレイアウトを定義します。
        *   `index.tsx`: ホームページ (ダッシュボード) のコンポーネントです。
    *   `components/`: 再利用可能な UI コンポーネントを格納します。機能ごとにサブディレクトリを作成します。
    *   `styles/`: グローバルスタイルや CSS Modules を格納します。
    *   `public/`: 画像などの静的ファイルを格納します。
    *   `lib/`: ユーティリティ関数などを格納します。
    *   `types/`: TypeScript の型定義を格納します。
    *   `context/`: React Context を格納します。
    *   `hooks/`: カスタムフックを格納します。

*   **`docs/`**: プロジェクトのドキュメントが格納されます。

**重要なファイル:**

*   **`.env`**: 環境変数ファイル (データベース接続情報など)。
*   **`package.json`**: プロジェクトの依存関係とスクリプトを定義します。
*   **`README.md`**: プロジェクトの概要とセットアップ手順を記述します。