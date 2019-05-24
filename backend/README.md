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

Before running the tests, you should create a database for test purposes and run the migration on it.

You can do so by usingd the commands
```
make create_test_db
make migration_test
```

You only need the create the test database and run the migration once.

Then, to run the unit tests, use
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

