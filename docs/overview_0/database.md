---
name: "docs/overview_0/database.md"
title: "データベース概要 (Database)"
description: "AI Todo Management - 簡易なテーブル構造の紹介 (Supabase SSR想定)"
---

# データベース概要 (Supabase SSRを念頭に)

- 本アプリケーションのDBは、**Supabase (PostgreSQL)** を利用する想定です。  
- SQLite等に切り替えても構いませんが、**Supabase SSR** ではPostgreSQLが標準です。

---

## 1. テーブル構成

### 1-1. `profiles` テーブル (Supabase Auth連携用)
| カラム       | 型          | 備考                                                    |
|--------------|-------------|---------------------------------------------------------|
| id           | uuid        | auth.usersテーブルの外部キー                           |
| username     | text        | ユーザー名（3文字以上）                                |
| avatar_url   | text        | アバター画像URL                                        |
| updated_at   | timestamptz | 更新日時                                               |

> **Supabase Auth** との連携により、認証情報（メール/パスワード）は `auth.users` テーブルで管理。  
> このテーブルは表示用の補助情報のみを保持します。

---

### 1-2. `goals` テーブル
| カラム       | 型          | 備考                                             |
|--------------|-------------|--------------------------------------------------|
| id           | bigint      | 自動採番                                        |
| user_id      | uuid        | profilesテーブルの外部キー                      |
| title        | text        | 目標タイトル                                    |
| description  | text        | 目標の詳細説明                                  |
| type         | text        | 'big' / 'medium' / 'small'                      |
| status       | text        | 'todo' / 'doing' / 'done'                       |
| board_id     | bigint      | boardsテーブルの外部キー                        |
| color        | text        | 目標カードの色                                  |
| created_at   | timestamptz | 作成日時                                        |
| updated_at   | timestamptz | 更新日時                                        |

---

### 1-3. `boards` テーブル
| カラム         | 型          | 備考                                             |
|----------------|-------------|--------------------------------------------------|
| id             | bigint      | 自動採番                                        |
| user_id        | uuid        | profilesテーブルの外部キー                      |
| title          | text        | ボード名称                                      |
| parent_goal_id | bigint      | goalsテーブルの外部キー                        |
| created_at     | timestamptz | 作成日時                                        |

> 目標とボードの双方向参照により、柔軟な階層構造を実現します。

---

## 2. セキュリティ設計
- 全テーブルでRow Level Security (RLS) を有効化
- プロフィール：全体公開（閲覧のみ）
- 目標・ボード：所有者のみアクセス可能

## 3. パフォーマンス最適化
- 主要な検索パターンに対するインデックス設定
- タイムスタンプ型の統一（`timestamptz`）
- 適切な外部キー制約の設定

## 4. 拡張性
- AI処理ログテーブル（オプション）
- Markdownインポート/エクスポート履歴
- タグ機能やコメント機能の追加が可能

詳細な設計情報は `docs/system_design_2/database.md` を参照してください。

