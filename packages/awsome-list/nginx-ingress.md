### Install
```
helm install --debug --dry-run  modeling-nginx-ingress -f ingress-nginx/.env.values.yaml ./ingress-nginx

helm install  modeling-nginx-ingress -f ingress-nginx/.env.values.yaml ./ingress-nginx

helm upgrade  modeling-nginx-ingress -f ingress-nginx/.env.values.yaml ./ingress-nginx

kubectl --namespace modeling-tool get services -o wide -w modeling-nginx-ingress-ingress-nginx-controller


curl -i -H "Host: modeling-temp.playground.cfexcloud.com" a7da85b17bca94532b886341d1408a52-1947358696.us-west-2.elb.amazonaws.com
```
### SSL termination
```
https://github.com/kubernetes/ingress-nginx/tree/main/charts/ingress-nginx#aws-l7-elb-with-ssl-termination
```
### Uninstall
```
helm uninstall modeling-nginx-ingress
```

### Nginx rate limit
Reference https://chenyongjun.vip/articles/81

https://serverfault.com/questions/487463/nginx-rate-limiting-with-x-forwarded-for-header