Feature: Cadastro e manutenção de artistas
    As um artista logado no sistema
    I want to poder editar, gerenciar e excluir meus dados presentes no sistema

Scenario: Atualizar artista como artista logado
Given que eu sou um artista de nome: "Moody Blues", de id: "1" logado no sistema
When eu abro a caixa de edição do artista "Moody Blues", de id: "1", description: "Banda de rock inglesa formada em 1964" e genre: "Rock"
And eu atualizo o campo nome para "Bob Dylan", o campo description para "Cantor e compositor americano" e o campo genre para "Folk"
Then o banco de dados deve ter o artista "Bob Dylan", de id: "1", description: "Cantor e compositor americano" e genre: "Folk"

Scenario: Excluir artista como artista logado
Given que eu sou um artista de nome: "Bob Dylan", de id: "1" logado no sistema
When eu clico no botão de excluir do artista "Bob Dylan", de id: "1", description: "Cantor e compositor americano" e genre: "Folk"
Then o artista "Bob Dylan", de id: "1", description: "Cantor e compositor americano" e genre: "Folk" deve ser removido da lista de artistas
And eu devo ser desconectado do sistema
