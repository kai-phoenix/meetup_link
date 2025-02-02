# 解決内容記録

## バックエンド

composer create-project laravel/laravel backend --prefer-dist
で./backendにlaravelプロジェクト作成

認証機能にlaravel sanctumを使用することに
./backendにて公式ドキュメント(https://readouble.com/laravel/11.x/ja/sanctum.html)から以下のコマンドを使用
php artisan install:api

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
