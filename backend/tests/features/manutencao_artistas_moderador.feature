Feature: Cadastro e manutenção de artistas
      As um usuário moderador logado no sistema
      I want to poder editar e gerenciar os diversos artistas presentes no sistema

Scenario: Atualizar artista como usuário moderador
Given que eu sou um usuário moderador logado no sistema
And o sistema tem um artista cadastrado com o nome "Genesis", id "45" descrição "Genesis é uma banda de rock progressivo britânica formada em 1967" e gênero "Rock Progressivo"
When eu atualizo o nome do artista para "Yes"
And eu atualizo a descrição do artista para "Yes é uma banda de rock progressivo britânica formada em 1968"
And eu atualizo o gênero do artista para "Rock Progressivo"
Then o sistema atualiza o artista de id "45" com o nome "Yes", descrição "Yes é uma banda de rock progressivo britânica formada em 1968" e gênero "Rock Progressivo"
And uma mensagem de sucesso é exibida

Scenario: Excluir artista como usuário moderador
Given que eu sou um usuário moderador logado no sistema
And há um artista cadastrado com o nome "Yes" e id "45"
When eu clico em "Excluir"
Then o sistema exclui o artista de id "45"
And uma mensagem de sucesso é exibida