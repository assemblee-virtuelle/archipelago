ldp-navigator
====
CHECK

ldp-navigator is a library designed to facilitate navigation in [LDP](https://www.w3.org/TR/ldp/) data. It is massively based on [JSON-LD](https://json-ld.org/) technology and [jsonld librairy](https://www.npmjs.com/package/jsonld).
ldp-navigator is functionally similar to [LDFlex](https://github.com/LDflex/LDflex) but is intended to be minimalist. It is also based on Sublject logic rather than SPARQL logic. Adapters can be something other than SPARQL endpoints and are agnostic (not [communica](https://github.com/comunica/comunica/) dependent). The authentication mechanics of the SparqlAdapter and FetchlAdapter are free (solid-auth-client for communica) and easy to configure while being compatible (a CommunicaAdapter is quite possible).

ldp-navigator was created as part of the [Data Food Consortium](http://www.datafoodconsortium.org/) project. It was published and it is maintained by [Virtual Assembly](https://www.virtual-assembly.org/) as a stand-alone package.

## InMemory
The basic operation does not use persistence or cache and is not able to do an LDP fetch. It allows to initialize an instance with a JSON-LD dataset, to browse it and to get clusters of objects comparable to the framed form of the initial dataset from any subject of this dataset.

## Usage
### Import
import ES6. ldp-navigator is an ES6 module.
```
import LDPNavigator from 'ldp-navigator'
```
```
import { LDPNavigator } from "ldp-navigator";
```
If your project does not support ES6 imports, you can use 'fix-esm'.
```
 const LDPNavigator = require("fix-esm").require('ldp-navigator')
```
```
 const {LDPNavigator} = require("fix-esm").require('ldp-navigator')
```
### Test Sets
common code used for all examples
```
const ldpNavigator = new LDPNavigator();
const initSubject = {
  "@context" :{
    "vocabulary": "http://example.org/vocab#",
    "vocabulary:linkedObject":{
      "@type":"@id"
    }
  },
  "@graph":[
    {
      "@id": "myId1",
      "vocabulary:predicate": "object",
      "vocabulary:linkedObject": "myId2"
    },
    {
      "@id": "myId2",
      "vocabulary:predicate": "object",
      "vocabulary:linkedObject":[
        "myId1",
        "myId3"
      ]
    },
    {
      "@id": "myId3",
      "vocabulary:predicate": "object"
    }
  ]
};
await ldpNavigator.init(initSubject)
```
### init
Initialise data in memory.
Can be an uri. In this case, `ìnit('myId1')` call `resolveById('myId1')`.

### resolveById
```
const inMemorySubject1 = await ldpNavigator.resolveById('myId1');
```
inMemorySubject1
```
{
  "@id": "myId1",
  "vocabulary:predicate": "object",
  "vocabulary:linkedObject": "myId2"
}
```
this method can be use without previous `init()` method. In this case, LDPNavigator try to call `resolveById('myId1')` on adapters.

### get
```
const inMemorySubject1 = await ldpNavigator.resolveById('myId2');
const linkedObject = await ldpNavigator.get(inMemorySubject1,'vocabulary:linkedObject');
```
linkedObject
```
{
  "@id": "myId2",
  "vocabulary:predicate": "object",
  "vocabulary:linkedObject":[
    "myId1",
    "myId3"
  ]
}
```

### dereference
```
const inMemorySubject1 = await ldpNavigator.resolveById('myId1');
const inMemorySubject2 = await ldpNavigator.resolveById('myId2');
const dereferenced1 = await ldpNavigator.dereference(inMemorySubject1,{
  p:'vocabulary:linkedObject'
});
const dereferenced2 = await ldpNavigator.dereference(inMemorySubject2,{
  p:'vocabulary:linkedObject'
});
const dereferenced3 = await ldpNavigator.dereference(inMemorySubject1,{
  p:'vocabulary:linkedObject',
  n:{
    p:'vocabulary:linkedObject'
  }
});
```
dereferenced1
```
{
  "@id": "myId1",
  "vocabulary:predicate": "object",
  "vocabulary:linkedObject":{
    "@id": "myId2",
    "vocabulary:predicate": "object",
    "vocabulary:linkedObject":[
      "myId1",
      "myId3"
    ]
  }
}
```
dereferenced2
```
{
  "@id": "myId2",
  "vocabulary:predicate": "object",
  "vocabulary:linkedObject":[
    {
      "@id": "myId1",
      "vocabulary:predicate": "object",
      "vocabulary:linkedObject": "myId2"
    },
    {
      "@id": "myId3",
      "vocabulary:predicate": "object"
    }
  ]
}
```
dereferenced3
```
{
  "@id": "myId1",
  "vocabulary:predicate": "object",
  "vocabulary:linkedObject":{
    "@id": "myId2",
    "vocabulary:predicate": "object",
    "vocabulary:linkedObject":[
      {
        "@id": "myId1",
        "vocabulary:predicate": "object",
        "vocabulary:linkedObject": "myId2"
      },
      {
        "@id": "myId3",
        "vocabulary:predicate": "object"
      }
    ]
  }
}
```
### persist
```
await ldpNavigator.persist();
```
persist all data in memory to adapters. persist method is called on each adapters with data in memory.

## Config
### context
Context config is highly recommended. Context will be used whenever data are provided by adapters and subject uri or predicate uri needs be resolved. resolveById provide data express in this context. Context is extend by data provided through adapters if they provide additional context.
```
new LDPNavigator({
    context:{
      prefix:uri
    }
  });
```

### adapters
See Adapters Chapiter.
Adapters can be set by config or setter.
Adapter have to be replaced by specifc implementation in this example.
```
new LDPNavigator({
    adapters:[
      new Adapter()
    ]
  });
```
Example whith FetchAdapter and SparqlAdapter. See chapters concerning these adapters.
```
import { SparqlAdapter,FetchAdapter, LDPNavigator } from "ldp-navigator";
new LDPNavigator({
    adapters:[
      new SparqlAdapter({...}),
      new FetchAdapter({...})
    ]
  });
```


### forceArray

```
const ldpNavigator = new LDPNavigator({
    forceArray:['vocabulary:linkedObject']
  });
```

dereferenced1
```
{
  "@id": "myId1",
  "vocabulary:predicate": "object",
  "vocabulary:linkedObject":[
    {
      "@id": "myId2",
      "vocabulary:predicate": "object",
      "vocabulary:linkedObject":[
        "myId1",
        "myId3"
      ]
    }
  ]
}
```

## Adapters
Adapters allow to complete the InMemory core with connection and interoperability capabilities. Browsing on topics, not yet loaded in the instance, is comparable to dereferencing.
Adapters are cumulative and assigned with constructor config or ``setAdapters()``. They are called in the order of the array passed as parameters.
An instance of ldp-navigator with or without adapters is used in the same way. The adpaters will allow to look for data outside the memory of the instance and to persist them to return them later without depending on the life cycle of the instance.
When LDPNavigator needs to resolveById (direct call, dereference, get...), it try to resolve in memory. If data is not in memory, adapter try to resolveById in order of array. If an adapter resolve subject, upper adapter persist method are called.

### specification
Two methods can be implemented in an adapter : resolveById, persist
#### resolveById
Search a topic by its id/uri.
#### persist
persist a subject to find it at the next resolveById.
Have to support json-ld specification (`@context` and `@id` or `@graph`);

### FetchAdapter
It allows you to request the uri of a subject that is not yet InMemory. The headers are configurable to allow authentications or other parameters.
*persist N/A*

```
new FetchAdapter({
  headers: {}
})
```

#### headers
mandatory if triplestore needs authentificaiton.

HTTP headers

### SparqlAdapter

It allows querying a Sparql http endpoint to find a topic that is not yet InMemory. The endpoint, prefix and headers are configurable.
```
new SparqlAdapter({
  query:{
    endpoint :'',
    headers:{},
    prefix: ''
  },
  update:{
    endpoint :'',
    headers:{},
  },
  skipResolveById: true
})
```
#### query
configuration tu execute SPARQL query.

##### endpoint
mandatory.

Url of sparql Enpoint to send SPARQL query by HTTP.

##### headers
mandatory if triplestore needs authentificaiton.

HTTP headers.

##### prefix
optional.

All SPARQL prefix in on string.
These prefixes are used in each sparql query and allow to build `@context` if priple store support it.

#### update

##### endpoint
mandatory.

Url of sparql Enpoint to send SPARQL update by HTTP. Can be same that `query.endpoint` but is commonly not.

##### headers
mandatory if triplestore needs authentificaiton.

HTTP headers.

#### skipResolveById
optional.
not use it in normal usage.

if this option activated, adapter skip resolveById in adpaters stck resolution during `resolveById()` call of LDPNavigator. This feature allow to not considering resolving data in triple store and force du resolve id by next adapter.

### localStorageAdapter
It allows you to query the browser's localStorage for a topic that is not yet InMemory.
*Not implemented*
