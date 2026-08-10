# Node.js 24系（LTS "Krypton"）のalpineイメージを使用
#
# - 23系は非LTSでサポート終了のため24系へ移行
# - Debian系（bookworm-slim）より同梱パッケージが少なく、
#   ECRスキャンで検出される脆弱性が少ない
# - sharp は package-lock.json に @img/sharp-linuxmusl-x64 が
#   含まれているため、musl環境でも事前ビルド済みバイナリで動く
FROM node:24.19.0-alpine3.24

# 作業ディレクトリを/appに設定
WORKDIR /app/

# package.json と package-lock.json を先にコピー
#
# グロブ（frontend/package*.json）は使わない。
# Finderの複製で作られる "package-lock 2.json" のような
# 意図しないファイルまでイメージに入るため、明示的に列挙する。
COPY frontend/package.json frontend/package-lock.json ./

# package-lock.json と依存関係をインストール
# npm ci は lock に固定された版だけを入れるため、audit した内容とイメージが一致する
#
# sharp のビルド依存（build-essential / libvips-dev など）は不要。
# package-lock.json に @img/sharp-linux-x64 / @img/sharp-libvips-linux-x64 の
# 事前ビルド済みバイナリが含まれており、ソースからのコンパイルが発生しない。
# ビルドツールを入れないぶんOSパッケージが減り、ECRスキャンの検出数も下がる。
RUN npm ci

# 確実に本番環境変数を明示的に指定
ENV NEXT_PUBLIC_API_URL=https://meetup-link.com

# 残りのソースをコピー
COPY frontend/ .

# ビルド
RUN npm run build

# ポートを公開
EXPOSE 3000

# Next.jsアプリケーションの起動
CMD ["npm","start"]
