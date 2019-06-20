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
	go test ./... -p 1 -cover | tee ../docs/testes/relatorio_testes_back.txt

test_html:
	go test ./... -p 1 -coverprofile=cover.out && go tool cover -html=cover.out -o ../docs/testes/relatorio_testes_back_completo.html

es_create_indices:
	curl -X PUT localhost:9200/request -H "Content-Type:application/json" -d @elasticsearch/request.json
	curl -X PUT localhost:9200/offer -H "Content-Type:application/json" -d @elasticsearch/offer.json

es_insert_examples:
	curl -s -H "Content-Type: application/x-ndjson" -XPOST localhost:9200/_bulk --data-binary "@elasticsearch/requests_examples.json";

es_drop_indices:
	curl -X DELETE localhost:9200/request
	curl -X DELETE localhost:9200/offer
