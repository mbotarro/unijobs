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
      "id": 6,
      "name": "Aula",
      "description": "Verb To Be",
      "extrainfo": "",
      "maxprice": 40,
      "minprice": 30,
      "userid": 1,
      "categoryid": 2,
      "timestamp": "2019-06-13T10:28:42.411752Z"
    },
    {
      "id": 5,
      "name": "Aula",
      "description": "False Friends",
      "extrainfo": "",
      "maxprice": 40,
      "minprice": 30,
      "userid": 1,
      "categoryid": 2,
      "timestamp": "2019-06-13T09:28:42.411752Z"
    }
  ],
  "last": 1560418122
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
      "id": 4,
      "name": "Aula",
      "description": "Fisica IV",
      "extrainfo": "",
      "maxprice": 40,
      "minprice": 30,
      "userid": 1,
      "categoryid": 1,
      "timestamp": "2019-06-13T08:28:42.411752Z"
    },
    {
      "id": 3,
      "name": "Aula",
      "description": "Fisica III",
      "extrainfo": "",
      "maxprice": 40,
      "minprice": 30,
      "userid": 1,
      "categoryid": 1,
      "timestamp": "2019-06-13T07:28:42.411752Z"
    }
  ],
  "last": 1560410922
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
    "userid": <int>
    "categoryid": <int>
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
            "minPrice": 20,
            "userid": 1,
            "categoryid": 2,
            "timestamp": "2019-05-31T15:59:57.728024Z"
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
        "minPrice": 20,
        "userid": 1,
        "categoryid": 1,
        "timestamp": "2019-05-31T13:59:57.728024Z"
        }
    ],
    "last": 1559311197
}
```



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
