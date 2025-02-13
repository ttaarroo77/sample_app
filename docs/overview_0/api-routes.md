---
name: "docs/overview_0/api-routes.md"
title: "APIルート概要 (API Routes)"
description: "AI Todo Management - 必須ルートとオプションルート (Supabase SSR想定版)"
---

# APIルート概要 (Supabase SSR想定)

本アプリケーションで使用する主要なエンドポイントを示します。  
ただし、**Supabase SSRを利用**する場合は以下の点に注意してください。

- **認証（ログイン／ログアウト）は Supabase Auth** が管理するため、  
  `/api/auth/login` や `/api/auth/logout` などの自前エンドポイントは「不要 or オプション」になります。
詳しいリクエスト/レスポンス仕様は、実装時に補足してください。

---

## 1. /api/auth (オプション)
Supabase Auth を利用する場合、**自前の認証APIは省略可能**です。  
もし実装する場合、以下のようにする例があります:

- **POST /signup** (任意)  
  新規登録用。省略してSupabase側に任せても可。  
- **POST /login**  
  ログイン処理。メール＆パスワードを受け取り、セッションやJWTを発行する実装を行う。  
  > **Supabase SSR** では通常 `createClient` などを使い、クライアントサイド or サーバーサイドで `signIn()` を呼ぶため、このAPIは不要になることが多い。  
- **POST /logout**  
  ログアウト。セッションやトークンを破棄。  
  > こちらも同様に、Supabaseの `signOut()` メソッドで代替可能。

> **メモ**: 練習用途で自前JWTをやりたいなら、上記エンドポイントを残しますが、  
> Supabase Authのみで完結したい場合は**作らない**選択もOKです。

---

## 2. /api/goals
- **GET** : 全目標(大・中・小)の取得  
- **POST** : 目標の追加 (title, type, colorなどを受け取りDBにINSERT)  
- **PATCH /:id** : 目標の更新 (ドラッグ＆ドロップ位置変更やタイトル変更など)  
- **DELETE /:id** : 目標の削除

> Supabaseの場合、SSRなら**`server` から直接Supabaseクライアントを呼び出し**てGoal CRUDを行う、  
> または**RLS (Row Level Security)** を設定して**クライアント→Supabase**のパスを作るなど、実装パターンは様々です。

---

## 3. /api/ai/breakdown (オプション)
- **POST** : 大目標を受け取り、中・小目標をAIが生成  
  - `prompt` or `title` フィールドをリクエストで受信  
  - OpenAI等に投げて結果を受け取り、一括で `goals` テーブルにINSERT

---

## 4. /api/md (オプション)
- **POST /import** : Markdownファイルをアップロードし、カンバン構造をDBに生成  
- **GET /export** : DB上のカンバン構造をMarkdown形式に変換し、ファイルをダウンロード

---

## 5. 認証保護
- **ログイン必須**の操作(例: goals CRUD) は、**SupabaseのSession** で保護します。  
- `/api/goals` などへのアクセス前に、**SSR環境でSessionをチェック**し、未ログインならリダイレクトや401エラーを返す実装を行います。

---

## 6. その他
- **管理者向けのルートは原則不要** (ポートフォリオ最小機能)  
- 認証をSupabaseに委託する場合、**自前のログインAPIが無い**のが自然です。  
- それでも学習用途として自前APIを作るなら、本ファイルを参考に簡易的なルートを設計してください.

以上がSupabase SSR想定でのAPIルートの概要です。  
実装時に要件やセキュリティポリシーに合わせて拡張してください。
