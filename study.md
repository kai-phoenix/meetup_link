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
'allowed_origins' => ['http:localhost:3000'],

次に認証用のAuthControllerを以下のコマンドで作成
php artisan make:AuthController

## フロントエンド

typescriptでtestを行えるようにするためにnextjsディレクトリへ移動し以下コマンドでJestをインストールする
npm install --save-dev jest @types/jest ts-jest
npm install --save-dev ts-node

## Docker構築

キャッシュなしでのビルド
docker-compose build --no-cache

## API設計

下記記事を参考にした

https://zenn.dev/arsaga/articles/4a72774b1c93d2
