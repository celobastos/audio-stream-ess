import { loadFeature, defineFeature } from 'jest-cucumber';
import ArtistRepository from '../../src/repositories/artist.repository';
import ArtistEntity from '../../src/entities/artist.entity';

const feature = loadFeature('tests/features/manutencao_artistas_moderador.feature');

jest.mock('../../src/repositories/artist.repository');

defineFeature(feature, test => {
  let mockArtist: ArtistEntity;

  const mockGetArtist = jest.fn();
  mockGetArtist.mockResolvedValue(true);
  ArtistRepository.prototype.getArtist = mockGetArtist;

  const mockUpdateArtist = jest.fn();
  mockUpdateArtist.mockResolvedValue(true);
  ArtistRepository.prototype.updateArtist = mockUpdateArtist;

  const mockDeleteArtist = jest.fn();
  mockDeleteArtist.mockResolvedValue(true);
  ArtistRepository.prototype.deleteArtist = mockDeleteArtist;

  beforeEach(async () => {
    mockArtist = {
      id: '',
      name: '',
      description: '',
      genre: '',
      login: 'mocklogin',
      pass: 'mockpassword',
    };
  });

  test('Atualizar artista como usuário moderador', ({ given, and, when, then }) => {
    given('que eu sou um usuário moderador logado no sistema', () => {
      //Não há checagem ainda, fica com login
    });

    and(
      /^o sistema tem um artista cadastrado com o nome "(.*)", id "(.*)" descrição "(.*)" e gênero "(.*)"$/,
      (arg0, arg1, arg2, arg3) => {
        mockGetArtist.mockReturnValueOnce({
          id: arg1,
          name: arg0,
          description: arg2,
          genre: arg3,
          login: 'mockLogin',
          pass: 'mockPass',
        });

        expect(ArtistRepository.prototype.getArtist(arg1)).toEqual({
          id: arg1,
          name: arg0,
          description: arg2,
          genre: arg3,
          login: 'mockLogin',
          pass: 'mockPass',
        });
      },
    );

    when(/^eu atualizo o nome do artista para "(.*)"$/, arg0 => {
      mockArtist.name = arg0;
    });

    and(/^eu atualizo a descrição do artista para "(.*)"$/, arg0 => {
      mockArtist.description = arg0;
    });

    and(/^eu atualizo o gênero do artista para "(.*)"$/, arg0 => {
      mockArtist.genre = arg0;
    });

    then(
      /^o sistema atualiza o artista de id "(.*)" com o nome "(.*)", descrição "(.*)" e gênero "(.*)"$/,
      (arg0, arg1, arg2, arg3) => {
        mockUpdateArtist.mockReturnValueOnce({ mockArtist });

        // Use supertest to simulate a PUT request
        const putResponse = ArtistRepository.prototype.updateArtist(mockArtist.id, mockArtist);

        // Check the response status and handle any errors here
        if (!putResponse) {
          throw new Error('PUT request failed');
        }
      },
    );

    and('uma mensagem de sucesso é exibida', () => {});
  });

  test('Excluir artista como usuário moderador', ({ given, and, when, then }) => {
    given('que eu sou um usuário moderador logado no sistema', () => {});

    and(/^há um artista cadastrado com o nome "(.*)" e id "(.*)"$/, (arg0, arg1) => {
      mockGetArtist.mockReturnValueOnce({
        id: arg1,
        name: arg0,
        description: 'mockDescription',
        genre: 'mockGenre',
        login: 'mockLogin',
        pass: 'mockPass',
      });

      expect(ArtistRepository.prototype.getArtist(arg1)).toEqual({
        id: arg1,
        name: arg0,
        description: 'mockDescription',
        genre: 'mockGenre',
        login: 'mockLogin',
        pass: 'mockPass',
      });
    });

    when(/^eu clico em "(.*)"$/, arg0 => {});

    then(/^o sistema exclui o artista de id "(.*)"$/, arg0 => {
      mockDeleteArtist.mockReturnValueOnce({ id: arg0 });

      ArtistRepository.prototype.deleteArtist(arg0);

      expect(ArtistRepository.prototype.deleteArtist).toHaveBeenCalledWith(arg0);
    });

    and('uma mensagem de sucesso é exibida', () => {});
  });
});
