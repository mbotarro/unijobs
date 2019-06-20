# Dependencies

- Go >= 11.0
- Docker >= 2
- PostgreSQL >= 11.3
- ElasticSearch >= 7.0

# Architecture

The image below shows the backend architecture with its main packages:

![Backend Architecture](docs/images/backend_architecture.png)

To know more about the backend architecture, go to the [Architecture Documentation](docs/architecture.md)

# Local Environment

To start the local environment, use

```
make start
```

To shut down all docker containers, use

```
make stop
```

# Databases

## PostgreSQL

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

## ElasticSearch

To create the ES indices:

```
make es_create_indices
```

To populate the indices with examples
```
make es_insert_examples
```

To delete the ES indices:

```
make es_drop_indices
```


# Unit Tests

Before running the tests, you should create the databases for test purposes and run the migration on it.

You can do so by usingd the commands
```
make create_test_db
make migration_test
make es_create_indices
```

You only need the create the test databases and run the migration once.

If you need to restart the dbs, you can drop the current ones using
```
make drop_test_db
make es_delete_indices
```

Then, to run the unit tests, use
```
make test
```

To show the test coverage in a HTML file, use:
```
make test_html
```

### WARNING

So far, the postgres has a dedicated database for tests but ElasticSearch uses the same database to run the application and for tests. So, if you run the tests in production, all ES data will be lost!!


# Server

First, create the required databases using
```
make create_db
make migration

make es_create_indices
```

then run

```
make run
```

