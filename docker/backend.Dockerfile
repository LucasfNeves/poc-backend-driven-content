FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY ../backend/package.json ../backend/pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY ../backend .

RUN pnpm prisma generate

EXPOSE 3000

CMD ["pnpm", "dev"]
