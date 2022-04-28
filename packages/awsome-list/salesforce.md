### invalid_grant error when getting oauth token
Refer
https://stackoverflow.com/questions/34154385/getting-errorinvalid-grant-error-descriptionauthentication-failure-i


### SOQL query from parent to child

`select id, (select id from Equipment_Maintenance_Items__r) from case`

### SOQL query from child to parent
`select id, Equipment__r.id from Equipment_Maintenance_Item__c`

### SOQL upsert with external id
```
Account obj = new Account(Name = 'External Link Account 2', MyExtID__c = 'custom-id');
Database.UpsertResult result1 = Database.upsert(obj, Account.Fields.MyExtID__c) ;
```

```
Account obj = new Account(Name = 'External Link Account 3', MyExtID__c = 'custom-id');
upsert obj MyExtID__c;
```

### Get access token via username password
Access reset server in salesforce
```
curl -v https://login.salesforce.com/services/oauth2/token -d "grant_type=password" -d "client_id=xxx" -d "client_secret=xxx" -d "username=xxx" -d "password=xxx" -H "X-PrettyPrint:1"

curl https://playful-badger-b7cf4z-dev-ed.my.salesforce.com/services/apexrest/Cases/5008c00001IjusLAAR -H "Authorization: Bearer 0D8c0000085NV8\!ARsAQDzznHG2b_BSg9wMSUrWvrKmpG3rwBdr2ok.yXhU.8L0Nb3uODmb0OXjkcjdE8FHGZzuocqHfmWncOZ.kNLt3Oj3XPON" -H "X-PrettyPrint:1"
```

### Oauth2.0 through browser
Please refer https://trailhead.salesforce.com/content/learn/projects/build-a-connected-app-for-api-integration/implement-the-oauth-20-web-server-authentication-flow?trail_id=build-integrations-using-connected-apps


```
https://mycompany.my.salesforce.com/services/oauth2/authorize?
client_id=3MVG9IHf89I1t8hrvswazsWedXWY0i1qK20PSFaInvUgLFB6vrcb9bbWFTSIHpO8G2jxBLJA6uZGyPFC5Aejq&
redirect_uri=https://www.mycustomerorderstatus.com/oauth2/callback&
response_type=code

https://www.mycustomerorderstatus.com/oauth2/callback?
code=aPrx4sgoM2Nd1zWeFVlOWveD0HhYmiDiLmlLnXEBgX01tpVOQMWVSUuafFPHu3kCSjzk4CUTZg==

POST /services/oauth2/token HTTP/1.1
Host: mycompany.my.salesforce.com
Content-length: 307
Content-type: application/x-www-form-urlencoded
grant_type=authorization_code&
code=aPrxhgZ2MIpkSy0aOdn07LjKFvsFOis6RGcWXz7p8JQCjcqfed5NQLe7sxWwMY_JQFuLwHRaRA==&
client_id=3MVG9IHf89I1t8hrvswazsWedXWY0iqK20PSFaInvUgLFB6vrcb9bbWFTSIHpO8G2jxBLJA6uZGyPFC5Aejq&
client_secret=*******************&
redirect_uri=https://www.mycustomerorderstatus.com/oauth2/callback
```