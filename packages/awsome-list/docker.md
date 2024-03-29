## Install docker
```
yum install docker
systemctl enable docker.service
systemctl start docker.service
systemctl status docker.service
```
## docker deamon
```
systemctl enable docker.service
systemctl start docker.service
systemctl status docker.service
```

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

 # execute bash in a running container
 docker exec -it container_name bash

 # limit container memory
 docker run -it -m "300M" --memory-swap "1G" image_name sh
```

## NodeJs best practices

https://snyk.io/wp-content/uploads/10-best-practices-to-containerize-Node.js-web-applications-with-Docker.pdf

## Save image to local file
```
docker save -o ./Downloads/app-service.tar app-service:1.0.0
```

## Load image into docker
```
docker load --input app-service:1.0.0
```

## Clear unused image
```
docker image prune

# To remove all images which are not used by existing containers, use the -a flag:
docker image prune -a
```

## Docker ARG, ENV

Refer https://vsupalov.com/docker-arg-env-variable-guide/

## ELK Config

Refer https://soulteary.com/2020/05/04/use-docker-to-build-elk-environment.html

## Docker compose down
`docker compose down -v`

## Docker compose up
`docker compose up`

## Change bridge network to connect public ip
```
sysctl net.ipv4.conf.all.forwarding=1

sudo iptables -P FORWARD ACCEPT


# Mac OS
Replace ip with gateway.docker.internal

```