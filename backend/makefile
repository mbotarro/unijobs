setup:
	go get -u github.com/golang/dep/cmd/dep

start:
	docker-compose --project-name unijobs up -d

stop:
	docker-compose --project-name unijobs down

create_db:
	createdb -h localhost -p 5432 unijobs -U postgres
	go run migrations/main.go init

migration:
	go run migrations/main.go

make run:
	go run main.go