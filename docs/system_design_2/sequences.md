## UI

sequenceDiagram
    autonumber
    User->>Frontend: 画面操作
    Frontend->>Frontend: レスポンシブレイアウト適用
    Frontend->>Frontend: 多言語表示適用
    alt キーボードショートカット使用時
        User->>Frontend: ショートカットキー入力
        Frontend->>Frontend: ショートカット処理実行
    end
    alt 非同期処理実行時
        Frontend->>Frontend: ローディング表示開始
        Frontend->>Backend: API リクエスト
        Backend->>Frontend: レスポンス
        Frontend->>Frontend: ローディング表示終了
    end
    alt エラー発生時
        Frontend->>Frontend: エラーメッセージ表示
    end
    alt 通知発生時
        Backend->>Frontend: プッシュ通知送信
        Frontend->>User: プッシュ通知表示
    end


## 認証
sequenceDiagram
    autonumber
    actor User
    participant Frontend
    participant Backend
    participant DB

    %% ユーザー登録
    User->>Frontend: メールアドレスとパスワードを入力
    Frontend->>Backend: ユーザー登録リクエスト
    Backend->>DB: メールアドレスの重複チェック
    DB-->>Backend: 重複チェック結果
    Backend->>DB: パスワードハッシュ化してユーザー情報保存
    DB-->>Backend: 保存完了
    Backend-->>Frontend: 登録完了レスポンス
    Frontend-->>User: 登録完了表示

    %% ログイン
    User->>Frontend: メールアドレスとパスワードを入力
    Frontend->>Backend: ログインリクエスト
    Backend->>DB: ユーザー情報照会
    DB-->>Backend: ユーザー情報
    Backend->>Backend: パスワード検証とJWT生成
    Backend-->>Frontend: JWTトークン
    Frontend-->>User: ログイン完了表示

    %% ログアウト
    User->>Frontend: ログアウト要求
    Frontend->>Frontend: JWTトークン削除
    Frontend-->>User: ログアウト完了表示

    %% パスワードリセット
    User->>Frontend: パスワードリセット要求
    Frontend->>Backend: リセットメール送信リクエスト
    Backend->>DB: ユーザー確認
    DB-->>Backend: ユーザー情報
    Backend->>Backend: リセットトークン生成
    Backend-->>User: リセットメール送信
    User->>Frontend: リセットリンククリック
    Frontend->>Backend: 新パスワード設定
    Backend->>DB: パスワード更新
    DB-->>Backend: 更新完了
    Backend-->>Frontend: リセット完了レスポンス
    Frontend-->>User: パスワードリセット完了表示


## AI支援
sequenceDiagram
    autonumber
    actor User
    participant Frontend
    participant Backend
    participant AI_API
    participant DB

    User->>Frontend: Todo内容を入力
    Frontend->>Backend: Todo分析リクエスト
    Backend->>AI_API: タスク分解分析依頼
    AI_API-->>Backend: 分析結果返却
    Backend->>DB: タスク分解結果保存
    DB-->>Backend: 保存完了
    Backend-->>Frontend: タスク分解提案を返却
    Frontend-->>User: タスク分解結果を表示

    User->>Frontend: GPTs連携リクエスト
    Frontend->>Backend: GPTs API呼び出し
    Backend->>AI_API: GPTsモデルへの問い合わせ
    AI_API-->>Backend: GPTs分析結果
    Backend->>DB: GPTs連携結果保存
    DB-->>Backend: 保存完了
    Backend-->>Frontend: GPTs連携結果返却
    Frontend-->>User: GPTs提案を表示

    User->>Frontend: 優先度設定リクエスト
    Frontend->>Backend: AI優先度分析依頼
    Backend->>AI_API: 優先度分析実行
    AI_API-->>Backend: 優先度分析結果
    Backend->>DB: 優先度情報保存
    DB-->>Backend: 保存完了
    Backend-->>Frontend: 優先度設定結果返却
    Frontend-->>User: 優先度提案を表示


