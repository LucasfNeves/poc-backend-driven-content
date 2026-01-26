.PHONY: docker-up docker-down docker-rebuild docker-logs docker-logs-db docker-shell docker-shell-db docker-migrate docker-migrate-create docker-seed docker-clean

docker-up:
	docker-compose --env-file .env -f docker/docker-compose.yml up -d

docker-down:
	docker-compose --env-file .env -f docker/docker-compose.yml down

docker-rebuild:
	docker-compose --env-file .env -f docker/docker-compose.yml up -d --build

docker-logs:
	docker-compose --env-file .env -f docker/docker-compose.yml logs -f backend

docker-logs-db:
	docker-compose --env-file .env -f docker/docker-compose.yml logs -f postgres

docker-shell:
	docker-compose --env-file .env -f docker/docker-compose.yml up -d && docker exec -it api sh

docker-shell-db:
	docker-compose --env-file .env -f docker/docker-compose.yml up -d && docker exec -it db psql -U postgres -d dynamic_screens

docker-migrate:
	docker-compose --env-file .env -f docker/docker-compose.yml up -d && docker exec -it api npx prisma migrate dev

docker-migrate-create:
	docker exec -it api npx prisma migrate dev --name $(name)

docker-seed:
	docker-compose --env-file .env -f docker/docker-compose.yml up -d && docker exec -it api npx prisma db seed

docker-clean:
	docker-compose --env-file .env -f docker/docker-compose.yml down -v
