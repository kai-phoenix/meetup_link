# ベースイメージとしてNode.jsの23.6.1を使用
FROM node:23.6.1
# FROM node:18-alpine
#作業ディレクトリを/appに設定
WORKDIR /app/
# package.json,package-lock.jsonを先にコピー
COPY frontend/package*.json ./
#依存関係をインストール
RUN npm install
#残りのソースをコピー
COPY frontend/ .
#ビルド
RUN npm run build
#ポートを公開
EXPOSE 3000
# Next.jsアプリケーションの起動
CMD ["npm","start"]