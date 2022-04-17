### Update version
`sfdx update`

### Login Dev Hub
Create an alias DevHub by using -a and make this the default org using -d.\
`sfdx auth:web:login -d -a DevHub`

Show help\
`sfdx force --help`

### Create scratch org
`sfdx force:org:create -s -f config/project-scratch-def.json -a dreamhouse-org`

### Open scratch org
`sfdx force:org:open`

### Push source meta to scratch org
`sfdx force:source:push`

### Assign permission set
`sfdx force:user:permset:assign -n Dreamhouse`

### Import test data
`sfdx force:data:tree:import --plan data/sample-data-plan.json`

### Create lwc unit test
`sfdx force:lightning:lwc:test:create -f force-app/main/default/lwc/otherComponents/otherComponents.js`

### Pull code from salesforce

https://salesforce.stackexchange.com/questions/332040/how-do-i-retrieve-all-files-in-vs-code

### Get geolocation field
Fuck, this is a salesforce bug.\
The fields order must be 'Boat__c.Geolocation__longitude__s', 'Boat__c.Geolocation__latitude__s'.\
https://salesforce.stackexchange.com/questions/274812/retrieving-geolocation-fields-from-a-lightning-web-component-using-getrecord