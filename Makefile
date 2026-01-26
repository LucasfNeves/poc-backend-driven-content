.PHONY: up down logs shell migrate seed sync clean rebuild

up:
	cd docker && docker-compose up -d

down:
	cd docker && docker-compose down

logs:
	cd docker && docker-compose logs -f backend

shell:
	cd docker && docker-compose exec backend sh

migrate:
	cd docker && docker-compose exec backend pnpm prisma migrate dev

seed:
	cd docker && docker-compose exec backend pnpm prisma db seed

sync:
	cd docker && docker-compose exec backend pnpm sync import

rebuild:
	cd docker && docker-compose up -d --build

clean:
	cd docker && docker-compose down -v
