# syntax=docker/dockerfile:1
FROM craftcms/nginx:8.0-dev

USER root
RUN apk add --no-cache bash openssh-client

USER www-data
