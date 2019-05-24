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

To show the test coverage in a HTML file, use:
```
make test_html
```

# Server

First, set up your local environment with the steps above, then run

```
make run
```

