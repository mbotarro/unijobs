# User API

## Authenticate a User

### POST

```
/users/authenticate
```

#### Expected Body
```
{
    email: user@user.com
    password: <string>
}
```

#### Expected Reponse

##### Valid User

```
{
    email: user@user.com
    id: <int>
    valid: true
}
```

##### Invalid User

```
{
    email: user@user.com
    id: -1
    valid: false
}
```

## Get User Info

### GET

```
/users/<id>
```

#### Expected Reponse

```
{
  "Username": "user",
  "Password": "1234",
  "Email": "user@gmail.com",
  "Address": "",
  "Telephone": "1234-1234",
  "Userid": 2,
  "Student": true
}
```

##### Invalid User

## Get User Requests

### GET

```
/users/<id>/requests?size=<int>
```

#### Expected Response

For size = 2

```
{
  "requests": [
    {
      "ID": 6,
      "Name": "Aula",
      "Description": "Present Perfect",
      "ExtraInfo": "",
      "MaxPrice": 40,
      "MinPrice": 20,
      "Userid": 1,
      "Categoryid": 2,
      "Timestamp": "2019-06-06T08:25:44.596591Z"
    },
    {
      "ID": 5,
      "Name": "Aula",
      "Description": "Phrasal Verbs",
      "ExtraInfo": "",
      "MaxPrice": 40,
      "MinPrice": 20,
      "Userid": 1,
      "Categoryid": 2,
      "Timestamp": "2019-06-06T07:25:44.596591Z"
    }
  ],
  "last": 1559805944
}
```

The **last** parameter is a cursor used for pagination. If you want to get the next 2 requests, you can send

```
/users/<id>/requests?size=<int>&before=<last>
```

You'll get

```
{
  "requests": [
    {
      "ID": 4,
      "Name": "Aula",
      "Description": "Calculo IV",
      "ExtraInfo": "",
      "MaxPrice": 40,
      "MinPrice": 20,
      "Userid": 1,
      "Categoryid": 1,
      "Timestamp": "2019-06-06T06:25:44.596591Z"
    },
    {
      "ID": 3,
      "Name": "Aula",
      "Description": "Calculo III",
      "ExtraInfo": "",
      "MaxPrice": 40,
      "MinPrice": 20,
      "Userid": 1,
      "Categoryid": 1,
      "Timestamp": "2019-06-06T05:25:44.596591Z"
    }
  ],
  "last": 1559798744
}
```

# Request API

## Get all requests created in the platform

### POST

```
/requests
```

#### Expected Body
```
{
    name: <string>
    description: <string>
    extrainfo: <string>
    maxprice: <int>
    minprice: <int>
    userid: <int>
    categoryid: <int>
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
            "ID": 6,
            "Name": "Aula",
            "Description": "Present Perfect",
            "ExtraInfo": "",
            "MaxPrice": 40,
            "MinPrice": 20,
            "Userid": 1,
            "Categoryid": 2,
            "Timestamp": "2019-05-31T16:59:57.728024Z"
            },
            {
            "ID": 5,
            "Name": "Aula",
            "Description": "Phrasal Verbs",
            "ExtraInfo": "",
            "MaxPrice": 40,
            "MinPrice": 20,
            "Userid": 1,
            "Categoryid": 2,
            "Timestamp": "2019-05-31T15:59:57.728024Z"
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
        "ID": 4,
        "Name": "Aula",
        "Description": "Calculo IV",
        "ExtraInfo": "",
        "MaxPrice": 40,
        "MinPrice": 20,
        "Userid": 1,
        "Categoryid": 1,
        "Timestamp": "2019-05-31T14:59:57.728024Z"
        },
        {
        "ID": 3,
        "Name": "Aula",
        "Description": "Calculo III",
        "ExtraInfo": "",
        "MaxPrice": 40,
        "MinPrice": 20,
        "Userid": 1,
        "Categoryid": 1,
        "Timestamp": "2019-05-31T13:59:57.728024Z"
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
    "ID": 1,
    "Name": "Aulas.Biológicas",
    "Description": "Aulas de biológicas"
  },
  {
    "ID": 2,
    "Name": "Aulas.Exatas",
    "Description": "Aulas de exatas"
  },
  {
    "ID": 3,
    "Name": "Aulas.Humanas",
    "Description": "Aulas de humanas"
  }
]
```
