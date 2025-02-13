---
name: "docs/overview_0/database.md"
title: "データベース概要 (Database)"
description: "AI Todo Management - 簡易なテーブル構造の紹介 (Supabase SSR想定)"
---

# データベース概要 (Supabase SSRを念頭に)

- 本アプリケーションのDBは、**Supabase (PostgreSQL)** を利用する想定です。  
- SQLite等に切り替えても構いませんが、**Supabase SSR** ではPostgreSQLが標準です。

- ここでは最低限のテーブル例を示します。詳細なER図などは `system_design_2/database.md` で扱います。
- **`database.md`**: `password` カラムは「使わない場合あり」です。Supabase Authがメインです。   

---

## 1. テーブル例

### 1-1. `users` テーブル (アプリ独自の補足用)
| カラム       | 型       | 備考                                                    |
|--------------|----------|---------------------------------------------------------|
| id           | PK       | ユーザーID (UUIDなど)                                  |
| email        | string?  | ユーザーのメールアドレス (省略可、Supabase Authに任せる)|
| password     | string?  | パスワード(ハッシュ化) (通常はSupabase Authで管理)      |
| username     | string   | ユーザー名                                             |
| avatar_url   | string   | アバター画像URL                                        |

> **Supabase Auth** を使う場合、認証・パスワード管理は `auth.users` に任せるため、  
> アプリ側の `users` テーブルは「**補助情報**(表示名, アバターURLなど)だけ」を持つケースが多いです。  
> パスワードをここに保存するなら「自前認証フロー」を構築する必要があります。

---

### 1-2. `goals` テーブル
| カラム       | 型       | 備考                                             |
|--------------|----------|--------------------------------------------------|
| id           | PK       | 目標ID (bigint, serial,など)                     |
| title        | string   | 目標タイトル                                    |
| type         | enum     | 'big' / 'medium' / 'small'                      |
| color        | string   | 付箋色                                          |
| parent_id    | number   | 親目標ID (中→大, 小→中を示す)                    |
| user_id      | FK       | 所属ユーザーID (Supabase Authのユーザーと紐付け)|

> 階層構造を `parent_id` で表現。

---


### 1-3. `boards` テーブル (任意)
| カラム         | 型       | 備考                        |
|----------------|----------|-----------------------------|
| id             | PK       | ボードID                    |
| title          | string   | ボード名称                  |
| type           | enum     | 'big' | 'medium' | 'small' |
| color          | string   | ボードカラー                |
| parent_goal_id | number   | 大目標に紐付くIDなど        |

> カンバンの列情報を別テーブルで管理したい場合に利用。  
> 最小構成では `goals` テーブルだけで大・中・小を管理することも可能です。

---

## 2. Supabase Auth連携
- Supabaseでは `auth.users` テーブルがあり、ユーザーのメール/パスワード/UID を管理します。  
- アプリの独自テーブル `users` を作る場合、**`id` を `auth.users.id` と同期**し、追加プロフィールだけを格納するのが一般的です。

---

## 3. 今後の拡張
- **AI細分化**に伴う一時テーブルやログテーブル  
- **Markdownインポートエクスポート**での差分管理テーブル  
- これらはポートフォリオの範囲に合わせて必要に応じ追加します。

---

## 4. 詳細設計
- 物理設計やER図は `docs/system_design_2/database.md` を参照  
- 認証やセキュリティの観点はSupabaseのRLS(行レベルセキュリティ)などで対応可能

以上が簡易なDB概要です。  
**Supabase SSR** を前提としているので、自前の認証カラム/テーブルは最小限に留める想定です。

