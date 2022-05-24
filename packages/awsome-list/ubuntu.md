### Install microk8s

```
sudo snap install microk8s --classic

microk8s status --wait-ready

microk8s kubectl get all --all-namespaces

microk8s enable dns dashboard

alias mkctl="microk8s kubectl"

mkctl create deployment nginx --image nginx

mkctl expose deployment nginx --port 80 --target-port 80 --selector app=ngin
x --type ClusterIP --name nginx

microk8s kubectl get deployments
microk8s kubectl get services
microk8s kubectl delete deployments vfe-hello-wrold
microk8s kubectl delete service vfe-hello-wrold


microk8s reset

```