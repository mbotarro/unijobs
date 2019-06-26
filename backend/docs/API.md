# User API

## Authenticate a User

### POST

```
/users/authenticate
```

#### Expected Body
```
{
    "email": user@user.com
    "password": <string>
}
```

#### Expected Reponse

##### Valid User

```
{
    "email": user@user.com
    "id": <int>
    "valid": true
}
```

##### Invalid User

```
{
    "email": user@user.com
    "id": -1
    "valid": false
}
```

## Get User Info

### GET

One must provide the user id.

```
/users/<id>
```

#### Expected Reponse

```
{
  "username": "user",
  "password": "1234",
  "email": "user@gmail.com",
  "address": "",
  "telephone": "1234-1234",
  "userid": 2,
  "student": true
}
```

##### Invalid User

## Get User Requests

### GET

One must provide the user `id` and the number of requests at `int`.

```
/users/<id>/requests?size=<int>
```

#### Expected Response

For `size` = 2

```
{
  "requests": [
    {
      "id": 6,
      "name": "Aula",
      "description": "Present Perfect",
      "extrainfo": "",
      "maxprice": 40,
      "minprice": 20,
      "userid": 1,
      "categoryid": 2,
      "timestamp": "2019-06-06T08:25:44.596591Z"
    },
    {
      "id": 5,
      "name": "Aula",
      "description": "Phrasal Verbs",
      "extrainfo": "",
      "maxprice": 40,
      "minprice": 20,
      "userid": 1,
      "categoryid": 2,
      "timestamp": "2019-06-06T07:25:44.596591Z"
    }
  ],
  "last": 1559805944
}
```

The `last` parameter is a cursor used for pagination. If you want to get the next 2 requests, you can send

```
/users/<id>/requests?size=<int>&before=<last>
```

You'll get

```
{
  "requests": [
    {
      "id": 4,
      "name": "Aula",
      "description": "Calculo IV",
      "extrainfo": "",
      "maxprice": 40,
      "minprice": 20,
      "userid": 1,
      "categoryid": 1,
      "timestamp": "2019-06-06T06:25:44.596591Z"
    },
    {
      "id": 3,
      "name": "Aula",
      "description": "Calculo III",
      "extrainfo": "",
      "maxprice": 40,
      "minprice": 20,
      "userid": 1,
      "categoryid": 1,
      "timestamp": "2019-06-06T05:25:44.596591Z"
    }
  ],
  "last": 1559798744
}
```

## Get User Offers

### GET

One must provide the user `id` and the number of offers at `int`.

```
/users/<id>/offers?size=<int>
```

#### Expected Response

For `size` = 2

```
{
  "offers": [
    {
      "id": "a74c4694-8eb2-11e9-bc42-526af7764a99",
      "name": "Babysitter",
      "description": "Cuido de crianças de 1 a 6 anos. Tenho recomendações",
      "extrainfo": "",
      "maxprice": 40,
      "minprice": 30,
      "expiration": "2020-06-26T04:00:58.332243Z",
      "userid": 2,
      "categoryid": 9,
      "timestamp": "2019-06-25T23:00:58.332243Z",
      "telephone": "(16)3509-1010",
      "email": "diego@usp.com",
      "interestedusers": [
        {
          "username": "Monica",
          "email": "monica@usp.br",
          "telephone": "(16)3509-1290"
        },
        {
          "username": "Diego",
          "email": "diego@usp.br",
          "telephone": "(16)3509-1010"
        }
      ]
    },
    {
      "id": "a74c4694-8eb2-11e9-bc42-526af7764a98",
      "name": "Entrega de Encomendas",
      "description": "Entrego encomendas particulares em qualquer lugar de São Carlos!",
      "extrainfo": "",
      "maxprice": 40,
      "minprice": 30,
      "expiration": "2020-06-26T04:00:58.332243Z",
      "userid": 2,
      "categoryid": 7,
      "timestamp": "2019-06-25T22:00:58.332243Z",
      "telephone": "(16)3509-1010",
      "email": "diego@usp.com",
      "interestedusers": [
        {
          "username": "Monica",
          "email": "monica@usp.br",
          "telephone": "(16)3509-1290"
        },
        {
          "username": "Diego",
          "email": "diego@usp.br",
          "telephone": "(16)3509-1010"
        }
      ]
    }
  ],
  "last": 1561500058
}
```

