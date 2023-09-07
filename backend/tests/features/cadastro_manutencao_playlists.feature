Feature: Cadastro e manutenção de playlists
    As a client que possui uma conta no sistema
    I want to adicionar/remover músicas de uma playlist e editá-la


    Scenario: Adicionar música a uma playlist como usuário logado
        Given que eu sou um usuário logado no sistema com o id "1"
        And o sistema tem uma playlist com o id "1", duracao "25", músicas "[1,2,3]" e quantidade de músicas "3"
        When eu atualizo a duração para "28"
        And eu atualizo a lista de músicas para para "[1,2,3,4]"
        And eu atualizo a quantidade de músicas para "4"
        Then o sistema retorna um JSON com o corpo
            """
            {
            "id": "1",
            "name": "melhores do grime",
            "genre": "grime",
            "description": "",
            "idUser": 0,
            "duration": "28",
            "qtdMusicas": "4",
            "id_musica": "[1,2,3,4]"
            }
            """
        And é retornado um status "200" como adicionado com sucesso

    Scenario: Excluir música da playlist como usuário logado
        Given que eu sou um usuário logado no sistema com o id "1"
        And o sistema tem uma playlist com o id "1", duracao "25", músicas "[1,2,3]" e quantidade de músicas "3"
        When eu desejo remover a música de id "3", eu atualizo a duração para "12"
        And eu atualizo a lista de músicas para para "[1,2]"
        And eu atualizo a quantidade de músicas para "2"
        Then o sistema retorna um JSON com o corpo
            """
            {
            "id": "1",
            "name": "melhores do grime",
            "genre": "grime",
            "description": "",
            "idUser": 0,
            "duration": "12",
            "qtdMusicas": "2",
            "id_musica": "[1,2]"
            }
            """
        And é retornado um status "200" como adicionado com sucesso