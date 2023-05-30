# Use a imagem base do Node.js para construir a aplicação
FROM node:18.10 as builder

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e o arquivo package-lock.json (se existir)
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código da aplicação para o contêiner
COPY . .

# Execute o comando de build da aplicação
# RUN npm run build:prod
RUN npm run build

# Use a imagem base do Nginx para servir a aplicação
FROM nginx:latest

# Copie o resultado do build da aplicação para o diretório padrão do Nginx
COPY --from=builder /app/dist/* /usr/share/nginx/html/

# Expõe a porta 80 para acessar a aplicação
EXPOSE 80

# Inicie o servidor Nginx quando o contêiner for iniciado
CMD ["nginx", "-g", "daemon off;"]
