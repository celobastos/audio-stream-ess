Feature: Fazer login
    As a client que possui uma conta no sistema
    I want to fazer o login do client com o tipo de conta correta
    So that eu posso controlar as permissões de cada conta

Scenario: login como artista
    Given que o sistema está em funcionamento
    And "artista01" está cadastrado
    And a senha cadastrada é "teste123"
    When eu faço uma requisição POST para a url "/api/auth/login" com JSON
    """
    {"login": "artista01", "pass": "teste123"}
    """
    Then o sistema autoriza o login como "artista01"
    And o status retornado da requisição é "201"

Scenario: login como moderador
    Given que o sistema está em funcionamento
    And "moderador01" está cadastrado 
    And a senha cadastrada é "teste123"
    When eu faço uma requisição POST para a url "/api/auth/login" com JSON
    """
    {"login": "moderador01", "pass": "teste123"}
    """
    Then o sistema autoriza o login como "moderador01"
    And o status retornado da requisição é "201"

Scenario: login com credenciais incorretas
    Given que o sistema está em funcionamento
    And e vamos tentar o login como "moderador02" "123teste"
    When eu faço uma requisição POST para a url "/api/auth/login" com JSON
    """
    {"login": "moderador02", "pass": "123teste"}
    """
    Then o sistema nega o login como "moderador02"
    And o status retornado da requisição é "401"
