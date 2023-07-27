ARG PHP_VERSION
FROM php:${PHP_VERSION}-fpm-alpine

LABEL maintainer="Maksim K"


# Configure locale.
ARG LOCALE=POSIX
ENV LC_ALL ${LOCALE}

WORKDIR /var/www

CMD ["php-fpm"]

EXPOSE 9000