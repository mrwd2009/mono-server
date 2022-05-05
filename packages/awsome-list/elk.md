### query with pagination and sorter

http://localhost:9200/index_name/_search?size=10&sort=timestamp:desc&pretty

### Get all indices
http://localhost:9200/_cat/indices

### Get index template information
http://localhost:9200/_index_template/simple-service?pretty

### Get index mapping information
http://localhost:9200/.ds-simple-service-8.2.0-2022.05.04-000001/_mapping?pretty

### Create a index template

```
PUT /_index_template/simple-service HTTP/1.1
Host: localhost:9200
Content-Type: application/json
Authorization: Basic ZWxhc3RpYzpjaGFuZ2VtZQ==
Cache-Control: no-cache
Postman-Token: b30d7211-8759-8b1a-2e12-fccd8e44dce5

{
  "index_patterns":[
    "simple-service*"
  ],
  "mappings":{
    "properties":{
      "message":{
        "type":"keyword",
        "ignore_above":1024
      },
      "body":{
        "type":"text",
        "norms":false
      },
      "durationMs":{
        "type":"long"
      },
      "level":{
        "type":"keyword"
      },
      "query":{
        "type":"text",
        "norms":false
      },
      "remainedInfo":{
        "type":"text",
        "norms":false
      },
      "stack":{
        "type":"text",
        "norms":false
      },
      "timestamp":{
        "type":"date"
      },
      "trackId":{
        "type":"keyword",
        "ignore_above":1024
      },
      "logUser":{
        "type":"keyword",
        "ignore_above":1024
      }
    }
  }
}
```