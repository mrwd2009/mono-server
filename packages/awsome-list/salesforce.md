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