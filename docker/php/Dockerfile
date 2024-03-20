# syntax=docker/dockerfile:1
FROM php:8.2-fpm

RUN apt-get update

RUN apt-get update
RUN apt-get install -y vim
RUN echo "source /usr/share/vim/vim90/defaults.vim\nset mouse=" > ~/.vimrc

# Database syncing
RUN apt-get install -y openssh-client postgresql-client

# App extensions
RUN apt-get install -y libpq-dev && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql && docker-php-ext-install pdo pdo_pgsql pgsql
RUN apt-get install -y libicu-dev && docker-php-ext-install intl && docker-php-ext-configure intl
RUN apt-get install -y libzip-dev && docker-php-ext-install zip
RUN apt-get install -y libmagickwand-dev --no-install-recommends && pecl install imagick && docker-php-ext-enable imagick
RUN docker-php-ext-install opcache bcmath

RUN sed -i 's|memory_limit = [0-9]*M|memory_limit = 256M|' /usr/local/etc/php/php.ini-development
RUN sed -i 's|max_execution_time = [0-9]|max_execution_time = 120|' /usr/local/etc/php/php.ini-development
RUN mv /usr/local/etc/php/php.ini-development /usr/local/etc/php/php.ini

WORKDIR /var/www
