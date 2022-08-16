### Build image
```
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 060723230445.dkr.ecr.us-west-2.amazonaws.com

cd modeling-api
docker build -t 060723230445.dkr.ecr.us-west-2.amazonaws.com/modeling-tool-api:1.0.1 .

cd modeling-ui
docker build -t 060723230445.dkr.ecr.us-west-2.amazonaws.com/modeling-tool-ui:1.0.1 .
```
### Install redis
```
helm repo add bitnami https://charts.bitnami.com/bitnami

# domain: local-redis-master

helm install local-redis --set auth.enabled=false bitnami/redis

#test connection
kubectl run --namespace modeling-tool redis-client --restart='Never'  --image docker.io/bitnami/redis:7.0.4-debian-11-r11 --command -- sleep infinity

kubectl exec --tty -i redis-client   --namespace modeling-tool -- bash
Connect using the Redis&reg; CLI:
   redis-cli -h local-redis-master
   redis-cli -h local-redis-replicas
```
### Install etcd
```

helm install local-etcd --set auth.rbac.create=false bitnami/etcd

# domain: local-etcd


# test connection
kubectl run local-etcd-client --restart='Never' --image docker.io/bitnami/etcd:3.5.4-debian-11-r22 --env ETCDCTL_ENDPOINTS="local-etcd.modeling-tool.svc.cluster.local:2379" --namespace modeling-tool --command -- sleep infinity

kubectl exec --namespace modeling-tool -it local-etcd-client -- bash
    etcdctl  put /message Hello
    etcdctl  get /message


helm install local-etcd --set auth.rbac.create=false --set readinessProbe.enabled=false --set livenessProbe.enabled=false --set startupProbe.enabled=false bitnami/etcd
```

### Install elasticsearch
```
helm install local-elasticsearch --set security.enabled=false bitnami/elasticsearch

# domain: local-elasticsearch:9200

ELASTICSEARCH_HOST=local-elasticsearch

function ensure_template {
	local elasticsearch_host="${ELASTICSEARCH_HOST:-elasticsearch}"

	local -a args=( '-s' '-D-' '-m15' '-w' '%{http_code}'
		"http://${elasticsearch_host}:9200/_index_template/rule-engine-modeling-api"
		'-X' 'PUT'
		'-H' 'Content-Type: application/json'
		'-d' "{\"index_patterns\":[\"rule-engine-modeling-api*\"],\"template\":{\"mappings\":{\"properties\":{\"message\":{\"type\":\"keyword\",\"ignore_above\":1024},\"body\":{\"type\":\"text\",\"norms\":false},\"exception\":{\"type\":\"boolean\"},\"durationMs\":{\"type\":\"long\"},\"level\":{\"type\":\"keyword\"},\"query\":{\"type\":\"text\",\"norms\":false},\"remainedInfo\":{\"type\":\"text\",\"norms\":false},\"stack\":{\"type\":\"text\",\"norms\":false},\"timestamp\":{\"type\":\"date\"},\"trackId\":{\"type\":\"keyword\",\"ignore_above\":1024},\"appEnv\":{\"type\":\"keyword\",\"ignore_above\":1024},\"nodeEnv\":{\"type\":\"keyword\",\"ignore_above\":1024},\"logUser\":{\"type\":\"keyword\",\"ignore_above\":1024}}}}}"
		)

	if [[ -n "${ELASTIC_PASSWORD:-}" ]]; then
		args+=( '-u' "elastic:${ELASTIC_PASSWORD}" )
	fi

	local -i result=1
	local output

	output="$(curl "${args[@]}")"
	if [[ "${output: -3}" -eq 200 ]]; then
		result=0
	fi

	if ((result)); then
		echo -e "\n${output::-3}\n"
	fi

	return $result
}
```

### Add helm values json
```
Refer https://www.arthurkoziel.com/validate-helm-chart-values-with-json-schemas/
```

### Test helm
```
helm install --debug --dry-run modeling-tool-ui ./modeling-ui

kubectl get namespace

kubectl config set-context --current --namespace=modeling-tool

kubectl config view --minify | grep namespace:


helm uninstall  modeling-tool-ui

helm install  modeling-tool-ui ./modeling-ui
```