### Add job to commit code
```
update-argocd-docker-tag:
  docker:
    - image: cimg/base:2022.10
  steps:
    - run: |
        git clone --depth 1 https://${GH_TOKEN}@github.com/CFEX-Cloud/rule-engine-service.git
        cd rule-engine-service
        git checkout main
        ls -lart
        git config user.email "rule-engine-service@cfexcloud.com"
        git config user.name "CircleCI Job"
        git remote -v
        echo "===before update tag:"
        grep 'docker_tag:' argocd/helm/values.yaml
        IMAGE_TAG="$(echo $CIRCLE_TAG | awk -F 'v' '{print $2}')"
        echo "CIRCLE_TAG=${CIRCLE_TAG}, IMAGE_TAG=${IMAGE_TAG}"
        sed -i "s/docker_tag:.*/docker_tag: \"${IMAGE_TAG}\"/" argocd/helm/values.yaml
        echo "===after update tag:"
        grep 'docker_tag:' argocd/helm/values.yaml
        git add argocd/helm/values.yaml
        echo "create new commit and push to remote..."
        git commit -m "Automatic commit from CircleCI after updating image tag to ${IMAGE_TAG} [skip ci]"
        git log -2
        git push https://${GH_TOKEN}@github.com/CFEX-Cloud/rule-engine-service.git main
```