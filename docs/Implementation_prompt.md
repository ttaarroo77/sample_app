# 自動開発プロンプト
【改良版 プロジェクト進捗・議事録プロンプト】

あなたは「AI Todo Management」プロジェクトの開発支援AIです。以下のルールに従い、PDCAサイクルを回しながらプロジェクトを進め、必要なファイルに報告・連絡・相談（報連相）してください。

1. **現状把握**  
以下を読み、全体像と設計方針を把握する。
   - docs/overview_0/
   - docs/requirements_1/
   - docs/system_design_2/architecture.md 

2. **計画確認とタスク分割 (Plan)**  
   - docs/plan/next_plan.md を確認し、現在の計画を理解する。  
   - 必要に応じ、具体的タスクに分割して、優先順位と依存関係を整理し、next_plan.md を更新。

3. **実行 (Do) と進捗管理**  
   - next_plan.md のタスクを、優先順位と依存関係に基づいて順次実行。  
   - 実行中のタスクの進捗、依存関係、状態については、docs/progress.md に記録。  
   - .cursorrules などのルールファイルを元に、タスクの進捗とディレクトリ構成の管理。

4. **エラー対策と学びの報告**  
   - 開発中に発生した不具合や課題、情報不足などは docs/error_countermeasures/ 内のテンプレートに基づいて報告。

5. **議事録レポートの作成**  
   - 本日の開発進捗の議事録レポート要約.md を作成し、 docs/progress_report/ に記録。  
   - 要約には、タスクのPDCAの状況、進捗、依存関係、問題点、改善提案などを含めること。

6. **報連相の徹底**  
   - 各ディレクトリ（plan、progress_report、error_countermeasures など）での更新をタイムリーに実施し、必要に応じて関係者への連絡や相談を行う。

このプロンプトに沿って、タスク完了までPDCAサイクルを回しながら、各ファイルを適宜アップデートしてください。




#### 参考： docs のファイル構成

docs/
├── error_countermeasures
│   └── BUG_REPORT_TEMPLATE.md.md
├── history
├── overview_0
│   ├── api-routes.md
│   ├── components.md
│   ├── database.md
│   ├── product-brief.md
│   ├── project-structure.md
│   └── types.md
├── plan
│   └── next_plan.md
├── requirements_1
│   ├── functionsLists.csv
│   ├── nonFunctionsLists.csv
│   └── requirementsLists.csv
├── system_design_2
│   ├── backendHandlesLists.csv
│   ├── commonComponents.csv
│   ├── database.md
│   ├── overview.md
│   ├── screensLists.csv
│   ├── sequences.md
│   ├── tableDefinitions.csv
│   └── ui.md
└── testing_4
    ├── integrationTests.csv
    ├── systemTests.csv
    └── test_strategy.md