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