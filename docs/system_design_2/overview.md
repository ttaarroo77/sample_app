---
name: "docs/system_design_2/overview.md"
title: "システム全体概要 (System Design Overview)"
description: "AI Todo Management - 詳細設計の概要"
---

# システム全体概要 (System Design Overview)

本ドキュメントでは、**AI Todo Management**アプリの詳細設計概要をまとめます。  
概要レベルの情報は `docs/overview_0/*` に記載があるため、ここでは**技術スタックや主要機能、アーキテクチャ視点**からの説明を行います。

---

## 1. システム概要

### 1.1 システム名

**AI Todo Management**

### 1.2 目的

AI (OpenAI API 等) を活用し、**ユーザーのタスク管理を効率化**することで、生産性を向上するアプリケーションを提供します。

### 1.3 主な機能

1.  **ユーザー認証**
    *   ログイン/ログアウト
    *   (任意) 新規登録／パスワードリセット
    *   Supabase Authを利用するか、JWTによる独自実装を行うかは要検討

2.  **カンバン方式のTodo管理**
    *   大・中・小目標などを管理する3階層(または「Todo / In Progress / Done」3列)のカンバン
    *   ドラッグ＆ドロップによるステータス変更
    *   Todoの作成・編集・削除・検索

3.  **ユーザープロフィール管理 (マイページ)**
    *   プロフィール表示・編集
    *   アバター画像の設定
    *   パスワード変更
    *   (任意) テーマ設定／言語設定

4.  **AIタスク分解 (オプション)**
    *   大目標を入力すると、AIが自動的にサブタスクに分解
    *   OpenAI API等との連携

5.  **Markdown入出力 (オプション)**
    *   カンバン構造をMarkdown形式でインポート／エクスポート

6.  **(将来) 管理者機能**
    *   システム監視やバックアップ管理等

---

## 2. 技術スタック

| 分類          | 採用技術例                                   |
| :------------ | :------------------------------------------- |
| フロントエンド  | **Next.js** (React + TypeScript), CSS/Tailwind |
| バックエンド    | **Node.js** / Express (TypeScript), あるいはSupabase SSR |
| データベース    | **SQLite** (ローカル), もしくは PostgreSQL (Supabase) |
| AI連携        | **OpenAI API** (将来導入)                     |

### 2.1 フロントエンド (Next.js)

*   **役割**: UI表示／入力、カンバン操作、API連携
*   **詳細**: [UI設計 `docs/system_design_2/ui.md`](./ui.md)、[コンポーネント概要 `docs/overview_0/components.md`](../../overview_0/components.md)

### 2.2 バックエンド (Node.js/Express or Supabase)

*   **役割**: REST API or SSRロジック、DBアクセス、認証、AI連携
*   **詳細**: [sequences.md](./sequences.md) にAPIフローを記載

### 2.3 データベース (SQLite or Supabase PostgreSQL)

*   **役割**: 目標データ (goals)、ユーザー情報(users)等の永続化
*   **詳細**: [database.md](./database.md)

### 2.4 AI連携 (オプション)

*   **API**: OpenAI API
*   **機能**: タスク分解／習慣化支援／優先度提案
*   **詳細**: それぞれの実装方針次第。必要に応じてロギング／APIキー管理を行う

---

## 3. アーキテクチャ概要

```mermaid
flowchart LR
    subgraph ClientSide
        A[Next.js / React<br>(Frontend)]
    end

    subgraph ServerSide
        B[Supabase SSR<br>or Node.js/Express]
        C[DB<br>(SQLite/PostgreSQL)]
        D(OpenAI API<br>(オプション))
    end

    A--(HTTP/HTTPS)-->B
    B--(SQL or Supabase Client)-->C
    B--(API call)-->D

