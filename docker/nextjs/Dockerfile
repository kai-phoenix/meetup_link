# ベースイメージとしてNode.jsの23.6.1を使用
FROM node:23.6.1
#依存関係のインストール(一度依存関係をクリアにする)
RUN npm install
#ビルド
RUN npm run build
#ポートを公開
EXPOSE 3000
# Next.jsアプリケーションの起動
CMD ["npm","start"]