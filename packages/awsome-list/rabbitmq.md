### Rabbitmq helm chart config
```
nodeSelector:
  "eks.amazonaws.com/nodegroup": "eks-cfex_k8s-components-node"
  
persistence:
  enabled: true
  accessModes:
    - ReadWriteOnce
  size: 8Gi

extraPlugins: "rabbitmq_auth_backend_oauth2 rabbitmq_management rabbitmq_web_dispatch rabbitmq_management_agent rabbitmq_prometheus"

ingress:
  enabled: true
  ingressClassName: nginx
  hostname: modeling-queue.dev.cfexcloud.com

metrics:
  enabled: true

replicaCount: 3

extraConfiguration: |
  management.disable_basic_auth = false
  auth_backends.1=rabbit_auth_backend_oauth2
  management.oauth_enabled=true
  management.oauth_client_id=modeling-tool-queue
  management.oauth_client_secret=xxx
  management.oauth_provider_url=https://modeling-user.dev.cfexcloud.com/realms/CFEX-User
  auth_oauth2.resource_server_id=modelingmq
  auth_oauth2.verify_aud=false
  auth_oauth2.jwks_url=https://modeling-user.dev.cfexcloud.com/realms/CFEX-User/protocol/openid-connect/certs
```

