FROM php:fpm
#RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable pdo_mysql && docker-php-ext-enable mysqli
RUN pecl install --force redis 
RUN docker-php-ext-enable redis