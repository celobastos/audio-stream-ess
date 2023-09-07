import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import TestRepository from '../../src/repositories/test.repository';
import { di } from '../../src/di';

const feature = loadFeature('tests/features/cadastro_manutencao_albuns.feature');
const request = supertest(app);

defineFeature(feature, test => {
  // mocking the repository
  let mockTestRepository: TestRepository;
  let response: supertest.Response;

  // Antes de cada test ser rodado, ele reseta o mockRepository
  beforeEach(() => {
    mockTestRepository = di.getRepository<TestRepository>(TestRepository);
  });

  test('Criar álbum como artista logado', ({ given, when, then, and }) => {
    given(/^que eu sou um artista logado no sistema com nome "(.*)"$/, async name => {
      const existingTest = await mockTestRepository.getTest(name);

      if (existingTest) {
        await mockTestRepository.deleteTest(name);
      }
    });

    when(
      /^uma requisição POST for enviada para "(.*)" com o nome "(.*)"$/,
      async (url, testName) => {
        // response = await request.post(url).send({
        //   name: nome
        // });
        response = await request.post(url).send({
          name: testName,
        });
      },
    );

    then(/^o sistema retorna um JSON com o corpo "(.*)"$/, async responseTest => {
      // expect(response.body.data).toEqual(
      expect.objectContaining(responseTest);
      // )
    });

    and(/^é retornado um status "(.*)" como criado com sucesso$/, async responseStatusCode => {
      expect(response.statusCode).toBe(parseInt(responseStatusCode, 10));
    });

    // then(/^é retornado um status "(.*)" como criado com sucesso$/, (statusCode) => {
    //   expect(response.status).toBe(parseInt(statusCode, 10));
    // });

    // and(/^o sistema retorna um JSON com o corpo "(.*)"$/, (testName) => {
    //     expect(response.body.data).toEqual(
    //       expect.objectContaining({
    //         name: testName,
    //       })
    //     );
    //   }
    // );
  });
});
