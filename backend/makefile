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

run:
	go run main.go

build:
	go build main.go

test:
	go test ./...

test_html:
	go test ./... -coverprofile=cover.out && go tool cover -html=cover.out