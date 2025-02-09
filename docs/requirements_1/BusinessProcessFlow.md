# BusinessProcessFlow.md

このドキュメントは、Todoアプリの開発フローにおける現行業務フロー（As-Is）と、システム化後の業務フロー（To-Be）を記述します。本アプリは以下のフェーズで開発されます。

*   フェーズ0: 何もない状態 - アプリケーションの基盤が存在しない状態
*   フェーズ1: 普通のカンバンTodoアプリ - 基本的なカンバン形式のTodo管理機能を実装
*   フェーズ2: GPTs付きのカンバンTodoアプリ - AIによるタスク分解支援機能を付与 (将来的な目標)

## 1. As-Is Process Flow (Current Business Process Flow)

このセクションでは、フェーズ1で実装される「普通のカンバンTodoアプリ」における業務フローを記述します。

### 1.1. カンバン形式のTodo管理

```sequence
sequenceDiagram
    actor User as ユーザー
    participant UI as UIレイヤー
    participant API as APIサーバー
    participant DB as データベース
    User->>UI: タスクの新規作成
    UI->>API: タスク作成リクエスト
    API->>DB: タスクデータ保存
    DB-->>API: 保存完了
    API-->>UI: タスク作成完了レスポンス
    UI-->>User: タスク作成完了表示
    User->>UI: タスクのステータス変更
    UI->>API: ステータス更新リクエスト
    API->>DB: ステータスデータ更新
    DB-->>API: 更新完了
    API-->>UI: ステータス更新完了レスポンス
    UI-->>User: 新しいステータス表示
    User->>UI: タスクの削除
    UI->>API: タスク削除リクエスト
    API->>DB: タスクデータ削除
    DB-->>API: 削除完了
    API-->>UI: タスク削除完了レスポンス
    UI-->>User: タスク削除完了表示
content_copy
download
Use code with caution.
Markdown
1.2. ユーザー認証機能
sequenceDiagram
    actor User
    participant Frontend
    participant Backend
    participant DB
    User->>Frontend: ログイン画面にアクセス
    Frontend->>User: ログインフォーム表示
    User->>Frontend: メールアドレス/パスワード入力
    Frontend->>Backend: 認証リクエスト
    Backend->>DB: ユーザー情報照会
    DB->>Backend: ユーザー情報返却
    Backend->>Frontend: 認証結果返却
    alt 認証成功
        Frontend->>User: メイン画面へリダイレクト
    else 認証失敗
        Frontend->>User: エラーメッセージ表示
    end
content_copy
download
Use code with caution.
Sequence
1.3. ユーザー設定管理
sequenceDiagram
    actor User as ユーザー
    participant UI as ユーザー設定画面
    participant API as APIサーバー
    participant DB as データベース
    User->>UI: 設定画面を開く
    UI->>API: ユーザー情報取得リクエスト
    API->>DB: ユーザーデータ取得
    DB-->>API: ユーザーデータ返却
    API-->>UI: ユーザー情報を表示
    User->>UI: プロフィール情報を編集
    UI->>API: 更新リクエスト送信
    API->>DB: ユーザーデータ更新
    DB-->>API: 更新完了通知
    API-->>UI: 更新完了メッセージ
    UI-->>User: 完了通知を表示
content_copy
download
Use code with caution.
Sequence
2. To-Be Process Flow (Systemized Business Process Flow)

このセクションでは、将来的に実装を目指すフェーズ2「GPTs付きのカンバンTodoアプリ」における業務フローを記述します。

2.1. カンバン形式のTodo管理 (GPTs連携)
sequenceDiagram
    actor User as ユーザー
    participant UI as UIレイヤー
    participant AI as AIサービス
    participant API as APIサーバー
    participant DB as データベース
    User->>UI: タスクの新規作成
    UI->>AI: タスク分解支援リクエスト
    AI-->>UI: タスク分解案提示
    UI-->>User: タスク分解案表示
    User->>UI: タスク分解案確認と修正
    UI->>API: タスク作成リクエスト
    API->>DB: タスクデータ保存
    DB-->>API: 保存完了
    API-->>UI: タスク作成完了レスポンス
    UI-->>User: カンバンボードに表示
    User->>UI: ドラッグアンドドロップで
ステータス変更
    UI->>API: ステータス更新リクエスト
    API->>DB: ステータスデータ更新
    DB-->>API: 更新完了
    API-->>UI: ステータス更新完了レスポンス
    UI-->>User: リアルタイムで
ステータス反映
    User->>UI: タスクの完了または削除
    UI->>API: タスク状態更新リクエスト
    API->>DB: タスクデータ更新
    DB-->>API: 更新完了
    API-->>UI: 更新完了レスポンス
    UI-->>User: カンバンボード更新表示
content_copy
download
Use code with caution.
Sequence
2.2. AIによるタスク分解支援 (GPTs連携)
sequenceDiagram
    actor User as ユーザー
    participant App as アプリケーション
    participant AI as AIエンジン
    participant GPT as GPTs
    participant DB as データベース
    User->>App: 大目標を入力
    App->>AI: 目標の分析を要求
    AI->>GPT: 使用するGPTsを選択
    GPT->>GPT: フレームワークを用いた目標分解
    GPT->>AI: 分解結果を返却
    AI->>AI: タスクの最適化と優先順位付け
    AI->>App: 細分化されたタスクを返却
    App->>User: 分解されたタスク一覧を表示
    User->>App: タスク内容の確認/修正
    App->>AI: タスクの妥当性を検証
    AI-->>App: 検証結果を返却
    App->>DB: 承認されたタスクを保存
    DB-->>App: 保存完了
    App->>User: タスク登録完了を通知
    App->>User: 習慣化のためのアドバイスを表示
content_copy
download
Use code with caution.
Sequence
2.3. ユーザー認証機能 (高度化)
sequenceDiagram
    actor User
    participant Frontend
    participant Backend
    participant DB
    User->>Frontend: ログイン画面にアクセス
    Frontend->>User: ログインフォーム表示
    User->>Frontend: メールアドレス/パスワード入力
    Frontend->>Frontend: 入力値バリデーション
    Frontend->>Backend: 認証リクエスト
    Backend->>Backend: リクエストの検証
    Backend->>DB: ユーザー情報照会
    DB->>Backend: ユーザー情報返却
    Backend->>Backend: パスワードハッシュ照合
    Backend->>Backend: JWTトークン生成
    Backend->>Frontend: 認証結果とトークン返却
    alt 認証成功
        Frontend->>Frontend: トークンをlocalStorageに保存
        Frontend->>User: メイン画面へリダイレクト
    else 認証失敗
        Frontend->>User: エラーメッセージ表示
        Frontend->>User: 再入力を促す
    end
content_copy
download
Use code with caution.
Sequence
2.4. ユーザー設定管理 (高度化)
sequenceDiagram
    actor User as ユーザー
    participant UI as ユーザー設定画面
    participant Validator as 入力検証
    participant API as APIサーバー
    participant Auth as 認証サービス
    participant FileStore as ファイルストレージ
    participant DB as データベース

    User->>UI: 設定画面を開く
    UI->>Auth: 認証確認
    Auth-->>UI: 認証OK
    UI->>API: ユーザー情報取得リクエスト
    API->>DB: ユーザーデータ取得
    DB-->>API: ユーザーデータ返却
    API-->>UI: ユーザー情報を表示

    User->>UI: プロフィール情報を編集
    UI->>Validator: 入力値検証
    Validator-->>UI: 検証結果

    alt アバター画像更新あり
        UI->>FileStore: 画像アップロード
        FileStore-->>UI: 画像URL返却
    end

    UI->>API: 更新リクエスト送信
    API->>DB: ユーザーデータ更新
    DB-->>API: 更新完了通知
    API-->>UI: 更新完了メッセージ
    UI-->>User: 完了通知を表示
content_copy
download
Use code with caution.
Sequence

備考:

各シーケンス図は、Mermaid記法で記述されています。

"フェーズ2: GPTs付きのカンバンTodoアプリ" は将来の計画であり、現時点では詳細な設計は行いません。必要に応じて、このドキュメントを更新してください。

開発の進捗に合わせて、各フローの詳細化や修正を行ってください。

この構成で、現行業務フローとシステム化後の業務フローを BusinessProcessFlow.md ファイル内で一元管理できます。

**変更点:**

*   見出しに `#` の数を使って階層構造を明確にしました。
*   リストの記述に `*` を使用しました。
*   全体的に Markdown の文法に沿って整形し、可読性を向上させました。

この構造であれば、Markdown ファイルとしてより見やすく、編集しやすいはずです。
content_copy
download
Use code with caution.