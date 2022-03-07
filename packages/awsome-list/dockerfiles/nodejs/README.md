## Build
Build a new image with name 'nodejs-api' and tag '1.0.0'.
```
  docker build -t nodejs-api:1.0.0 .
```

## Terminated by CTRL+Z
You need to add following code to respond termination signal from docker

```
process.on('SIGINT', () => {
  console.info("Interrupted")
  process.exit(0)
})
```

## Check files in image

Run following command to start a temporary container
```
docker run -it --rm nodejs-api:1.0.0 bash
```