The `last` parameter is a cursor used for pagination. If you want to get the next 2 offers, you can send

```
/users/<id>/offers?size=<int>&before=<last>
```

You'll get

```
{
  "offers": [
    {
      "id": "a74c4694-8eb2-11e9-bc42-526af7764a97",
      "name": "Limpeza de Casa",
      "description": "Arrumo, lavo e passo!",
      "extrainfo": "",
      "maxprice": 40,
      "minprice": 30,
      "expiration": "2020-06-26T04:00:58.332243Z",
      "userid": 2,
      "categoryid": 6,
      "timestamp": "2019-06-25T21:00:58.332243Z",
      "telephone": "(16)3509-1010",
      "email": "diego@usp.com",
      "interestedusers": [
        {
          "username": "Monica",
          "email": "monica@usp.br",
          "telephone": "(16)3509-1290"
        },
        {
          "username": "Diego",
          "email": "diego@usp.br",
          "telephone": "(16)3509-1010"
        }
      ]
    },
    {
      "id": "a74c4694-8eb2-11e9-bc42-526af7764a96",
      "name": "Ajuda em Mudanças",
      "description": "Ajudo em durante a mudança e alugo caminhonete para carregar seus móveis!",
      "extrainfo": "",
      "maxprice": 40,
      "minprice": 30,
      "expiration": "2020-06-26T04:00:58.332243Z",
      "userid": 2,
      "categoryid": 5,
      "timestamp": "2019-06-25T20:00:58.332243Z",
      "telephone": "(16)3509-1010",
      "email": "diego@usp.com",
      "interestedusers": [
        {
          "username": "Monica",
          "email": "monica@usp.br",
          "telephone": "(16)3509-1290"
        },
        {
          "username": "Diego",
          "email": "diego@usp.br",
          "telephone": "(16)3509-1010"
        }
      ]
    }
  ],
  "last": 1561492858
}
```

# Request API

## Get and insert requests created in the platform

### POST

```
/requests
```

#### Expected Body
```
{
    "name": <string>
    "description": <string>
    "extrainfo": <string>
    "maxprice": <int>
    "minprice": <int>
    "userid": <int>
    "categoryid": <int>
}
```

##### Valid Insertion
A valid insert returns a 201 HTTP Status Code.
```
HTTP/1.1 201 Created
Date: Wed, 05 Jun 2019 12:00:59 GMT
Content-Length: 0
```

##### Invalid Insertion
An invalid insertion returns the error message.


### GET

One must provide the number of requests that should be sent.

```
/requests?size=<int>
```

#### Expected Reponse

For size = 2

```
{
    {
        "requests": [
            {
            "id": 6,
            "name": "Aula",
            "description": "Present Perfect",
            "extrainfo": "",
            "maxprice": 40,
            "minprice": 20,
            "userid": 1,
            "categoryid": 2,
            "timestamp": "2019-05-31T16:59:57.728024Z"
            },
            {
            "id": 5,
            "name": "Aula",
            "description": "Phrasal Verbs",
            "extrainfo": "",
            "maxprice": 40,
            "minprice": 20,
            "userid": 1,
            "categoryid": 2,
            "timestamp": "2019-05-31T15:59:57.728024Z"
            }
        ],
        "last": 1559318397
    }
}
```

The **last** parameter is a cursor used for pagination. If you want to get the next 2 requests, you can send

```
/requests?size=<int>&before=<last>
```

You'll get

```{
    "requests": [
        {
        "id": 4,
        "name": "Aula",
        "description": "Calculo IV",
        "extrainfo": "",
        "maxprice": 40,
        "minprice": 20,
        "userid": 1,
        "categoryid": 1,
        "timestamp": "2019-05-31T14:59:57.728024Z"
        },
        {
        "id": 3,
        "name": "Aula",
        "description": "Calculo III",
        "extrainfo": "",
        "maxprice": 40,
        "minprice": 20,
        "userid": 1,
        "categoryid": 1,
        "timestamp": "2019-05-31T13:59:57.728024Z"
        }
    ],
    "last": 1559311197
}
```

## Search for Requests in the platform

### GET

To search for requests based on a query, use the following URL:

```
/requests?q=<string>
```

The query parameter is used to match requests based in their name and their description. Name match has a higher score
than description match.

