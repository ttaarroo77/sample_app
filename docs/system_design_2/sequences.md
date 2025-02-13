---
name: "docs/system_design_2/sequences.md"
title: "詳細シーケンス図 (Sequences)"
description: "AI Todo Management - 主要フローの手順図 (Supabase SSR想定)"
---

# 詳細シーケンス図 (Supabase SSR想定)

本ファイルでは、本アプリの**主要なフロー**を**シーケンス図**で示します。  
(概要レベルのAPI一覧は `overview_0/api-routes.md` を参照)
これらのシーケンス図は参考例です。実装に合わせて加筆修正してください。


—


## 1. ログインフロー (Supabase SSR)
以下は例として、**Next.js** + **Supabase SSR** を使うパターンです。

```mermaid
sequenceDiagram
    actor User
    participant Frontend as Next.js (Client + SSR)
    participant Supabase as Supabase Auth
    participant DB as Supabase DB (Optional reference)

    User->>Frontend: アクセス (例: /login)
    Frontend->>Frontend: SSRでセッション確認 (getServerSideProps 等)
    alt 未ログイン
        Frontend->>Frontend: ログインフォーム表示
        User->>Frontend: メール & パスワード入力
        Frontend->>Supabase: signIn({ email, password })
        Supabase->>Supabase: 認証(ユーザー確認)
        alt 成功
            Supabase-->>Frontend: セッション(アクセストークン等)
            Frontend-->>User: カンバン画面へリダイレクト
        else 失敗
            Supabase-->>Frontend: エラー情報
            Frontend-->>User: エラーメッセージ表示
        end
    else ログイン済
        Supabase-->>Frontend: 有効なセッション情報
        Frontend-->>User: カンバン画面表示
    end


セッション管理は Supabase クライアントが内部で処理（Cookie等）
DB には auth.users が存在し、ユーザー情報を保持
「Supabase Auth」を使った認証の流れに書き換える時が、場合によってはあります。



## 2. カンバン操作フロー

sequenceDiagram
    actor User
    participant Frontend as カンバン画面
    participant Backend as (API Routes or SSR logic)
    participant DB

    User->>Frontend: カンバンページを開く
    Frontend->>Backend: GET /api/goals (例)
    Backend->>DB: SELECT * FROM goals
    DB-->>Backend: 目標データ返却
    Backend-->>Frontend: 目標リスト
    Frontend-->>User: カンバン表示

    alt 目標追加
        User->>Frontend: 「新しい大目標」入力
        Frontend->>Backend: POST /api/goals
        Backend->>DB: INSERT
        DB-->>Backend: OK
        Backend-->>Frontend: 作成完了
        Frontend-->>User: リスト更新
    end

※ Supabase SSRをフル活用する場合、API経由でなくSSR経由で直接DBを操作しても可。



## 3. AI細分化フロー (オプション)

sequenceDiagram
    actor User
    participant Frontend
    participant Backend
    participant AI as OpenAI
    participant DB

    User->>Frontend: 「AI細分化」クリック
    Frontend->>Backend: POST /api/ai/breakdown
    Backend->>AI: 目標分解リクエスト
    AI-->>Backend: 中・小目標案
    Backend->>DB: INSERT (goals) 
    DB-->>Backend: OK
    Backend-->>Frontend: 生成結果
    Frontend-->>User: カンバン更新




## 4. Markdown入出力フロー (オプション)

sequenceDiagram
    actor User
    participant Frontend
    participant Backend
    participant DB

    rect rgb(200,230,250)
    note right of User: エクスポート
    User->>Frontend: 「MDエクスポート」
    Frontend->>Backend: GET /api/md/export
    Backend->>DB: goals取得
    DB-->>Backend: 目標リスト
    Backend->>Backend: MD変換
    Backend-->>Frontend: MDファイル
    Frontend-->>User: ダウンロード
    end

    rect rgb(220,250,220)
    note right of User: インポート
    User->>Frontend: 「MDインポート」 + ファイル選択
    Frontend->>Backend: POST /api/md/import
    Backend->>Backend: MDパース → goals生成
    Backend->>DB: INSERT
    DB-->>Backend: OK
    Backend-->>Frontend: 完了
    Frontend-->>User: カンバン再描画
    end





## 5. マイページ更新

sequenceDiagram
    actor User
    participant Frontend as マイページ
    participant Supabase as Auth Service
    participant DB as (アプリ独自usersテーブル?)


    User->>Frontend: マイページ表示
    Frontend->>Supabase: セッション確認
    Supabase-->>Frontend: ユーザーID, Email等

    alt プロフィール更新 (username, avatar)
        Frontend->>DB: PATCH /api/auth/userinfo (or SSR)
        DB-->>Frontend: 更新完了
        Frontend-->>User: 「更新しました」
    else パスワード更新
        note right of Frontend: 通常は<br/>SupabaseのsignIn()と<br/>updateUser()を使用
        Frontend->>Supabase: updateUser({ password: newPass })
        Supabase-->>Frontend: 結果OK
        Frontend-->>User: 「パスワード更新完了」
    end

Supabase Authのメソッド (updateUser) を使うことでパスワード更新を行う
アプリ独自で持っている username や avatar_url は自前のDBを更新


