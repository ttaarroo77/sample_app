# UI デザイン

このドキュメントは、アプリケーションの主要な画面遷移をまとめたものです。各画面の詳細な仕様は、別途ワイヤーフレームやプロトタイプを参照してください。

## 1. ユーザー認証

### 1.1. ユーザー登録

graph LR
    Start([開始]) --> Landing[ランディングページ]
    Landing --> Register[ユーザー登録]
    Register --> RegisterSuccess{登録成功?}
    RegisterSuccess -- Yes --> Dashboard[ダッシュボード]
    RegisterSuccess -- No --> RegisterError[登録エラー]
    RegisterError --> Register
    %% 補足：ユーザー名重複エラーの場合は、RegisterError に遷移

### 1.2. ログイン
graph LR
    Start([開始]) --> Landing
    Landing --> Login[ログイン]
    Login --> LoginSuccess{認証成功?}
    LoginSuccess -- Yes --> Dashboard
    LoginSuccess -- No --> LoginError[ログインエラー]
    LoginError --> Login
    Login --> PasswordReset[パスワードリセット]
    PasswordReset --> Login
    %% 補足：2段階認証が必要な場合は、LoginSuccess から 2FA 画面へ遷移

### 1.3. ログアウト
graph LR
    Dashboard --> Logout[ログアウト]
    Logout --> Landing


## 2. タスク管理 (Todo)
graph LR
    Dashboard --> TaskList[タスク一覧]
    TaskList --> CreateTask[タスク作成]
    TaskList --> EditTask[タスク編集]
    TaskList --> TaskDetails[タスク詳細]
    CreateTask --> TaskList
    EditTask --> TaskList
    TaskDetails --> TaskList
    TaskList --> KanbanView[カンバン表示]
    KanbanView --> EditKanbanName[カンバン名編集]
    KanbanView --> ArchivedTasks[アーカイブ一覧]
    KanbanView --> SearchResults[検索結果]
     %% 各画面からTaskListに戻るエッジは省略してシンプルに表現


## 3. AI 支援機能
graph LR
  TaskList --> AIDecomposition[タスク分解]
  TaskList --> GPTSelection[GPTs選択]
  TaskList --> HabitGPT[習慣化支援GPTs]
  TaskList --> FrameworkSelection[目標フレームワーク選択]
  GPTSelection --> CustomGPT[カスタムGPTs設定]
  TaskList --> PrioritySetting[優先度設定]
  TaskList --> DeadlineSetting[期日設定]

  %% 各画面からTaskListに戻るエッジは省略
  %% 各AI支援機能からタスクリストへのフィードバックループを表現
  AIDecomposition -- 結果を反映 --> TaskList
  GPTSelection -- 結果を反映 --> TaskList
  HabitGPT -- 結果を反映 --> TaskList
  FrameworkSelection -- 結果を反映 --> TaskList
  CustomGPT -- 結果を反映 --> TaskList
  PrioritySetting -- 結果を反映 --> TaskList
  DeadlineSetting -- 結果を反映 --> TaskList


## 4. ユーザー設定
graph LR
    Dashboard --> Settings[設定]
    Settings --> Profile[プロフィール編集]
    Settings --> ChangePassword[パスワード変更]
    Settings --> Avatar[アバター設定]
    Settings --> Theme[テーマ設定]
    %% 各設定画面からSettingsに戻るエッジは省略


## 5. 管理者機能 (管理者権限が必要)
graph LR
    Start([開始]) --> AdminLogin[管理者ログイン]
    AdminLogin --> AdminDashboard[管理者ダッシュボード]
    AdminDashboard --> APIDocumentation[APIドキュメント]
    AdminDashboard --> LogViewer[ログ表示]
    AdminDashboard --> SystemMonitor[システム監視]
    AdminDashboard --> BackupManagement[バックアップ管理]
    AdminDashboard --> AccessControl[アクセス制御]
    BackupManagement --> Restore[リストア]
    LogViewer --> LogDetails[ログ詳細]
    SystemMonitor --> SystemStatus[システム状態詳細]


## 6. その他の画面
graph LR
    Dashboard --> LoadingIndicator[ローディング表示]
    Dashboard --> ErrorDisplay[エラー表示]
    Dashboard --> PushNotification[プッシュ通知]