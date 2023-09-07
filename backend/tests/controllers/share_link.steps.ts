import { defineFeature, loadFeature } from 'jest-cucumber';
import PlaylistEntity from '../../src/entities/playlist.entity';
import PlaylistRepository from '../../src/repositories/playlist.repository';

const feature = loadFeature('tests/features/gerar_link_de_playlist.feature');

jest.mock('../../src/repositories/playlist.repository');

defineFeature(feature, test => {
  let mockPlaylists: PlaylistEntity;

  const mockGetPlaylist = jest.fn();
  mockGetPlaylist.mockResolvedValue(true);
  PlaylistRepository.prototype.getPlaylists = mockGetPlaylist;

  beforeEach(async () => {
    (mockPlaylists = {
      id: '1',
      name: 'melhores do grime',
      genre: 'grime',
      description: '',
      idUser: 0,
      duration: 25,
    }),
      {
        id: '2',
        name: 'melhores do mpb',
        genre: 'mpb',
        description: '',
        idUser: 0,
        duration: 50,
      },
      {
        id: '3',
        name: 'UK Drill',
        genre: 'drill',
        description: '',
        idUser: 0,
        duration: 120,
      };
  });

  test('Criar link de compartilhamento de playlists', ({ given, when, then, and }) => {
    given(/^que eu sou o usuário com id "(.*)"$/, async id => {
      //Checagem de login
      if (id === '0') mockGetPlaylist.mockReturnValue(mockPlaylists);
    });

    and('eu estou na página da playlist', async playlist => {
      // get mockado
      let obj = JSON.parse(playlist);
      expect(mockGetPlaylist()).toMatchObject(obj);
    });

    when('eu clicar no ícone de compartilhamento da playlist', url => {
      //url.idUser = 0 e url.id = 1
      let parsed = JSON.parse(url);
      expect(`/api/playlist/${parsed.idUser}/` + parsed.id).toBe('/api/playlist/0/1');
    });

    then(/^a url da playlist melhores do grime será "(.*)"$/, copyUrl => {
      expect(copyUrl).toBe('/api/playlist/0/1');
    });
  });
});