You might want to filter the fetched requests by one or more categories IDs. The categories ID must be separed by comma.

```
/requests?q=<string>&cat=<catID1>,<catID2>,...
```

#### Expected Reponse

For the following request

```
/requests?q=prova
```

the server returns:

```
{
  "requests": [
    {
      "id": "a74c4694-8eb2-11e9-bc42-526af7764f67",
      "name": "Álgebra Linear",
      "description": "Preciso de ajuda para prova",
      "extrainfo": "",
      "maxprice": 40,
      "minprice": 20,
      "userid": 2,
      "categoryid": 2,
      "timestamp": "2019-06-18T10:09:45.881559Z"
    },
    {
      "id": "a74c4694-8eb2-11e9-bc42-526af7764f65",
      "name": "Calculo II",
      "description": "Tenho prova semana que vem",
      "extrainfo": "",
      "maxprice": 40,
      "minprice": 20,
      "userid": 2,
      "categoryid": 2,
      "timestamp": "2019-06-18T08:09:45.881559Z"
    }
  ],
  "last": 0
}
```

So far, the search endpoint doesn't accept pagination, always returning all matched requests.

# Offer API

## Get and insert offers created in the platform

### POST 

```
/requests
```

#### Expected Body
```
{
    "name": <string>
    "description": <string>
    "extrainfo": <string>
    "maxprice": <int>
    "minprice": <int>
    "expiration": <string data as ISO8601>
    "userid": <int>
    "categoryid": <int>
    "telephone": <bool>
    "email": <bool>
}
```

### GET

One must provide the number of offers that should be sent.

```
/offers?size=<int>
```

#### Expected Reponse

For size = 2

```
{
    {
        "offers": [
            {
            "id": 6,
            "name": "Aula",
            "description": "Present Perfect",
            "extrainfo": "",
            "maxprice": 40,
            "minPrice": 20,
            "expiration": "2020-06-20T03:00:13.250602Z"
            "userid": 1,
            "categoryid": 2,
            "timestamp": "2019-05-31T16:59:57.728024Z",
            "telephone": "0000-0000",
            "email": "user@user.com"
            },
            {
            "id": 5,
            "name": "Aula",
            "description": "Phrasal Verbs",
            "extrainfo": "",
            "maxprice": 40,
            "minPrice": 20,
            "expiration": "2020-06-20T03:00:13.250602Z"
            "userid": 1,
            "categoryid": 2,
            "timestamp": "2019-05-31T15:59:57.728024Z",
            "telephone": "0000-0000",
            "email": "user@user.com"
            }
        ],
        "last": 1559318397
    }
}
```

The **last** parameter is a cursor used for pagination. If you want to get the next 2 offers, you can send

```
/offers?size=<int>&before=<last>
```

You'll get

```{
    "offers": [
        {
        "id": 4,
        "name": "Aula",
        "description": "Calculo IV",
        "extrainfo": "",
        "maxprice": 40,
        "minPrice": 20,
        "expiration": "2020-06-20T03:00:13.250602Z"
        "userid": 1,
        "categoryid": 1,
        "timestamp": "2019-05-31T14:59:57.728024Z",
        "telephone": "0000-0000",
        "email": "user@user.com"
        },
        {
        "id": 3,
        "name": "Aula",
        "description": "Calculo III",
        "extrainfo": "",
        "maxprice": 40,
        "minPrice": 20,
        "expiration": "2020-06-20T03:00:13.250602Z"
        "userid": 1,
        "categoryid": 1,
        "timestamp": "2019-05-31T13:59:57.728024Z",
        "telephone": "0000-0000",
        "email": "user@user.com"
        }
    ],
    "last": 1559311197
}
```

## Get Offers with Match Information

The alternative route can be used to return information regarding the match of an offer.
Pagination can be also used the same way when getting offers without this information.

### GET 
```
/offers/users/<userid>?size=2
```

#### Expected Response

