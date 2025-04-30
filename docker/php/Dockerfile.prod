FROM php:8.3-fpm

# 作業ディレクトリを指定
WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    git zip unzip vim libzip-dev \
    && docker-php-ext-install pdo_mysql zip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Composerのインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

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