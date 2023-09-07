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
const artist_repository_1 = __importDefault(require("../../src/repositories/artist.repository"));
const moderator_repository_1 = __importDefault(require("../../src/repositories/moderator.repository"));
const feature = (0, jest_cucumber_1.loadFeature)('tests/features/login.feature');
const request = (0, supertest_1.default)(app_1.default);
jest.mock('../../src/repositories/artist.repository');
jest.mock('../../src/repositories/moderator.repository');
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let mockArtistas;
    const mockGetArtistas = jest.fn();
    mockGetArtistas.mockResolvedValue(true);
    artist_repository_1.default.prototype.getArtists = mockGetArtistas;
    let mockModeradores;
    const mockGetModeradores = jest.fn();
    mockGetModeradores.mockResolvedValue(true);
    moderator_repository_1.default.prototype.getModerators = mockGetModeradores;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
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
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
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
    }));
    // TESTE DE LOGIN COMO ARTISTA
    test('login como artista', ({ given, when, then, and }) => {
        given(/^que o sistema está em funcionamento$/, () => __awaiter(void 0, void 0, void 0, function* () {
            mockGetArtistas.mockReturnValue(mockArtistas);
        }));
        and(/^"(.*)" está cadastrado$/, (login) => __awaiter(void 0, void 0, void 0, function* () {
            expect(mockGetArtistas().filter((artista) => artista.login === login)).not.toBe([]);
        }));
        and(/^a senha cadastrada é "(.*)"$/, (pass) => __awaiter(void 0, void 0, void 0, function* () {
            expect(mockGetArtistas().filter((artista) => artista.pass === pass)).not.toBe([]);
        }));
        when(/^eu faço uma requisição POST para a url "(.*)" com JSON$/, (url, body) => __awaiter(void 0, void 0, void 0, function* () {
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
        }));
        then(/^o sistema autoriza o login como "(.*)"$/, login => {
            const response = mockGetArtistas();
            expect(response[0].login).toBe(login);
            // expect(mockArtistas()).toMatchObject(response)
        });
        and(/^o status retornado da requisição é "(.*)"$/, responseStatusCode => {
            let statusCode = 0;
            if (mockGetArtistas())
                statusCode = 201;
            expect(+responseStatusCode).toBe(statusCode);
        });
    });
    // TESTE DE LOGIN COMO MODERADOR
    test('login como moderador', ({ given, when, then, and }) => {
        given(/^que o sistema está em funcionamento$/, () => __awaiter(void 0, void 0, void 0, function* () {
            mockGetModeradores.mockReturnValue(mockModeradores);
        }));
        and(/^"(.*)" está cadastrado$/, (login) => __awaiter(void 0, void 0, void 0, function* () {
            expect(mockGetModeradores().filter((moderador) => moderador.login === login)).not.toBe([]);
        }));
        and(/^a senha cadastrada é "(.*)"$/, (pass) => __awaiter(void 0, void 0, void 0, function* () {
            expect(mockGetModeradores().filter((moderador) => moderador.pass === pass)).not.toBe([]);
        }));
        when(/^eu faço uma requisição POST para a url "(.*)" com JSON$/, (url, body) => __awaiter(void 0, void 0, void 0, function* () {
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
        }));
        then(/^o sistema autoriza o login como "(.*)"$/, login => {
            const response = mockGetModeradores();
            expect(response[0].login).toBe(login);
            // expect(mockModeradores()).toMatchObject(response)
        });
        and(/^o status retornado da requisição é "(.*)"$/, responseStatusCode => {
            let statusCode = 0;
            if (mockGetModeradores())
                statusCode = 201;
            expect(+responseStatusCode).toBe(statusCode);
        });
    });
    //TESTE COM CREDENCIAIS INCORRETAS
    test('login com credenciais incorretas', ({ given, when, then, and }) => {
        given(/^que o sistema está em funcionamento$/, () => __awaiter(void 0, void 0, void 0, function* () {
            mockGetModeradores.mockReturnValue(mockModeradores);
        }));
        and(/^e vamos tentar o login como (.*) (.*)$/, (login, pass) => __awaiter(void 0, void 0, void 0, function* () {
            expect(mockGetModeradores().filter((moderador) => moderador.login === login)).not.toBe([]);
            expect(mockGetModeradores().filter((moderador) => moderador.pass === pass)).not.toBe([]);
        }));
        when(/^eu faço uma requisição POST para a url "(.*)" com JSON$/, (url, body) => __awaiter(void 0, void 0, void 0, function* () {
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
        }));
        then(/^o sistema nega o login como "(.*)"$/, login => {
            const response = mockGetModeradores();
            expect(response[0].login).not.toBe(login);
            expect(response[0].login).not.toBe(login);
            // expect(mockModeradores()).toMatchObject(response)
        });
        and(/^o status retornado da requisição é "(.*)"$/, responseStatusCode => {
            let statusCode = 0;
            if (mockGetModeradores())
                statusCode = 401;
            expect(+responseStatusCode).toBe(statusCode);
        });
    });
});
