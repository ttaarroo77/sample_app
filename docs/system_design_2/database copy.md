# 詳細DB設計

本ファイルは、**AI Todo Management**におけるDBスキーマを詳細化します。  
**概要レベル**のテーブル情報は `overview_0/database.md` を参照してください。

---

## 1. ER図
erDiagram
PROFILES {
uuid id PK
text username
text avatar_url
timestamptz updated_at
}
BOARDS {
bigint id PK
uuid user_id FK
text title
bigint parent_goal_id FK
timestamptz created_at
}
GOALS {
bigint id PK
uuid user_id FK
text title
text description
text type
text status
bigint board_id FK
text color
timestamptz created_at
timestamptz updated_at
}
PROFILES ||--o{ BOARDS : "owns"
PROFILES ||--o{ GOALS : "owns"
BOARDS ||--o{ GOALS : "contains"



## 2. テーブル定義詳細

### 2-1. profiles テーブル
PK: id (uuid)  
Supabaseのauth.usersテーブルと連携し、ユーザーの補助情報を管理します。

| カラム名    | 型          | Not Null | 備考                          |
|------------|-------------|----------|-------------------------------|
| id         | uuid        | YES      | auth.usersテーブルの外部キー    |
| username   | text        | NO       | 3文字以上の制約あり             |
| avatar_url | text        | NO       | プロフィール画像のURL           |
| updated_at | timestamptz | NO       | 更新日時                       |

制約:
sql
constraint username_length check (char_length(username) >= 3)

### 2-2. boards テーブル
PK: id (bigint)  
ユーザーの目標を整理するためのボード情報を管理します。

| カラム名        | 型          | Not Null | 備考                    |
|----------------|-------------|----------|------------------------|
| id             | bigint      | YES      | 自動採番                |
| user_id        | uuid        | YES      | profilesテーブルの外部キー |
| title          | text        | YES      | ボードのタイトル         |
| parent_goal_id | bigint      | NO       | goalsテーブルの外部キー   |
| created_at     | timestamptz | YES      | 作成日時                |

### 2-3. goals テーブル
PK: id (bigint)  
ユーザーの目標情報を管理します。

| カラム名     | 型          | Not Null | 備考                    |
|-------------|-------------|----------|------------------------|
| id          | bigint      | YES      | 自動採番                |
| user_id     | uuid        | YES      | profilesテーブルの外部キー |
| title       | text        | YES      | 目標のタイトル           |
| description | text        | NO       | 目標の詳細説明           |
| type        | text        | YES      | big/medium/small       |
| status      | text        | YES      | todo/doing/done        |
| board_id    | bigint      | NO       | boardsテーブルの外部キー  |
| color       | text        | NO       | 目標カードの色           |
| created_at  | timestamptz | YES      | 作成日時                |
| updated_at  | timestamptz | YES      | 更新日時                |

制約:
sql
check (type in ('big', 'medium', 'small'))
check (status in ('todo', 'doing', 'done'))


## 3. セキュリティ設定

各テーブルにはRow Level Security (RLS)が設定されており、以下のポリシーが適用されています：

### profiles テーブル
- 全ユーザーが閲覧可能
- 自身のプロフィールのみ作成・更新可能

### boards テーブル
- 所有者のみが閲覧・作成・更新・削除可能

### goals テーブル
- 所有者のみが閲覧・作成・更新・削除可能

## 4. インデックス設計

主要な検索パターンに基づき、以下のインデックスを推奨します：
sql
-- プロフィール検索用
CREATE INDEX IF NOT EXISTS profiles_username_idx ON profiles(username);
-- ボード検索用
CREATE INDEX IF NOT EXISTS boards_user_id_idx ON boards(user_id);
CREATE INDEX IF NOT EXISTS boards_parent_goal_idx ON boards(parent_goal_id);
-- 目標検索用
CREATE INDEX IF NOT EXISTS goals_user_id_idx ON goals(user_id);
CREATE INDEX IF NOT EXISTS goals_board_id_idx ON goals(board_id);
CREATE INDEX IF NOT EXISTS goals_type_idx ON goals(type);
CREATE INDEX IF NOT EXISTS goals_status_idx ON goals(status);


## 5. 拡張性について

現在のスキーマは、以下の拡張に対応可能です：

- AI処理ログの追加（ai_logs テーブル）
- Markdownインポート履歴（md_imports テーブル）
- タグ機能の追加（tags, goal_tags テーブル）
- コメント機能の追加（comments テーブル）

これらの拡張は、アプリケーションの要件に応じて段階的に実装することが可能です。