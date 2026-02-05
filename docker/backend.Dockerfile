FROM node:20-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Copiar o schema do Prisma antes de instalar
COPY prisma ./prisma

# Instalar dependências
RUN npm install

# Gerar Prisma Client
RUN npx prisma generate

# Copiar o resto do código
COPY . .

RUN chown -R node:node /app

USER node

EXPOSE 3000

# Não roda automaticamente, deixa o docker-compose rodar
CMD ["sh"]
