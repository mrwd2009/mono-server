FROM nginx:latest

LABEL version=1.0.0
LABEL email=wudi.link.me@gmail.com
LABEL description="app ui"

# configuration
COPY server/nginx.conf /etc/nginx/nginx.conf

# create directories
RUN mkdir -p /apps/logs/nginx && mkdir -p /apps/html/app-ui

# ADD will decompress *.gz, we can't use it for our static files
# html/**/*
COPY build/ /apps/html/app-ui

EXPOSE 5200/tcp

CMD nginx -g "daemon off;"


