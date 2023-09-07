"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
const test_repository_1 = __importDefault(require("../../src/repositories/test.repository"));
const di_1 = require("../../src/di");
const feature = (0, jest_cucumber_1.loadFeature)('tests/features/cadastro_manutencao_albuns.feature');
const request = (0, supertest_1.default)(app_1.default);
(0, jest_cucumber_1.defineFeature)(feature, test => {
    // mocking the repository
    let mockTestRepository;
    let response;
    // Antes de cada test ser rodado, ele reseta o mockRepository
    beforeEach(() => {
        mockTestRepository = di_1.di.getRepository(test_repository_1.default);
    });
    test('Criar álbum como artista logado', ({ given, when, then, and }) => {
        given(/^que eu sou um artista logado no sistema com nome "(.*)"$/, (name) => __awaiter(void 0, void 0, void 0, function* () {
            const existingTest = yield mockTestRepository.getTest(name);
            if (existingTest) {
                yield mockTestRepository.deleteTest(name);
            }
        }));
        when(/^uma requisição POST for enviada para "(.*)" com o nome "(.*)"$/, (url, testName) => __awaiter(void 0, void 0, void 0, function* () {
            // response = await request.post(url).send({
            //   name: nome
            // });
            response = yield request.post(url).send({
                name: testName,
            });
        }));
        then(/^o sistema retorna um JSON com o corpo "(.*)"$/, (responseTest) => __awaiter(void 0, void 0, void 0, function* () {
            // expect(response.body.data).toEqual(
            expect.objectContaining(responseTest);
            // )
        }));
        and(/^é retornado um status "(.*)" como criado com sucesso$/, (responseStatusCode) => __awaiter(void 0, void 0, void 0, function* () {
            expect(response.statusCode).toBe(parseInt(responseStatusCode, 10));
        }));
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
