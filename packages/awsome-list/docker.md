## nginx

```
  # pull latest nginx image
  docker pull nginx

  # run nginx as a deamon
  docker run --name nginx-test -d -p 7002:80 nginx

  # run nginx with a volumn
  docker run --name nginx-test -d -p 7002:80 -v /Users/wudi/Project/modeling-ui/static_server/master:/usr/share/nginx/html:ro nginx
```

## Dockerfile
```
 # custom dockerfile and directory
 docker build -f /path/to/a/Dockerfile ./pwd

 # accelerate build
 DOCKER_BUILDKIT=1 docker build

 # enter docker image to view content
 docker run -it image_name sh

 # enter docker image with a new container, then destory it after exiting
 docker run -it --rm image_name sh

 # run image with environment
 docker run -it -e "NODE_ENV=production" image_name sh

 # limit container memory
 docker run -it -m "300M" --memory-swap "1G" image_name sh
```