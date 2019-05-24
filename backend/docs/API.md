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