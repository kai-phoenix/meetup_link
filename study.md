composer require laravel/sanctum

# 解決内容記録

## バックエンド

composer create-project laravel/laravel backend --prefer-dist
で./backendにlaravelプロジェクト作成

認証機能にlaravel sanctumを使用することに
./backendにて公式ドキュメント(https://readouble.com/laravel/11.x/ja/sanctum.html)から以下のコマンドを使用
php artisan install:api

Class "Laravel\Sanctum\Sanctum" not foundと言われたため、./backendにて以下コマンドでSanctumを再インストールする
composer require laravel/sanctum

フロント側からバックエンド側へ通信を許可するファイルCors.phpがデフォルトでLaravel11に作成されてないので./backendにて以下コマンドでcors.phpをconfig/cors.phpへ作成
php artisan config:publish cors
cors.php内のallowed_originsプロパティにlocalhost:3000を入力する
'allowed_origins' => ['http://localhost:3000'],

次に認証用のAuthControllerを以下のコマンドで作成
php artisan make:controller AuthController

ログアウト機能が実装できたので保護ページ用のControllerを作成
docker compose exec app php artisan make:controller PostController --resource
docker compose exec app php artisan make:controller ProfileController --resource

## フロントエンド

typescriptでtestを行えるようにするためにnextjsディレクトリへ移動し以下コマンドでJestをインストールする
npm install --save-dev jest @types/jest ts-jest
npm install --save-dev ts-node
reactテストをするため、以下コマンドでjestライブラリ(react,jset-dom)をインストール
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm i -D jest-environment-jsdom

## Docker構築

キャッシュなしでのビルド
docker-compose build --no-cache

本番用と分けたい場合、開発用のdocker-compose.dev.ymlを作成し
以下コマンドで開発用のdockerを起動
(本アプリではnextjsのホットリロード機能を使いたいため分割した
docker/nextjs/Dockerfile.devに開発用設定を追加した。)

docker compose -f docker-compose.dev.yml up -d
(docker compose -f docker-compose.dev.yml up -d --build)
接続切るときは以下
docker compose -f docker-compose.dev.yml down

## DB

User検証用に以下のUser情報をコンテナ接続後に作成
(・・・はテーブル設定に沿う値)
docker compose exec app php artisan tinker
use App\Models\User;
User::create([
'name' => '・・・',
'email' => '・・・',
'password' => bcrypt('・・・')
]);
ログイン可能であることを確認
Event,Category,Reservationモデルを作成し、マイグレーションも作成
php artisan make:model Event --migration
php artisan make:model Category --migration
php artisan make:model Reservation --migration

## API設計

下記記事を参考にした

https://zenn.dev/arsaga/articles/4a72774b1c93d2
