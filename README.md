# Rodar projeto do backend
1. Criar arquivo vazio .env.dev na pasta de backend
2. Rodar a imagem do postgres com user postgres e senha docker, com porta 5432 e criar um banco de dados com o nome 'mydb'
3. Selecionar o banco 'mydb'
4. instalar o nodemon -> npm i -g nodemon
5. Criar um arquivo .env com o seguinte conteúdo
```
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://postgres:docker@localhost:5432/mydb?schema=public"
```

# Gerar uma migration do prisma
```
npx prisma migrate dev --name nomeDaModificacao
```
para rodar as migrations do projeto basta usar
```
npx prisma migrate dev
```
# Fazendo o prisma gerar o client atualizado (depois de rodar as migrations a primeira vez)
```
npx prisma generate
```
# Telas do Projeto

![image](https://github.com/user-attachments/assets/c0e9d985-8e88-417e-a970-482cc48c39d6)
![image](https://github.com/user-attachments/assets/ee9adf61-ab55-4e23-a317-337e1f2e97ac)
![image](https://github.com/user-attachments/assets/4d5695ac-fab4-4c1d-b281-bbe53243fae5)


