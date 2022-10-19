### Launch local 
```
docker run -e "discovery.type=single-node" -e "plugins.security.ssl.http.enabled=false" -d -p 9202:9200 -p 9602:9600 public.ecr.aws/opensearchproject/opensearch:2.3.0

curl -XGET http://localhost:9202 -u admin:admin
```