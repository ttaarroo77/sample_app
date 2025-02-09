# コンポーネント概要 (overview_0/components.md)

このドキュメントは、AI Driven Todo アプリケーションの主要な UI コンポーネントの概要を提供します。`system_design_2/ui.md`により詳細なコンポーネント仕様が記述されています。

## チェックリスト

*   [　] 主要なコンポーネントのカテゴリ分け（認証、Todo表示、フォームなど）
*   [　] 各カテゴリの代表的なコンポーネントの例示 (簡単な説明付き)
*   [　] 詳細なコンポーネント仕様へのリンク

## コンポーネント概要

### 認証関連

*   **LoginForm:** ログインフォームを表示する
*   **RegisterForm:** ユーザー登録フォームを表示する
*   **PasswordResetForm:** パスワードリセットフォームを表示する
*   **AuthGuard:** 認証が必要なページを保護する

### Todo 表示関連

*   **KanbanBoard:** カンバンボード全体を表示する
*   **KanbanColumn:** カンバンの各列 (To Do, In Progress, Done) を表示する
*   **KanbanCard:** 各 Todo アイテムを表示するカード
*   **TodoList:** Todo リストを表示する (カンバン以外の表示形式の場合)
*   **TodoItem:** 個々の Todo アイテムを表示する
*    **Checkbox:** チェックボックスを表示

### フォーム関連

*   **TodoForm:** Todo の作成・編集フォーム
*   **KanbanConfigForm:** カンバン設定変更フォーム

### ユーザー設定関連

*   **UserProfile:** ユーザープロフィールを表示・編集する
*   **PasswordChangeForm:** パスワード変更フォームを表示する
*   **AvatarUpload:** アバターアップロードコンポーネント
*   **ThemeSelector:** テーマ選択コンポーネント

### 共通コンポーネント

*   **Header:** 共通ヘッダー
*   **Footer:** 共通フッター
*   **Layout:** ページ全体のレイアウト
*   **Button:** ボタン
*   **Input:** 入力フィールド
*   **Loader:** ローディングインジケーター
*   **ErrorMessage:** エラーメッセージ
*   **Avatar**: アバター画像

### その他

*   **LanguageSelector:** 言語設定
*   **ShortcutSettings:** ショートカット設定
*   **PushNotification:** プッシュ通知

## 詳細情報

詳細なコンポーネント仕様は、 `system_design_2/ui.md` を参照してください。