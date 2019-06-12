# Dependencies

Docker >= 
PostgreSQL >= 11.3

# Architecture

To know more about the backend architecture, go to the Architecture doc!!

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

If you need to drop the db, you can use
```
make drop_db
```

# Unit Tests

Before running the tests, you should create a database for test purposes and run the migration on it.

You can do so by usingd the commands
```
make create_test_db
make migration_test
```

You only need the create the test database and run the migration once.

If you need to restart the db, you can drop the current one using
```
make drop_test_db
```

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

