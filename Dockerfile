FROM node:16-alpine AS node

FROM nginx:alpine

# "install" node
COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/share /usr/local/share
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/bin /usr/local/bin

COPY dist /usr/share/nginx/html
COPY build/* /srv/

ENTRYPOINT ["/bin/sh", "-c"]
CMD ["node /srv/main.js && nginx -g 'daemon off;'"]
