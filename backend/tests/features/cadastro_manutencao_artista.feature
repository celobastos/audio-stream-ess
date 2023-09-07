Feature: Cadastro e manutenção de artistas
      As um artista que não possui uma conta no sistema
      I want to me cadastar no sistema e poder editar meus dados posteriormente

Scenario: Cadastrar artista
Given que eu sou um artista de nome "Chico Buarque" não presente no sistema
When eu preencho meus dados de name, genre, description, login e pass com os valores respectivos "Chico Buarque", "MPB", "Cantor, compositor, dramaturgo, escritor e ator brasileiro", "chiquin123", "aba7788aba"
And uma requisição POST for enviada para "/api/artist"
Then o status da resposta deve ser "200"
And O JSON da resposta contem um artista com os valores de name, genre, description, login e pass iguais a "Chico Buarque", "MPB", "Cantor, compositor, dramaturgo, escritor e ator brasileiro", "chiquin123", "aba7788aba", respectivamente