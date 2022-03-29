FROM nginx:1.21.6

LABEL version=1.0.0
LABEL email=wudi.link.me@gmail.com
LABEL description="app ui"

# configuration
COPY server/nginx.conf.template /etc/nginx/templates/

# create directories
RUN mkdir -p /apps/logs/nginx && mkdir -p /apps/html/app-ui && mkdir -p /apps/bin

COPY scripts/ /apps/bin
RUN chmod +x /apps/bin/dumb-init
# ADD will decompress *.gz, we can't use it for our static files
# html/**/*
COPY build/ /apps/html/app-ui

EXPOSE 5200/tcp

ENTRYPOINT ["/apps/bin/dumb-init", "--"]
CMD ["sh", "-c", "envsubst '${APP_SERVICE_DOMAIN}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]
