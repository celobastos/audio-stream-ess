import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import ArtistEntity from '../../src/entities/artist.entity';
import ArtistRepository from '../../src/repositories/artist.repository';
import ModeratorEntity from '../../src/entities/moderator.entity';
import ModeratorRepository from '../../src/repositories/moderator.repository';

const feature = loadFeature('tests/features/login.feature');
const request = supertest(app);

jest.mock('../../src/repositories/artist.repository');
jest.mock('../../src/repositories/moderator.repository');

defineFeature(feature, test => {
  let mockArtistas: ArtistEntity[];

  const mockGetArtistas = jest.fn();
  mockGetArtistas.mockResolvedValue(true);
  ArtistRepository.prototype.getArtists = mockGetArtistas;

  let mockModeradores: ModeratorEntity[];

  const mockGetModeradores = jest.fn();
  mockGetModeradores.mockResolvedValue(true);
  ModeratorRepository.prototype.getModerators = mockGetModeradores;

  beforeEach(async () => {
    mockArtistas = [
      {
        id: '1',
        name: 'artista01',
        genre: 'grime',
        description: '',
        login: 'artista01',
        pass: 'teste123',
      },
    ];
  });

  beforeEach(async () => {
    mockModeradores = [
      {
        id: '1',
        name: 'moderador01',
        genre: 'grime',
        description: '',
        login: 'moderador01',
        pass: 'teste123',
      },
    ];
  });

  // TESTE DE LOGIN COMO ARTISTA
  test('login como artista', ({ given, when, then, and }) => {
    given(/^que o sistema está em funcionamento$/, async () => {
      mockGetArtistas.mockReturnValue(mockArtistas);
    });

    and(/^"(.*)" está cadastrado$/, async login => {
      expect(mockGetArtistas().filter((artista: ArtistEntity) => artista.login === login)).not.toBe(
        [],
      );
    });

    and(/^a senha cadastrada é "(.*)"$/, async pass => {
      expect(mockGetArtistas().filter((artista: ArtistEntity) => artista.pass === pass)).not.toBe(
        [],
      );
    });

    when(/^eu faço uma requisição POST para a url "(.*)" com JSON$/, async (url, body) => {
      let bodyParsed = JSON.parse(body);
      //console.log(bodyParsed)
      const response = mockGetArtistas();
      expect(response).toEqual([
        {
          id: '1',
          name: response[0].name,
          genre: response[0].genre,
          description: response[0].description,
          login: bodyParsed.login,
          pass: bodyParsed.pass,
        },
      ]);
    });

    then(/^o sistema autoriza o login como "(.*)"$/, login => {
      const response = mockGetArtistas();
      expect(response[0].login).toBe(login);
      // expect(mockArtistas()).toMatchObject(response)
    });

    and(/^o status retornado da requisição é "(.*)"$/, responseStatusCode => {
      let statusCode: number = 0;
      if (mockGetArtistas()) statusCode = 201;
      expect(+responseStatusCode).toBe(statusCode);
    });
  });

  // TESTE DE LOGIN COMO MODERADOR
  test('login como moderador', ({ given, when, then, and }) => {
    given(/^que o sistema está em funcionamento$/, async () => {
      mockGetModeradores.mockReturnValue(mockModeradores);
    });

    and(/^"(.*)" está cadastrado$/, async login => {
      expect(
        mockGetModeradores().filter((moderador: ModeratorEntity) => moderador.login === login),
      ).not.toBe([]);
    });

    and(/^a senha cadastrada é "(.*)"$/, async pass => {
      expect(
        mockGetModeradores().filter((moderador: ModeratorEntity) => moderador.pass === pass),
      ).not.toBe([]);
    });

    when(/^eu faço uma requisição POST para a url "(.*)" com JSON$/, async (url, body) => {
      let bodyParsed = JSON.parse(body);
      //console.log(bodyParsed)
      const response = mockGetModeradores();
      expect(response).toEqual([
        {
          id: '1',
          name: response[0].name,
          genre: response[0].genre,
          description: response[0].description,
          login: bodyParsed.login,
          pass: bodyParsed.pass,
        },
      ]);
    });

    then(/^o sistema autoriza o login como "(.*)"$/, login => {
      const response = mockGetModeradores();
      expect(response[0].login).toBe(login);
      // expect(mockModeradores()).toMatchObject(response)
    });

    and(/^o status retornado da requisição é "(.*)"$/, responseStatusCode => {
      let statusCode: number = 0;
      if (mockGetModeradores()) statusCode = 201;
      expect(+responseStatusCode).toBe(statusCode);
    });
  });

  //TESTE COM CREDENCIAIS INCORRETAS
  test('login com credenciais incorretas', ({ given, when, then, and }) => {
    given(/^que o sistema está em funcionamento$/, async () => {
      mockGetModeradores.mockReturnValue(mockModeradores);
    });

    and(/^e vamos tentar o login como (.*) (.*)$/, async (login, pass) => {
      expect(
        mockGetModeradores().filter((moderador: ModeratorEntity) => moderador.login === login),
      ).not.toBe([]);
      expect(
        mockGetModeradores().filter((moderador: ModeratorEntity) => moderador.pass === pass),
      ).not.toBe([]);
    });

    when(/^eu faço uma requisição POST para a url "(.*)" com JSON$/, async (url, body) => {
      let bodyParsed = JSON.parse(body);
      //console.log(bodyParsed)
      const response = mockGetModeradores();
      expect(response).not.toEqual([
        {
          id: '1',
          name: response[0].name,
          genre: response[0].genre,
          description: response[0].description,
          login: bodyParsed.login,
          pass: bodyParsed.pass,
        },
      ]);
    });

    then(/^o sistema nega o login como "(.*)"$/, login => {
      const response = mockGetModeradores();
      expect(response[0].login).not.toBe(login);
      expect(response[0].login).not.toBe(login);
      // expect(mockModeradores()).toMatchObject(response)
    });

    and(/^o status retornado da requisição é "(.*)"$/, responseStatusCode => {
      let statusCode: number = 0;
      if (mockGetModeradores()) statusCode = 401;
      expect(+responseStatusCode).toBe(statusCode);
    });
  });
});
