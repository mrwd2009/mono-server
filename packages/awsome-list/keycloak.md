### Star Dev
```
docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:19.0.1 start-dev

# Change port
bin/kc.sh start-dev --http-port 8180
```

### Endpoints
```
Admin URL: http://localhost:8080/admin/

Realm Admin URL: http://localhost:8080/admin/{realm-name}/console

Account URL: http://localhost:8080/realms/myrealm/account

# Get auth url info
curl -X GET http://localhost:8180/realms/myrealm/.well-known/openid-configuration

```

### Common Error
```
# <auth-method>OIDC</auth-method> and Either provider-url or auth-server-url needs to be configured
https://stackoverflow.com/questions/70922622/using-keycloak-adapter-with-wildfly-26-does-not-provide-keycloak-as-mechanism

https://wildfly-security.github.io/wildfly-elytron/blog/galleon-cli-keycloak/
```

### Admin UI
```
admin ui from org.keycloak.keycloak-admin-ui-20.0.2.jar
```

### Create theme jar
```
jar cf cfex-user-center.jar META-INF theme
```

### Set default theme
```
kc.sh start --spi-theme-default=custom-theme --spi-theme-welcome-theme=custom-theme
```

### Setup cluster
cache_stack kubernetes
https://github.com/keycloak/keycloak/discussions/10210

### Setup gmail app password
https://support.google.com/accounts/answer/185833?hl=en

### Helm installation
```
helm install modeling-user-center -f ./modeling-user-center/.env.values.yaml  ./modeling-user-center

helm upgrade modeling-user-center -f ./modeling-user-center/.env.values.yaml  ./modeling-user-center
```