# Use uma imagem base do Node.js
FROM node:14

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todo o código-fonte para o diretório de trabalho
COPY . .

# Exponha a porta da API (se necessário)
EXPOSE 3000

# Inicie o servidor Node.js
CMD [ "npm", "start" ]