.PHONY: help dev seed-create seed-update seed-delete db-reset up down rebuild exec kill-port logs

help: ## Mostra ajuda
	@echo "Comandos disponíveis:"
	@echo "  make dev           - Inicia servidor em modo desenvolvimento"
	@echo "  make seed-create   - Cria componentes via API"
	@echo "  make seed-update   - Atualiza componentes via API"
	@echo "  make seed-delete   - Deleta todos componentes via API"
	@echo "  make db-reset      - Reseta banco e cria componentes"
	@echo "  make up            - Sobe containers Docker"
	@echo "  make down          - Para containers Docker"
	@echo "  make rebuild       - Reconstroi e sobe containers"
	@echo "  make exec          - Acessa shell do container backend"
	@echo "  make logs          - Mostra logs do backend"
	@echo "  make kill-port     - Mata processo na porta 3000"

dev: ## Inicia servidor
	npm run dev

seed-create: ## Cria componentes
	@echo "Criando componentes..."
	npm run seed:create

seed-update: ## Atualiza componentes
	@echo "Atualizando componentes..."
	npm run seed:update

seed-delete: ## Deleta componentes
	@echo "Deletando componentes..."
	npm run seed:delete

db-reset: ## Reseta banco e cria componentes
	@echo "Resetando banco..."
	npm run prisma migrate reset --force
	@echo "Criando componentes..."
	npm run seed:create

kill-port: ## Mata processo na porta 3000
	@echo "Matando processo na porta 3000..."
	@lsof -ti:3000 | xargs kill -9 2>/dev/null || true

up: ## Sobe containers
	$(MAKE) kill-port
	docker compose --env-file .env -f docker/docker-compose.yml down -v
	docker compose --env-file .env -f docker/docker-compose.yml up -d --build

down: ## Para containers
	docker compose --env-file .env -f docker/docker-compose.yml down

rebuild: ## Reconstroi containers
	$(MAKE) kill-port
	docker compose --env-file .env -f docker/docker-compose.yml down -v
	docker compose --env-file .env -f docker/docker-compose.yml up -d --build

exec: ## Acessa shell do backend
	docker compose --env-file .env -f docker/docker-compose.yml restart backend
	docker exec -it api sh

logs: ## Mostra logs do backend
	docker compose --env-file .env -f docker/docker-compose.yml logs -f backend
