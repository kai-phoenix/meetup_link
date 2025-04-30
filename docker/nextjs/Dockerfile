# ベースイメージとしてNode.jsの23.6.1を使用
FROM node:23.6.1
# FROM node:18-alpine
#作業ディレクトリを/appに設定
WORKDIR /app/
# sharpに必要な依存ライブラリをインストール
RUN apt-get update && \
    apt-get install -y libc6-dev build-essential gcc autoconf automake zlib1g-dev libpng-dev libvips-dev
# package.json,package-lock.jsonを先にコピー
COPY frontend/package*.json ./
#依存関係をインストール
RUN npm install
# 確実に本番環境変数を明示的に指定
ENV NEXT_PUBLIC_API_URL=https://meetup-link.com
#残りのソースをコピー
COPY frontend/ .
#ビルド
RUN npm run build
#ポートを公開
EXPOSE 3000
# Next.jsアプリケーションの起動
CMD ["npm","start"]