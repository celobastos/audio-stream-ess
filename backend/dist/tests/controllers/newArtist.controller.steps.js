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
const di_1 = require("../../src/di");
const artist_repository_1 = __importDefault(require("../../src/repositories/artist.repository"));
const feature = (0, jest_cucumber_1.loadFeature)('tests/features/cadastro_manutencao_artista.feature');
const request = (0, supertest_1.default)(app_1.default);
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let reqMock;
    let mockArtistRepository;
    let response;
    beforeEach(() => {
        mockArtistRepository = di_1.di.getRepository(artist_repository_1.default);
    });
    test('Cadastrar artista', ({ given, when, and, then }) => {
        given(/^que eu sou um artista de nome "(.*)" não presente no sistema$/, arg0 => { });
        when(/^eu preencho meus dados de name, genre, description, login e pass com os valores respectivos "(.*)", "(.*)", "(.*)", "(.*)", "(.*)"$/, (arg5, arg6, arg7, arg8, arg9) => {
            reqMock = {
                name: arg5,
                genre: arg6,
                description: arg7,
                login: arg8,
                pass: arg9,
            };
        });
        and(/^uma requisição POST for enviada para "(.*)"$/, (url) => __awaiter(void 0, void 0, void 0, function* () {
            response = yield request.post(url).send(reqMock);
        }));
        then(/^o status da resposta deve ser "(.*)"$/, statusCode => {
            expect(response.status).toBe(parseInt(statusCode, 10));
        });
        and(/^O JSON da resposta contem um artista com os valores de name, genre, description, login e pass iguais a "(.*)", "(.*)", "(.*)", "(.*)", "(.*)", respectivamente$/, (arg5, arg6, arg7, arg8, arg9) => {
            expect(response.body.data).toEqual(expect.objectContaining({
                name: arg5,
                genre: arg6,
                description: arg7,
                login: arg8,
                pass: arg9,
            }));
        });
    });
});
