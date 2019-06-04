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
```
{
    email: user@user.com
    valid: <bool>
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
