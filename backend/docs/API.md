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

# Request API

## Get all requests created in the platform

### POST

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
```
{
    id: <int>
    name: <string>
    timestamp: <int>
}
```

##### Invalid Insertion
```
{
    id: -1
    name: <string>
    timestamp: <int>
}
```

### GET

One must provide the number of requests that should be sent.

```
/requests?size=2
```

#### Expected Reponse

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
/requests?size=2&before=1559318397
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
