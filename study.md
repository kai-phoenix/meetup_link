# 解決内容記録

## バックエンド

composer create-project laravel/laravel backend --prefer-dist

で./backendにlaravelプロジェクト作成

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