## Todo管理
sequenceDiagram
    User->>Frontend: Todoアイテム操作
    Frontend->>Backend: API リクエスト送信
    Backend->>DB: データベース操作実行
    DB-->>Backend: 操作結果返却
    Backend-->>Frontend: レスポンス送信
    Frontend-->>User: UI更新表示
    
    Note over Frontend,Backend: Todo作成/更新/削除/一覧取得
    Note over Frontend: カンバン表示
    Note over Frontend: ドラッグ&ドロップ操作
    Note over Frontend: フィルター/ソート/検索
    Note over DB: Todoテーブル
    Note over DB: ユーザーテーブル


## エラー処理
sequenceDiagram
    autonumber
    actor User
    participant Frontend
    participant Backend
    participant DB

    User->>Frontend: 操作実行
    Frontend->>Backend: リクエスト送信
    Backend->>DB: データ操作実行
    alt 書き込みエラー発生
        DB-->>Backend: エラー応答
        Backend-->>Frontend: エラーメッセージ返却
        Frontend-->>User: エラーメッセージ表示
    end

    alt ユーザー名重複エラー
        Backend->>DB: ユーザー名重複チェック
        DB-->>Backend: 重複検出
        Backend-->>Frontend: 重複エラーメッセージ返却
        Frontend-->>User: 重複エラーメッセージ表示
    end


## セキリュティ
sequenceDiagram
    User->>Frontend: パスワード入力
    Frontend->>Backend: パスワードを送信
    Backend->>Backend: パスワード暗号化
    Backend->>DB: 暗号化パスワード保存
    DB-->>Backend: 保存完了
    Backend->>Backend: セッションID生成
    Backend-->>Frontend: セッションID返却
    Frontend->>Frontend: セッションID保存
    Frontend-->>User: ログイン完了表示
    User->>Frontend: データ入力
    Frontend->>Backend: 入力データ送信
    Backend->>Backend: 入力値検証
    alt 二段階認証必要
        Backend-->>Frontend: 認証コード送信
        Frontend-->>User: 認証コード入力要求
        User->>Frontend: 認証コード入力
        Frontend->>Backend: 認証コード検証
    end
    Backend-->>Frontend: 処理結果返却
    Frontend-->>User: 結果表示


## ユーザー設定
sequenceDiagram
    actor User
    participant Frontend
    participant Backend
    participant DB

    User->>Frontend: プロフィール情報の編集を開始
    Frontend->>Backend: プロフィール情報の更新リクエスト
    Backend->>DB: ユーザー情報の検索
    DB-->>Backend: ユーザーデータ
    Backend->>DB: 更新されたプロフィール情報を保存
    DB-->>Backend: 保存完了
    Backend-->>Frontend: 更新成功レスポンス
    Frontend-->>User: 更新完了を表示

    User->>Frontend: パスワード変更を開始
    Frontend->>Backend: パスワード変更リクエスト
    Backend->>DB: 現在のパスワード検証
    DB-->>Backend: パスワード検証結果
    Backend->>DB: 新しいパスワードを保存
    DB-->>Backend: 保存完了
    Backend-->>Frontend: パスワード変更成功レスポンス
    Frontend-->>User: 変更完了を表示

    User->>Frontend: アバター画像のアップロード
    Frontend->>Backend: 画像ファイルの送信
    Backend->>DB: アバター画像URLを保存
    DB-->>Backend: 保存完了
    Backend-->>Frontend: アップロード成功レスポンス
    Frontend-->>User: アバター更新完了を表示

    User->>Frontend: テーマ変更を選択
    Frontend->>Backend: テーマ設定の更新リクエスト
    Backend->>DB: ユーザーのテーマ設定を保存
    DB-->>Backend: 保存完了
    Backend-->>Frontend: テーマ更新成功レスポンス
    Frontend-->>User: 新しいテーマを適用


## その他

