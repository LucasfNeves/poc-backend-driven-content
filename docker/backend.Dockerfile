FROM node:20-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package.json package-lock.json* ./

# Copiar o schema do Prisma antes de instalar
COPY prisma ./prisma

# Instalar dependências
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# Copiar o resto do código
COPY . .

RUN chown -R node:node /app

USER node

EXPOSE 3000

CMD ["npm", "run", "dev"]
