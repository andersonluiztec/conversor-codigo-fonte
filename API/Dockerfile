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

# Definir as variáveis de ambiente
ENV API_KEY_OPENAI=c2stVk1FMm5oTnJRdmRzTDBDcEZkd1RUM0JsYmtGSncyRFhVb0NzM0J1N3kxQVQ3NWVY
ENV API_URL_OPENAI=aHR0cHM6Ly9hcGkub3BlbmFpLmNvbS92MS9jb21wbGV0aW9ucw==

# Exponha a porta da API (se necessário)
EXPOSE 3000

# Inicie o servidor Node.js
CMD [ "npm", "start" ]