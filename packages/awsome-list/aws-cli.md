
### AWS Config
```
# Specify a profile
aws configure --profile di_wu_cli

# Default profile, directory is ~/.aws
aws configure
```
### Manage IAM User
```
aws iam create-user --user-name di_wu_test

aws iam get-user --user-name di_wu_test

aws iam list-access-keys --user-name di_wu_test

aws iam create-access-key --user-name di_wu_test

aws iam create-group --group-name admins

aws iam list-policies | grep AmazonEC2 | grep Access

aws iam attach-group-policy --policy-arn arn:aws:iam::aws:policy/AmazonEC2FullAccess --group-name admins

aws iam add-user-to-group --group-name admins --user-name di_wu_test

aws s3api put-bucket-acl --bucket cfex-playground-modeling --acl public-read

aws s3 sync ./release/ s3://cfex-playground-modeling/modeling-ui/

aws s3api put-bucket-acl --bucket cfex-playground-modeling --acl private

```

### Manage EC2 Server
```
aws ec2 create-security-group --group-name di_wu_ec2_sg --description "di wu demo"

aws ec2 authorize-security-group-ingress --group-name di_wu_ec2_sg --protocol tcp --port 22 --cidr 0.0.0.0/0

aws ec2 describe-security-groups --group-names di_wu_ec2_sg

aws --output table ec2 describe-images --filters "Name=description,Values=*Amazon Linux 2*" "Name=owner-alias,Values=amazon"

aws ec2 describe-subnets

aws ec2 run-instances --image-id ami-0fb245d430be8ebef --count 1 --instance-type t2.micro --key-name di_test_ec2 --security-group-ids sg-04f0635433dd611c3 --subnet-id subnet-0d220705b7ba28b6c --tag-specifications 'ResourceType=instance,Tags=[{Key=webserver,Value=produnction}]'

```

### List Buckets
```
aws s3 ls
```

### Update k8s config
```
aws eks --region us-west-1 update-kubeconfig --name playground-di-wu

kubectl cluster-info

kubectl get nodes

# check certificate
kubectl get Issuers,ClusterIssuers,Certificates,CertificateRequests,Orders,Challenges --all-namespaces
```

### ECR Login
```
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 060723230445.dkr.ecr.us-west-2.amazonaws.com
```

### k8s context related opertions
```
kubectl config view

kubectl config set-context \
dev-context \
--namespace=dev-namespace \
--cluster=docker-desktop \
--user=dev-user

kubectl config set-context \
<CONTEXT_NAME> \
--namespace=<NAMESPACE_NAME> \
--cluster=<CLUSTER_NAME> \
--user=<USER_NAME>

kubectl config set-context --current --namespace demo

# Shows which is the active context
kubectl config current-context

# Allows you to switch between contexts using their name
kubectl config use-context <CONTEXT_NAME>


kubectl config unset [field]
```