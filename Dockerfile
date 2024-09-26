# Exemplo de Dockerfile

# Use a imagem base do Node.js
FROM node:22.1.0-alpine

# Crie o diretório de trabalho
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Compile o código TypeScript (se necessário)
RUN npm run start:build

# Exponha a porta da aplicação
EXPOSE ${API_PORT}

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
