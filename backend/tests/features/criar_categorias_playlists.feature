Feature: Criação de categorias para playlists
      As a client que possui uma conta no sistema
      I want to categorizar (agrupar ou filtrar) playlists

#API 
Scenario: Playlist sem categoria
Given que eu sou um usuário logado no sistema com o id "0" 
When uma requisição GET for enviada para "/api/playlist/0"
Then o sistema retorna um JSON com o corpo
"""
[{"id": "1", "name": "melhores do grime", "genre": "grime", "description": "", "idUser": 0, "duration": 25},
{"id": "2", "name": "melhores do mpb", "genre": "mpb", "description": "", "idUser": 0, "duration": 50},
{"id": "3", "name": "UK Drill", "genre": "drill", "description": "", "idUser": 0, "duration": 120}]
"""
And é retornado um status "200" OK

Scenario: Playlists por gênero
Given que eu sou um usuário logado no sistema com o id "0" 
When uma requisição GET for enviada para "/api/playlist/0?genre=mpb"
Then o sistema retorna um JSON com o corpo
"""
[{"id": "2", "name": "melhores do mpb", "genre": "mpb", "description": "", "idUser": 0, "duration": 50}]
"""
And é retornado um status "200" OK

Scenario: Playlists por duração
Given que eu sou um usuário logado no sistema com o id "0" 
When uma requisição GET for enviada para "/api/playlist/0?duration=30"
Then o sistema retorna um JSON com o corpo
"""
[{"id": "1", "name": "melhores do grime", "genre": "grime", "description": "", "idUser": 0, "duration": 25}]
"""
And é retornado um status "200" OK

Scenario: Playlists por gênero e duração 
Given que eu sou um usuário logado no sistema com o id "0" 
When uma requisição GET for enviada para "/api/playlist/0?genre=drill?duration=120"
Then o sistema retorna um JSON com o corpo
"""
[{"id": "3", "name": "UK Drill", "genre": "drill", "description": "", "idUser": 0, "duration": 120}]
"""
And é retornado um status "200" OK

Scenario: Usuário sem playlist
Given que eu sou um usuário logado no sistema com o id "1" 
When uma requisição GET for enviada para "/api/playlist/1"
And o sistema retorna um JSON com o corpo
"""
[]
"""
Then é retornado um status "200" OK