Feature: Gerar um link compartilhável de páginas personalizadas
    As a client que possui uma conta no sistema
    I want to compartilhar playlists com meus amigos

Scenario: Criar link de compartilhamento de playlists
Given que eu sou o usuário com id "0"
And eu estou na página da playlist 
"""
{
    "id": "1",
    "name": "melhores do grime",
    "genre": "grime",
    "description": "",
    "idUser": 0,
    "duration": 25
}
"""
When eu clicar no ícone de compartilhamento da playlist
"""
{
    "id": "1",
    "name": "melhores do grime",
    "genre": "grime",
    "description": "",
    "idUser": 0,
    "duration": 25
}
"""
Then a url da playlist melhores do grime será "/api/playlist/0/1"
