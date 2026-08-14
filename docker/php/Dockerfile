# PHP 8.4系のalpineイメージを使用
#
# Debian版（php:8.4-fpm）はECR BASIC scanで CRITICAL 5 / HIGH 40 が出る。
# 内訳は glibc / perl / linux(ヘッダ) といったbase image同梱のOSパッケージで、
# アプリからは到達しないものが大半だが、再公開の判定基準（critical=0）を満たせない。
# alpine版は同梱パッケージが少なく検出数を大幅に減らせる。
FROM php:8.4-fpm-alpine

# 作業ディレクトリを指定
WORKDIR /var/www/html

# PHP拡張をインストール
#
# - libzip: zip拡張の実行時ライブラリ
# - .build-deps: 拡張のビルドにだけ必要なので、ビルド後に削除する
#   （残すとイメージにコンパイラが同梱され、サイズと攻撃面が増える）
# - vim は本番イメージに入れない（エディタは不要）
# - unzip はcomposerがdistアーカイブを展開するために使う
RUN apk add --no-cache libzip unzip \
    && apk add --no-cache --virtual .build-deps $PHPIZE_DEPS libzip-dev \
    && docker-php-ext-install pdo_mysql zip \
    && apk del .build-deps

# Composerのインストール（latestではなくメジャー固定）
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# backendのコードを /var/www/html にコピー
COPY backend/ /var/www/html

# composer install（本番用）
RUN composer install --no-dev --optimize-autoloader

# Laravelのストレージディレクトリのパーミッションを設定
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]
