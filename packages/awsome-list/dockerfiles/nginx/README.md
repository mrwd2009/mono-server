## Build
Build a new image with name 'nginx-demo' and tag '1.0.0'.
```
  docker build -t nginx-demo:1.0.0 .
```

## Run
Run the image in daemon mode and map port from '7002' to '7003'.
```
  docker run --name nginx-demo -p 7003:7002 -d  nginx-demo:1.0.0
```

## Load balance using docker resolver

NGINX resolver directive: http://nginx.org/en/docs/http/ngx_http_core_module.html#resolverTo know more about the docker compose scale command: https://docs.docker.com/compose/reference/scale/