```
{
    "offers": [
        {
            "id": "a74c4694-8eb2-11e9-bc42-526af7764a89",
            "name": "ICC II",
            "description": "Posso te ajudar em provas e trabalhos de ICCII",
            "extrainfo": "",
            "maxprice": 40,
            "minprice": 30,
            "expiration": "2020-06-24T17:00:36.477801Z",
            "userid": 1,
            "categoryid": 2,
            "timestamp": "2019-06-24T12:00:36.477801Z",
            "telephone": "1234-1234",
            "email": "user@gmail.com",
            "matched": false
        },
        {
            "id": "a74c4694-8eb2-11e9-bc42-526af7764a90",
            "name": "Aulas de Física",
            "description": "Dou aulas particulares de Física I, II, III e IV",
            "extrainfo": "",
            "maxprice": 60,
            "minprice": 40,
            "expiration": "2020-06-24T17:00:36.477801Z",
            "userid": 1,
            "categoryid": 2,
            "timestamp": "2019-06-24T12:00:36.477801Z",
            "telephone": "1234-1234",
            "email": "user@gmail.com",
            "matched": false
        }
    ],
    "last": 1561377636
}
```

## Search for Offers in the platform

### GET

To search for offers based on a query, use the following URL:

```
/offers?q=<string>
```

The query parameter is used to match offers based in their name and their description. Name match has a higher score
than description match.

You might want to filter the fetched offers by one or more categories IDs. The categories ID must be separed by comma.

```
/offers?q=<string>&cat=<catID1>,<catID2>,...
```

#### Expected Reponse

For the following request

```
/offers?q=prova
```

the server returns:

```
{
  "offers": [
    {
      "id": "a74c4694-8eb2-11e9-bc42-526af7764a89",
      "name": "ICC II",
      "description": "Posso te ajudar em provas e trabalhos de ICCII",
      "extrainfo": "",
      "maxprice": 40,
      "minprice": 30,
      "expiration": "2020-06-20T23:35:45.460566Z",
      "userid": 1,
      "categoryid": 2,
      "timestamp": "2019-06-20T18:35:45.460566Z",
      "telephone": "1234-1234",
      "email": "user@gmail.com"
    },
    {
      "id": "a74c4694-8eb2-11e9-bc42-526af7764a88",
      "name": "ICC I",
      "description": "Problemas com trabalhos ou provas de ICC I? Estou aqui para te ajudar!!",
      "extrainfo": "",
      "maxprice": 40,
      "minprice": 30,
      "expiration": "2020-06-20T23:35:45.460566Z",
      "userid": 1,
      "categoryid": 2,
      "timestamp": "2019-06-20T17:35:45.460566Z",
      "telephone": "1234-1234",
      "email": "user@gmail.com"
    },
    {
      "id": "a74c4694-8eb2-11e9-bc42-526af7764a87",
      "name": "Álgebra Linear",
      "description": "ou Mestrando em Matemática no ICMC. Posso ajudar com provas, listas, dúvidas teóricas etc",
      "extrainfo": "",
      "maxprice": 40,
      "minprice": 30,
      "expiration": "2020-06-20T23:35:45.460566Z",
      "userid": 1,
      "categoryid": 2,
      "timestamp": "2019-06-20T16:35:45.460566Z",
      "telephone": "1234-1234",
      "email": "user@gmail.com"
    },
    {
      "id": "a74c4694-8eb2-11e9-bc42-526af7764a86",
      "name": "Aula de Cálculo III",
      "description": "Aulas de preparação para provas e resolução de listas",
      "extrainfo": "",
      "maxprice": 40,
      "minprice": 30,
      "expiration": "2020-06-20T23:35:45.460566Z",
      "userid": 1,
      "categoryid": 2,
      "timestamp": "2019-06-20T15:35:45.460566Z",
      "telephone": "1234-1234",
      "email": "user@gmail.com"
    }
  ],
  "last": 0
}
```

So far, the search endpoint doesn't accept pagination, always returning all matched offers.

# Category API

## Get All Categories

### GET

```
/categories
```
#### Expected Response
```
[
  {
    "id": 1,
    "name": "Aulas.Biológicas",
    "description": "Aulas de biológicas"
  },
  {
    "id": 2,
    "name": "Aulas.Exatas",
    "description": "Aulas de exatas"
  },
  {
    "id": 3,
    "name": "Aulas.Humanas",
    "description": "Aulas de humanas"
  }
]
```

# Match API

## Insert offer match into database

### POST
To match the offer with id \<offerid\> with the user <userid>
```
/offers/<offerid>/users/<userid>
```
#### Expected Response 
A valid insert returns a 201 HTTP Status Code.
```
HTTP/1.1 201 Created
Date: Wed, 05 Jun 2019 12:00:59 GMT
Content-Length: 0
```

