FROM php:8.3-fpm
#composerをglobal化
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer
#拡張パッケージインストール
#今回はdebian系のパッケージをインストールかつ最新のnodejsをインストール
RUN apt-get -y update \
    && apt-get install -y curl apt-utils git zip unzip zlib1g-dev libzip-dev vim \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install pdo pdo_mysql \
    && curl https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs
# 作業ディレクトリを設定
WORKDIR /var/www/html
# Laravelのプロジェクトをコンテナにコピーした後に以下を追加
COPY backend/ /var/www/html
# bootstrap/cacheを作成
RUN mkdir -p storage/logs && \
    touch storage/logs/laravel.log && \
    ln -sf /dev/stdout storage/logs/laravel.log
# キャッシュディレクトリ設定
RUN mkdir -p bootstrap/cache && \
    chmod -R 777 bootstrap/cache

RUN php -d variables_order=EGPCS artisan config:clear && \
CACHE_STORE=array php artisan cache:clear && \
php artisan route:clear && \
php artisan view:clear
# Expose FPM Port
EXPOSE 9000

# Laravel DB接続＆マイグレーション確認
# CMD ["bash", "-c", "cd /var/www/html && php artisan migrate:status && php-fpm"]
CMD ["php-fpm"]