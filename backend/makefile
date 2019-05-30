setup:
	go get -u github.com/golang/dep/cmd/dep

start:
	docker-compose --project-name unijobs up -d

stop:
	docker-compose --project-name unijobs down

create_db:
	@-createdb -h localhost -p 5432 unijobs -U postgres && go run migrations/main.go -db=unijobs init|| exit 0

drop_db:
	@-dropdb -h localhost -p 5432 unijobs -U postgres

create_test_db:
	@-createdb -h localhost -p 5432 unijobs_test -U postgres && go run migrations/main.go -db=unijobs_test init || exit 0

drop_test_db:
	@-dropdb -h localhost -p 5432 unijobs_test -U postgres

migration:
	go run migrations/main.go

migration_test:
	go run migrations/main.go -db=unijobs_test

run:
	go run main.go

build:
	go build main.go

test: migration_test
	go test ./... -cover | tee ../docs/testes/relatorio_testes_back.txt

test_html:
	go test ./... -coverprofile=cover.out && go tool cover -html=cover.out -o ../docs/testes/relatorio_testes_back_completo.html