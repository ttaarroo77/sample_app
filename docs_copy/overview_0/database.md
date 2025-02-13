# overview_0/database.md

## データベース概要 (overview_0)

このファイルは `overview_0` ディレクトリにおけるデータベースの概要を記述します。 `system_design_2` ディレクトリの `database.md` でより詳細なテーブル定義やER図が記述されます。

### 使用データベース

SQLite

### テーブル概要

*   **users:** ユーザー情報を格納するテーブル
    *   主要カラム: `id` (主キー), `email` (ユニーク), `username`, `password`, `avatar_url`
*   **todos:** Todo 情報を格納するテーブル
    *   主要カラム: `id` (主キー), `user_id` (外部キー), `title`, `status`, `checkboxes`
*   **kanban_config:** ユーザーごとのカンバン設定を格納するテーブル
    *   主要カラム: `id` (主キー), `user_id` (外部キー), `config`

## 詳細情報

詳細なテーブル定義やER図は、 `system_design_2/database.md` を参照してください。