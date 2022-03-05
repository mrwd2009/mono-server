FROM nginx:latest

LABEL version=1.0.0
LABEL email=1058215162@qq.com
LABEL description="just simple nginx demo"

# configuration
COPY nginx.conf /etc/nginx/nginx.conf

# create directories
RUN mkdir -p /apps/logs/nginx && mkdir -p /apps/html/demo

# ADD will decompress *.gz, we can't use it for our static files
# html/**/*
COPY html/ /apps/html/demo

EXPOSE 7002/tcp

CMD nginx -g "daemon off;"


