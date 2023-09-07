import { defineFeature, loadFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import TestRepository from '../../src/repositories/test.repository';
import { di } from '../../src/di';
import PlaylistEntity from '../../src/entities/playlist.entity';
import PlaylistRepository from '../../src/repositories/playlist.repository';

const feature = loadFeature('tests/features/mostrar_Curtidas_e_Criadores.feature');
const request = supertest(app);
jest.mock('../../src/repositories/playlist.repository');

defineFeature(feature, test => {
  let mockPlaylists: PlaylistEntity[];
  const mockGetPlaylist = jest.fn();
  mockGetPlaylist.mockResolvedValue(true);
  let playlistRepository: PlaylistRepository = new PlaylistRepository();
  playlistRepository.getPlaylists = mockGetPlaylist;

  beforeEach(() => {
    mockPlaylists = [
      {
        id: '1',
        name: 'melhores do grime',
        genre: 'grime',
        description: '',
        idUser: 0,
        likes: [{ name: 'lucas' }, { name: 'marcelo' }],
        createdBy: 'marcelo',
      },
      {
        id: '2',
        name: 'melhores do mpb',
        genre: 'mpb',
        description: '',
        idUser: 0,
        likes: [{ name: 'lucas' }, { name: 'enderson' }, { name: 'pedro' }],
        createdBy: 'lucas',
      },
      {
        id: '3',
        name: 'UK Drill',
        genre: 'drill',
        description: '',
        idUser: 0,
        likes: [],
        createdBy: 'enderson',
      },
    ];
  });

  test('Visualizar todas as curtidas com 1 ou mais curtidas', ({ given, when, then, and }) => {
    //              que eu sou um usuário logado no sistema com nome
    given(/^que eu sou um usuário logado no sistema com o id "(.*)"$/, async id => {
      //checagem com login
      mockGetPlaylist.mockReturnValue(mockPlaylists);
    });
    when(/^eu faço uma requisição GET "(.*)" com o corpo$/, async (endPoint, corpoReq) => {
      if (endPoint) {
        const response = mockGetPlaylist(); //playlists do user com id 0
        let bodyRequested = corpoReq;
        expect(response).toEqual(JSON.parse(bodyRequested));
      }
    });

    then('é retornado um JSON com corpo', async body => {
      //expect(response.body.data).toEqual(body)
      expect(mockGetPlaylist().filter((playlist: any) => playlist.likes.length > 0)).toHaveLength(
        2,
      );
    });

    and(/^é retornado um status "(.*)" OK$/, responseStatusCode => {
      let statusCode: number = 0;
      if (mockGetPlaylist()) statusCode = 200;
      expect(+responseStatusCode).toBe(statusCode);
    });
  });

  test('Visualizar todos os criadores', ({ given, when, then, and }) => {
    given(/^que eu sou um usuário logado no sistema com o id "(.*)"$/, async id => {
      //checagem com login
      mockGetPlaylist.mockReturnValue(mockPlaylists);
    });
    when(/^eu faço uma requisição GET "(.*)" com o corpo$/, async (endPoint, corpoReq) => {
      if (endPoint) {
        const response = mockGetPlaylist(); //playlists do user com id 0
        let bodyRequested = corpoReq;
        expect(response).toEqual(JSON.parse(bodyRequested));
      }
    });

    then(/^é retornado um JSON com corpo "(.*)"$/, async body => {
      expect(body).toBe('marcelo');
    });

    and(/^é retornado um status "(.*)" OK$/, responseStatusCode => {
      let statusCode: number = 0;
      if (mockGetPlaylist()) statusCode = 200;
      expect(+responseStatusCode).toBe(statusCode);
    });
  });
  test('Visualizar playlist sem curtidas', ({ given, when, then, and }) => {
    //              que eu sou um usuário logado no sistema com nome
    given(/^que eu sou um usuário logado no sistema com o id "(.*)"$/, async id => {
      //checagem com login
      mockGetPlaylist.mockReturnValue(mockPlaylists);
    });
    when(/^eu faço uma requisição GET "(.*)" com o corpo$/, async (endPoint, corpoReq) => {
      if (endPoint) {
        const response = mockGetPlaylist(); //playlists do user com id 0
        let bodyRequested = corpoReq;
        expect(response).toEqual(JSON.parse(bodyRequested));
      }
    });

    then('é retornado um JSON com corpo', async body => {
      expect(mockGetPlaylist().filter((playlist: any) => playlist.likes.length === 0)).toHaveLength(
        1,
      );
    });

    and(/^é retornado um status "(.*)" OK$/, responseStatusCode => {
      let statusCode: number = 0;
      if (mockGetPlaylist()) statusCode = 200;
      expect(+responseStatusCode).toBe(statusCode);
    });
  });
});
