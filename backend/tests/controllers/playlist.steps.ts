import { loadFeature, defineFeature } from 'jest-cucumber';
import PlaylistEntity from '../../src/entities/playlist.entity';
import PlaylistRepository from '../../src/repositories/playlist.repository';

const feature = loadFeature('tests/features/criar_categorias_playlists.feature');

jest.mock('../../src/repositories/playlist.repository');

defineFeature(feature, test => {
  let mockPlaylists: PlaylistEntity[];

  const mockGetPlaylist = jest.fn();
  mockGetPlaylist.mockResolvedValue(true);
  PlaylistRepository.prototype.getPlaylists = mockGetPlaylist;

  beforeEach(async () => {
    mockPlaylists = [
      {
        id: '1',
        name: 'melhores do grime',
        genre: 'grime',
        description: '',
        idUser: 0,
        duration: 25,
      },
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
      },
    ];
  });

  test('Playlist sem categoria', ({ given, when, then, and }) => {
    given(/^que eu sou um usuário logado no sistema com o id "(.*)"$/, async id => {
      //Checagem com login
      if (id === '0') mockGetPlaylist.mockReturnValue(mockPlaylists);
    });

    when(/^uma requisição GET for enviada para "(.*)"$/, async url => {
      if (url) {
        const response = mockGetPlaylist(); //playlists do user com id 0
        expect(response).toEqual([
          {
            id: '1',
            name: 'melhores do grime',
            genre: 'grime',
            description: '',
            idUser: 0,
            duration: 25,
          },
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
          },
        ]);
      }
    });

    then('o sistema retorna um JSON com o corpo', responseTest => {
      let response = JSON.parse(responseTest);
      expect(mockGetPlaylist()).toMatchObject(response);
    });

    and(/^é retornado um status "(.*)" OK$/, responseStatusCode => {
      let statusCode: number = 0;
      if (mockGetPlaylist()) statusCode = 200;
      expect(+responseStatusCode).toBe(statusCode);
    });
  });

  test('Playlists por gênero', ({ given, when, then, and }) => {
    given(/^que eu sou um usuário logado no sistema com o id "(.*)"$/, async id => {
      //Checagem com login
      mockGetPlaylist.mockReturnValue(mockPlaylists);
    });

    when(/^uma requisição GET for enviada para "(.*)"$/, async url => {
      const filter = url.split('?')[1].split('=');
      expect(filter[1]).toBe('mpb');
    });

    then('o sistema retorna um JSON com o corpo', responseTest => {
      let playlists = mockGetPlaylist();
      playlists = playlists.filter((playlist: PlaylistEntity) => playlist.genre === 'mpb');
      let response = JSON.parse(responseTest);
      expect(playlists).toMatchObject(response);
    });

    and(/^é retornado um status "(.*)" OK$/, responseStatusCode => {
      let statusCode: number = 0;
      if (mockGetPlaylist()) statusCode = 200;
      expect(+responseStatusCode).toBe(statusCode);
    });
  });

  test('Playlists por duração', ({ given, when, then, and }) => {
    given(/^que eu sou um usuário logado no sistema com o id "(.*)"$/, async id => {
      //Checagem com login
      mockGetPlaylist.mockReturnValue(mockPlaylists);
    });

    when(/^uma requisição GET for enviada para "(.*)"$/, async url => {
      const filter = url.split('?')[1].split('=');
      expect(filter[0]).toBe('duration');
      expect(filter[1]).toBe('30');
    });

    then('o sistema retorna um JSON com o corpo', responseTest => {
      let playlists = mockGetPlaylist();
      playlists = playlists.filter((playlist: PlaylistEntity) => playlist.duration! < 30);
      let response = JSON.parse(responseTest);
      expect(playlists).toMatchObject(response);
    });

    and(/^é retornado um status "(.*)" OK$/, responseStatusCode => {
      let statusCode: number = 0;
      if (mockGetPlaylist()) statusCode = 200;
      expect(+responseStatusCode).toBe(statusCode);
    });
  });

  test('Playlists por gênero e duração', ({ given, when, then, and }) => {
    given(/^que eu sou um usuário logado no sistema com o id "(.*)"$/, async id => {
      //Checagem com login
      mockGetPlaylist.mockReturnValue(mockPlaylists);
    });

    when(/^uma requisição GET for enviada para "(.*)"$/, async url => {
      const filter = url.split('?');
      const genreFilter = filter[1].split('='); //genre=drill
      const durationFilter = parseInt(filter[2].split('=')[1], 10); //duration=120
      expect(genreFilter[1]).toBe('drill');
      expect(durationFilter).toBe(120);
    });

    then('o sistema retorna um JSON com o corpo', responseTest => {
      let playlists = mockGetPlaylist();
      playlists = playlists.filter(
        (playlist: PlaylistEntity) => playlist.duration! <= 120 && playlist.genre === 'drill',
      );
      let response = JSON.parse(responseTest);
      expect(playlists).toMatchObject(response);
    });

    and(/^é retornado um status "(.*)" OK$/, responseStatusCode => {
      let statusCode: number = 0;
      if (mockGetPlaylist()) statusCode = 200;
      expect(+responseStatusCode).toBe(statusCode);
    });
  });

  test('Usuário sem playlist', ({ given, when, then, and }) => {
    given(/^que eu sou um usuário logado no sistema com o id "(.*)"$/, async id => {
      //Checagem com login
      if (id === '1') mockGetPlaylist.mockReturnValue([]);
    });

    when(/^uma requisição GET for enviada para "(.*)"$/, async url => {
      if (url) {
        const response = mockGetPlaylist();
        expect(response).toEqual([]);
      }
    });

    then('o sistema retorna um JSON com o corpo', responseTest => {
      let playlists = mockGetPlaylist();
      let response = JSON.parse(responseTest);
      expect(playlists).toMatchObject(response);
    });

    and(/^é retornado um status "(.*)" OK$/, responseStatusCode => {
      let statusCode: number = 0;
      if (mockGetPlaylist()) statusCode = 200;
      expect(+responseStatusCode).toBe(statusCode);
    });
  });
});
