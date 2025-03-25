# アプリ概要
趣味の集団が集まるオフ会で、簡単に日程調整や予約管理が行えるような
アプリケーションを作成した。

## 機能一覧
- ユーザ登録・ログイン機能
- 予定作成・編集・削除機能
- 予定の参加・キャンセル機能
- 参加者人数の確認機能
- リマインダーメール通知機能

## 使用技術・開発環境
- フロントエンド
  - Next.js(React),Typescript,Tailwind CSS
- バックエンド
  - Laravel 11(PHP)
- インフラ・デプロイ(予定)
  - AWS(EC2,RDS,S3)

## インストール・実行方法
ローカルで試したいときは
docker compose -f docker-compose.dev.yml up -d --build
docker compose -f docker-compose.dev.yml down
でホットリロード付きで動作させられる

### フロントエンド起動
cd frontend
npm install npm run dev

### バックエンド起動
cd backend
composer install cp .env.example .env php artisan key:generate
php artisan migrate php artisan serve

### クローン
git clone https://github.com/kai-phoenix/meetup_link.git

## 今後の実装予定
- Googleカレンダー連携
- ユーザー権限の導入

## デモ画面(作成中)
![デモ画像]
