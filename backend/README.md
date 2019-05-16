# Dependencies

Docker >= 
PostgreSQL >= 11.3

# Local Environment

To start the local environment, use

```
make start
```

To shut down all docker containers, use

```
make stop
```


# Database

To create the database:
```
make create_db
```

To populate the database:
```
make migration
```

# Unit Tests

To run the unit tests, use

```
make test
```

