import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import PlaylistRepository from '../../src/repositories/playlist.repository';
import { di } from '../../src/di';
import PlaylistEntity from '../../src/entities/playlist.entity';

const feature = loadFeature('tests/features/cadastro_manutencao_playlists.feature');
jest.mock('../../src/repositories/playlist.repository');

const request = supertest(app);

defineFeature(feature, test => {
  let mockPlaylists: PlaylistEntity;

  const mockGetPlaylist = jest.fn();
  mockGetPlaylist.mockResolvedValue(true);
  PlaylistRepository.prototype.getPlaylist = mockGetPlaylist;

  const mockUpdatePlaylist = jest.fn();
  mockUpdatePlaylist.mockResolvedValue(true);
  PlaylistRepository.prototype.updatePlaylist = mockUpdatePlaylist;
  // mocking the repository
  let mockPlaylistRepository: PlaylistRepository;
  let response: supertest.Response;

  // Antes de cada test ser rodado, ele reseta o mockRepository
  beforeEach(async () => {
    mockPlaylists = {
      id: '1',
      name: 'melhores do grime',
      genre: 'grime',
      description: '',
      idUser: 0,
      duration: 28,
      qtdMusicas: 3,
      id_musica: [1, 2, 3],
    };
  });

  test('Adicionar música a uma playlist como usuário logado', ({ given, and, when, then }) => {
    given(/^que eu sou um usuário logado no sistema com o id (.*)$/, id => {
      if (id === '1') {
        mockGetPlaylist.mockReturnValue(mockPlaylists);
      }
    });

    and(
      /^o sistema tem uma playlist com o id "(.*)", duracao "(.*)", músicas "(.*)" e quantidade de músicas "(.*)"$/,
      (arg0, arg1, arg2, arg3) => {
        mockGetPlaylist.mockReturnValueOnce({
          id: arg1,
          name: 'melhores do grime',
          genre: 'grime',
          description: '',
          idUser: 0,
          duration: arg0,
          qtdMusicas: arg3,
          id_musica: arg2,
        });

        expect(PlaylistRepository.prototype.getPlaylist(arg1)).toEqual({
          id: arg1,
          name: 'melhores do grime',
          genre: 'grime',
          description: '',
          idUser: 0,
          duration: arg0,
          qtdMusicas: arg3,
          id_musica: arg2,
        });
      },
    );

    when(/^eu atualizo a duração para "(.*)"$/, arg0 => {
      mockPlaylists.duration = arg0;
    });

    and(/^eu atualizo a lista de músicas para para "(.*)"$/, arg0 => {
      mockPlaylists.id_musica = arg0;
    });

    and(/^eu atualizo a quantidade de músicas para "(.*)"$/, arg0 => {
      mockPlaylists.qtdMusicas = arg0;
    });

    then('o sistema retorna um JSON com o corpo', responseTest => {
      let response = JSON.parse(responseTest);
      expect(response).toMatchObject(mockPlaylists);
    });

    and(/^é retornado um status "(.*)" como adicionado com sucesso$/, responseStatusCode => {
      let statusCode: number = 0;
      if (mockGetPlaylist()) statusCode = 200;
      expect(+responseStatusCode).toBe(statusCode);
    });
  });

  test('Excluir música da playlist como usuário logado', ({ given, and, when, then }) => {
    given(/^que eu sou um usuário logado no sistema com o id (.*)$/, id => {
      if (id === '1') {
        mockGetPlaylist.mockReturnValue(mockPlaylists);
      }
    });

    and(
      /^o sistema tem uma playlist com o id "(.*)", duracao "(.*)", músicas "(.*)" e quantidade de músicas "(.*)"$/,
      (arg0, arg1, arg2, arg3) => {
        mockGetPlaylist.mockReturnValueOnce({
          id: arg1,
          name: 'melhores do grime',
          genre: 'grime',
          description: '',
          idUser: 0,
          duration: arg0,
          qtdMusicas: arg3,
          id_musica: arg2,
        });

        expect(PlaylistRepository.prototype.getPlaylist(arg1)).toEqual({
          id: arg1,
          name: 'melhores do grime',
          genre: 'grime',
          description: '',
          idUser: 0,
          duration: arg0,
          qtdMusicas: arg3,
          id_musica: arg2,
        });
      },
    );

    when(
      /^eu desejo remover a música de id "(.*)", eu atualizo a duração para "(.*)"$/,
      (arg0, arg1) => {
        mockPlaylists.duration = arg1;
      },
    );

    and(/^eu atualizo a lista de músicas para para "(.*)"$/, arg0 => {
      mockPlaylists.id_musica = arg0;
    });

    and(/^eu atualizo a quantidade de músicas para "(.*)"$/, arg0 => {
      mockPlaylists.qtdMusicas = arg0;
    });

    then('o sistema retorna um JSON com o corpo', responseTest => {
      let response = JSON.parse(responseTest);
      expect(response).toMatchObject(mockPlaylists);
    });

    and(/^é retornado um status "(.*)" como adicionado com sucesso$/, responseStatusCode => {
      let statusCode: number = 0;
      if (mockGetPlaylist()) statusCode = 200;
      expect(+responseStatusCode).toBe(statusCode);
    });
  });
});
