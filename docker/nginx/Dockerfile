FROM nginx:alpine

LABEL maintainer="Maksim K"

COPY nginx.conf /etc/nginx/

RUN set -x ; \
    addgroup -g 82 -S www-data ; \
    adduser -u 82 -D -S -G www-data www-data && exit 0 ; exit 1

RUN rm /etc/nginx/conf.d/default.conf

CMD ["nginx"]

EXPOSE 80