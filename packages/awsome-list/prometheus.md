### Prometheus docker image
```
docker pull ubuntu/prometheus:2.32-20.04_beta

docker run -d --name prometheus-container -e TZ=UTC -p 30090:9090 ubuntu/prometheus:2.32-20.04_beta
```

Parameter	Description
-e TZ=UTC	Timezone.
-p 30090:9090	Expose Prometheus server on localhost:30090.
-v /path/to/prometheus.yml:/etc/prometheus/prometheus.yml	Local configuration file prometheus.yml (try this example).
-v /path/to/alerts.yml:/etc/prometheus/alerts.yml	Local alert configuration file alerts.yml (try this example).

To debug the container:\
`docker logs -f prometheus-container`

To get an interactive shell:\
`docker exec -it prometheus-container /bin/bash`

### Prometheus configuration file

```
global:
  scrape_interval: 5s
scrape_configs:
  - job_name: "app-prometheus"
    static_configs:
      - targets: ["docker.for.mac.host.internal:4000"]
```

### Grafana docker image
```
docker pull ubuntu/grafana:8.1-21.10_beta

docker run -d --name grafana-container -e TZ=UTC -p 30000:3000 ubuntu/grafana:8.1-21.10_beta
```
Parameters
Parameter	Description
-e TZ=UTC	Timezone.
-p 30000:3000	Expose Grafana on localhost:30000.
-v /path/to/grafana/provisioning/files/:/etc/grafana/provisioning/	Pass a directory with files to provision a Grafana datasource and dashboard (see documentation).
-v /path/to/persisted/data:/var/lib/grafana	Persist data with a voulme instead of initializing a new database for each newly launched container.

To debug the container: `docker logs -f grafana-container`

To get an interactive shell: `docker exec -it grafana-container /bin/bash`

### Grafana configuration file
```
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    orgId: 1
    url: http://192.168.1.4:9090
    basicAuth: false
    isDefault: true
    editable: true
```

### Docker compose for prometheus and grafana
Reference: https://github.com/coder-society/nodejs-application-monitoring-with-prometheus-and-grafana