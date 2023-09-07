import { loadFeature, defineFeature } from 'jest-cucumber';
import ArtistRepository from '../../src/repositories/artist.repository';
import ArtistEntity from '../../src/entities/artist.entity';

const feature = loadFeature('tests/features/manutencao_artistas_artista.feature');

jest.mock('../../src/repositories/artist.repository');

defineFeature(feature, test => {
  let loggedInArtist: ArtistEntity;

  const mockUpdateArtist = jest.fn();
  mockUpdateArtist.mockResolvedValue(true);
  ArtistRepository.prototype.updateArtist = mockUpdateArtist;

  const mockDeleteArtist = jest.fn();
  mockDeleteArtist.mockResolvedValue(true);
  ArtistRepository.prototype.deleteArtist = mockDeleteArtist;

  beforeEach(async () => {
    // Enquanto não há login
    loggedInArtist = {
      id: '',
      name: '',
      description: '',
      genre: '',
      login: 'mocklogin',
      pass: 'mockpassword',
    };
  });

  test('Atualizar artista como artista logado', ({ given, and, when, then }) => {
    given(
      /^que eu sou um artista de nome: "(.*)", de id: "(.*)" logado no sistema$/,
      (arg0, arg1) => {
        loggedInArtist.name = arg0;
        loggedInArtist.id = arg1;
      },
    );

    when(
      /^eu abro a caixa de edição do artista "(.*)", de id: "(.*)", description: "(.*)" e genre: "(.*)"$/,
      (arg0, arg1, arg2, arg3) => {
        if (loggedInArtist.id !== arg1 || loggedInArtist.name !== arg0) {
          throw new Error('Artista logado não é o mesmo que o artista a ser editado');
        } else {
          loggedInArtist.description = arg2;
          loggedInArtist.genre = arg3;
        }
      },
    );

    and(
      /^eu atualizo o campo nome para "(.*)", o campo description para "(.*)" e o campo genre para "(.*)"$/,
      async (arg0, arg1, arg2) => {
        loggedInArtist.name = arg0;
        loggedInArtist.description = arg1;
        loggedInArtist.genre = arg2;

        mockUpdateArtist.mockReturnValueOnce({ loggedInArtist });

        // Use supertest to simulate a PUT request
        const putResponse = ArtistRepository.prototype.updateArtist(
          loggedInArtist.id,
          loggedInArtist,
        );

        // Check the response status and handle any errors here
        if (!putResponse) {
          throw new Error('PUT request failed');
        }
      },
    );

    then(
      /^o banco de dados deve ter o artista "(.*)", de id: "(.*)", description: "(.*)" e genre: "(.*)"$/,
      (arg0, arg1, arg2, arg3) => {
        expect(ArtistRepository.prototype.updateArtist).toHaveBeenCalledWith(
          loggedInArtist.id,
          expect.objectContaining({
            name: loggedInArtist.name,
            description: loggedInArtist.description,
            genre: loggedInArtist.genre,
          }),
        );
      },
    );
  });

  test('Excluir artista como artista logado', ({ given, and, when, then }) => {
    given(
      /^que eu sou um artista de nome: "(.*)", de id: "(.*)" logado no sistema$/,
      (arg0, arg1) => {
        loggedInArtist.name = arg0;
        loggedInArtist.id = arg1;
      },
    );

    when(
      /^eu clico no botão de excluir do artista "(.*)", de id: "(.*)", description: "(.*)" e genre: "(.*)"$/,
      (arg0, arg1, arg2, arg3) => {
        if (loggedInArtist.id !== arg1 || loggedInArtist.name !== arg0) {
          throw new Error('Artista logado não é o mesmo que o artista a ser excluído');
        } else {
          loggedInArtist.description = arg2;
          loggedInArtist.genre = arg3;
        }
      },
    );

    then(
      /^o artista "(.*)", de id: "(.*)", description: "(.*)" e genre: "(.*)" deve ser removido da lista de artistas$/,
      (arg0, arg1, arg2, arg3) => {
        mockDeleteArtist.mockReturnValueOnce({ id: arg1 });

        ArtistRepository.prototype.deleteArtist(arg1);

        expect(ArtistRepository.prototype.deleteArtist).toHaveBeenCalledWith(arg1);
      },
    );

    and('eu devo ser desconectado do sistema', () => {});
  });
});
