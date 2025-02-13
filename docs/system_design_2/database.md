—--
name: "docs/system_design_2/database.md"
title: "詳細DB設計 (Database)"
description: "AI Todo Management - ER図やテーブル定義の詳細"
---

# 詳細DB設計

本ファイルは、**AI Todo Management**におけるDBスキーマを詳細化します。  
**概要レベル**のテーブル情報は `overview_0/database.md` を参照してください。

---

## 1. ER図 (例)

```mermaid
erDiagram
    USERS {
        uuid id PK
        varchar email
        varchar password  <-- Supabase使うなら不要
        varchar username
        varchar avatar_url
    }
    GOALS {
        bigint id PK
        varchar title
        varchar type  --> 'big'|'medium'|'small'
        varchar color
        bigint parent_id FK
        uuid user_id FK
    }
    USERS ||--o{ GOALS : "1対多"

    %% オプションで boards テーブルを追加する場合:
    BOARDS {
        bigint id PK
        varchar title
        varchar type
        varchar color
        bigint parent_goal_id FK
    }
    GOALS ||--o{ BOARDS : "has many columns if needed"


## 2. テーブル定義詳細
### 2-1. users テーブル
PK: id (uuid)
Supabaseを使う場合、auth.users が標準であるため、アプリ専用テーブルでは補助情報(avatar_url, username) のみ管理する形にする事が多い。

表

| カラム名   | 型         | Not Null | 備考                          |
|------------|------------|----------|-------------------------------|
| id         | uuid PK    | YES      | Supabase Authなら自動生成      |
| email      | varchar    | YES      | Unique制約                     |
| password   | varchar?   | NO       | 使わない場合あり               |
| username   | varchar    | NO       | ユーザー表示名                 |
| avatar_url | varchar    | NO       | アバター画像のURL              |


Index/Constraint例:
CREATE UNIQUE INDEX users_email_idx ON users(email);



### 2-2. goals テーブル
階層管理(大→中→小)に対応するため、parent_idを参照する場合は自己参照(Self join)


| カラム名   | 型         | Not Null | 備考                          |
|------------|------------|----------|-------------------------------|
| id         | bigint PK  | YES      | シーケンス or AUTO INCREMENT  |
| title      | varchar    | YES      | 目標タイトル                   |
| type       | varchar    | YES      | 'big','medium','small'        |
| color      | varchar    | NO       | カードカラー                   |
| parent_id  | bigint     | NO       | 上位の goal.id                |
| user_id    | uuid       | NO       | 所有ユーザー                   |


Index例:
CREATE INDEX goals_userid_idx ON goals(user_id);
CREATE INDEX goals_parent_idx ON goals(parent_id);



### 2-3. boards テーブル (任意)
もしカンバンの列概念をgoals と分離する場合のみ使用。
小規模アプリではgoalsテーブルだけで十分対応可能。

## 3. AI細分化用テーブル (オプション)
もしAIの処理履歴を残す場合は**ai_logs**などを追加し、「入力prompt」「AIレスポンス」「生成日時」などを記録すると分析しやすい。

## 4. Markdown入出力用テーブル (オプション)
同様に、インポートしたファイル履歴を保存したい場合に**md_import_logs**などを用意可能。

## 5. 物理設計上の注意
UUID vs AUTO INCREMENT: どちらを採用するかは好みや要件により異なる。SupabaseはUUIDがデフォルト。
Constraints/Foreign Keys: Supabaseの場合、REFERENCES 制約を使うかどうか選択可能。
パフォーマンス: 小規模ポートフォリオなので、基本的にIndex程度で十分。
以上が詳細なDB設計例です。実際の実装に合わせて変更してください。


