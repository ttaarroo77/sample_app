# テンプレ
# Next Plan (計画)

## 現在の目標
- カンバン画面のドラッグ＆ドロップ機能を完成させる

## タスクリスト
### 1. ドラッグ＆ドロップ機能の実装
- [ ] Task A: ドラッグイベントの設定
  - React DnD または dnd-kit を導入し、ドラッグ可能なコンポーネントを作成
  - ドラッグ開始・終了時のイベントハンドラを実装
- [ ] Task B: カンバン列の状態管理
  - Recoil または Context API を使用して、カンバン列の状態を管理
  - ドラッグ＆ドロップ後の状態更新ロジックを実装
- [ ] Task C: API連携
  - ドラッグ＆ドロップ後の順序変更をAPIに反映
  - `PATCH /goals/:id` エンドポイントを使用して、目標の順序を更新

### 2. UI/UXの改善
- [ ] Task D: ドラッグ中の視覚的フィードバック
  - ドラッグ中のカードに影や透明度を追加
  - ドロップ可能な領域をハイライト表示
- [ ] Task E: レスポンシブデザイン対応
  - スマートフォンやタブレットでのドラッグ操作を最適化
  - タッチ操作に対応したUIを実装

### 3. テストの実施
- [ ] Task F: 単体テスト
  - ドラッグ＆ドロップ機能の単体テストを実装 (Jest + React Testing Library)
- [ ] Task G: E2Eテスト
  - Cypress を使用して、ドラッグ＆ドロップ操作のE2Eテストを実装

### 4. ドキュメントの更新
- [ ] Task H: ドラッグ＆ドロップ機能のドキュメント作成
  - 機能の使用方法や制約を `docs/system_design_2/ui.md` に追記
  - テストケースを `docs/testing_4/integrationTests.csv` に追加

### 5. GitHubリポジトリの設定
- [ ] Task I: GitHubリポジトリの作成と紐付け
  - GitHubで新しいリポジトリを作成
  - ローカルリポジトリを初期化し、リモートリポジトリを追加
  - `.env.local` にGitHubリポジトリのURLを設定
  - 変更をコミットしてプッシュ

### 6. AI連携の実装
- [ ] Task J: AIによる目標細分化の実装
  - OpenAI API を利用して、大目標を中・小目標に分解
  - `/api/ai` エンドポイントを実装し、AIからのレスポンスを処理
- [ ] Task K: Markdown連携の実装
  - Markdownファイルのインポート/エクスポート機能を実装
  - `/api/md/import` と `/api/md/export` エンドポイントを実装

### 7. 認証機能の強化
- [ ] Task L: Supabase Auth の統合
  - ログイン/ログアウト機能を Supabase Auth に委託
  - ユーザーセッションの管理と保護
- [ ] Task M: 二段階認証の実装
  - 将来的に二段階認証を実装するための準備

### 8. API仕様の確認とモックテスト
- [ ] Task N: API仕様の確認
  - `PATCH /goals/:id` のリクエストとレスポンスの形式を確認
  - `docs/overview_0/api-routes.md` に記載されている仕様を基に、リクエストとレスポンスの形式を整理
- [ ] Task O: モックデータを使用したテスト
  - モックデータを作成し、開発者ツールを使用して擬似的にAPIをテスト
  - モックAPIを呼び出し、リクエストとレスポンスの内容を確認

### 9. ルーティングとアイコンの対応関係の整理
- [ ] Task P: ルーティングの確認
  - `docs/overview_0/api-routes.md` や `docs/system_design_2/ui.md` を確認し、各アイコンの遷移先を整理
- [ ] Task Q: アイコンのルーティング設定
  - `app/components/Header.tsx` に各アイコンのルーティングを設定
- [ ] Task R: ページコンポーネントの作成
  - 各遷移先のページコンポーネントを作成
    - `app/mypage/page.tsx`
    - `app/profile/page.tsx`
    - `app/calendar/page.tsx`
    - `app/notifications/page.tsx`

### 10. プロジェクト構造の整理
- [ ] Task S: ディレクトリ構造の統合
  - [ ] frontend/app を frontend/src/app に統合
    - [ ] components の移動
    - [ ] fonts の移動
    - [ ] その他のファイルの移動
  - [ ] frontend/app ディレクトリの削除
  - [ ] test02/app ディレクトリの削除

- [ ] Task T: ファイルパスの修正
  - [ ] インポートパスの更新（@/ プレフィックスの使用）
  - [ ] 環境変数の設定確認
  - [ ] ビルドとテスト実行

## 進捗・備考
- [ ] 移動前に各ファイルのバックアップを取得してください
- [ ] 移動後は必ずビルドを実行し、エラーがないことを確認してください
- [ ] インポートパスの修正は、すべてのファイルで一貫性を持って行ってください

> 依存関係: Task A → Task B → Task C, Task D → Task E
> 優先度: Task A, Task B, Task C が最優先。UI/UX改善とテストはその後。
