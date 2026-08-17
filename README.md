# Meetup Link

Meetup Linkは、イベントを作成し、参加予定を管理するための個人開発Webアプリです。ユーザー登録・ログイン後、イベントの作成、編集、削除、参加予約、キャンセルを行えます。

## 主な機能

- ユーザー登録・ログイン・ログアウト
- プロフィール表示・編集
- イベントの作成・編集・削除
- イベントへの参加予約・キャンセル
- 定員と現在の予約人数の表示

## デモ
https://meetup-link.com

## 技術スタック

| 分類 | 技術 |
| --- | --- |
| Frontend | Next.js 16 / React 19 / TypeScript / Tailwind CSS |
| Backend | Laravel 12 / PHP 8.4 / Laravel Sanctum |
| Database | MySQL |
| Development | Docker / Docker Compose |
| AWS | Route 53 / ACM / ALB / ECS Fargate / ECR / RDS / Secrets Manager / CloudWatch Logs |
| CI/CD | GitHub Actions / GitHub OIDC |

## Architecture

```text
Route 53 / ACM
       ↓
Application Load Balancer (public subnet)
       ↓
ECS Fargate (private subnet / 0.5 vCPU / 1 GB)
├── nginx
├── Next.js
└── Laravel (PHP-FPM)
       ├── RDS for MySQL (private subnet)
       └── NAT Gateway → AWS API / Internet (outbound TCP 443)
```

ALBがHTTPリクエストをHTTPSへリダイレクトし、ECS上のnginxが画面リクエストをNext.jsへ、`/api`と`/storage`へのリクエストをLaravelへ振り分けます。認証APIにはLaravel SanctumのAPIトークンを使用しています。

## Security / Operation

現在のAWS環境では、以下を設定しています。

- ECRのpush時イメージスキャン
- CRITICALまたはHIGHの脆弱性を検出したイメージのデプロイ停止
- ECRタグの上書き禁止（immutable image tags）
- ECSタスク定義で固定イメージタグを使用
- GitHub OIDCによる一時認証（AWSアクセスキーをGitHubに保存しない）
- OIDCの信頼対象を本リポジトリの`main`ブランチに限定
- ECS deployment circuit breakerによる失敗時の自動ロールバック
- アプリケーションキーとDBパスワードをSecrets ManagerからECSへ注入
- ALBでHTTPSを終端し、HTTPアクセスをHTTPSへリダイレクト
- ECSタスクをプライベートサブネットに配置し、Public IPを無効化
- ECSの外向き通信をTCP 443、RDS向け通信をTCP 3306に制限
- RDSを外部非公開に設定
- RDSの自動バックアップを7日間保持
- RDSの削除保護
- VPC Flow LogsをCloudWatch Logsへ記録
- ECSコンテナログをCloudWatch Logsへ記録

記載内容は、リポジトリの設定と稼働中のAWS環境で確認できたものに限定しています。

## CI/CD

`main`ブランチへのpushを起点に、GitHub Actionsが次の順序で本番へデプロイします。

```text
Frontend / Backend tests
        ↓
GitHub OIDCでAWSの一時認証情報を取得
        ↓
proxy / app / frontをコミットSHAタグでECRへpush
        ↓
ECRスキャン完了待ち（最大15分）
        ↓
CRITICAL / HIGHが0件の場合のみmigrationを実行
        ↓
ECSサービスを新しいタスク定義へ更新
```

テスト、イメージbuild、スキャン、migrationのいずれかが失敗した場合は、ECSサービスを更新しません。サービス更新後に新タスクが安定しない場合は、deployment circuit breakerが直前のタスク定義へ自動的にロールバックします。

実行結果はGitHubリポジトリの`Actions` → `DEPLOY_TO_ECS`、稼働中のタスク定義とロールアウト状態はAWS Management ConsoleのECSサービス画面で確認できます。

## Local Development

### 必要なもの

- Docker
- Docker Compose

ルートディレクトリの`.env`にDocker Compose用のMySQL接続情報を設定し、次のコマンドを実行します。

```bash
docker compose -f docker-compose.dev.yml up -d --build
```

主なアクセス先は以下です。

- Frontend: `http://localhost:3000`
- Laravel/nginx: `http://localhost:8000`
- MailHog: `http://localhost:8025`

終了時は次のコマンドを実行します。

```bash
docker compose -f docker-compose.dev.yml down
```

## Test / Build

```bash
cd frontend
npm ci
npm run lint
npm test
npm run build

cd ../backend
composer install
php artisan test
```

## 背景

Laravelを中心とした業務経験から技術領域を広げるため、Next.js、TypeScript、Docker、AWS ECS Fargateを含む構成を一通り設計・構築・運用する技術検証として開発しています。商用サービスを想定した多機能化ではなく、フロントエンド、API、コンテナ、AWS公開環境までの接続と運用を自分で経験することを目的としています。

## 制約/未来の改善事項

- アップロード画像をECSタスク内のローカルストレージからS3へ移行
- RDSマスターユーザーから、アプリ実行用・migration用の最小権限DBユーザーへ分離
- RDSを暗号化ストレージへ移行
- Pull RequestのCIにフロントエンドのproduction buildとDockerイメージのビルド検証を追加
