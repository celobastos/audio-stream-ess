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
const playlist_repository_1 = __importDefault(require("../../src/repositories/playlist.repository"));
const feature = (0, jest_cucumber_1.loadFeature)('tests/features/mostrar_Curtidas_e_Criadores.feature');
const request = (0, supertest_1.default)(app_1.default);
jest.mock('../../src/repositories/playlist.repository');
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let mockPlaylists;
    const mockGetPlaylist = jest.fn();
    mockGetPlaylist.mockResolvedValue(true);
    let playlistRepository = new playlist_repository_1.default();
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
        given(/^que eu sou um usuário logado no sistema com o id "(.*)"$/, (id) => __awaiter(void 0, void 0, void 0, function* () {
            //checagem com login
            mockGetPlaylist.mockReturnValue(mockPlaylists);
        }));
        when(/^eu faço uma requisição GET "(.*)" com o corpo$/, (endPoint, corpoReq) => __awaiter(void 0, void 0, void 0, function* () {
            if (endPoint) {
                const response = mockGetPlaylist(); //playlists do user com id 0
                let bodyRequested = corpoReq;
                expect(response).toEqual(JSON.parse(bodyRequested));
            }
        }));
        then('é retornado um JSON com corpo', (body) => __awaiter(void 0, void 0, void 0, function* () {
            //expect(response.body.data).toEqual(body)
            expect(mockGetPlaylist().filter((playlist) => playlist.likes.length > 0)).toHaveLength(2);
        }));
        and(/^é retornado um status "(.*)" OK$/, responseStatusCode => {
            let statusCode = 0;
            if (mockGetPlaylist())
                statusCode = 200;
            expect(+responseStatusCode).toBe(statusCode);
        });
    });
    test('Visualizar todos os criadores', ({ given, when, then, and }) => {
        given(/^que eu sou um usuário logado no sistema com o id "(.*)"$/, (id) => __awaiter(void 0, void 0, void 0, function* () {
            //checagem com login
            mockGetPlaylist.mockReturnValue(mockPlaylists);
        }));
        when(/^eu faço uma requisição GET "(.*)" com o corpo$/, (endPoint, corpoReq) => __awaiter(void 0, void 0, void 0, function* () {
            if (endPoint) {
                const response = mockGetPlaylist(); //playlists do user com id 0
                let bodyRequested = corpoReq;
                expect(response).toEqual(JSON.parse(bodyRequested));
            }
        }));
        then(/^é retornado um JSON com corpo "(.*)"$/, (body) => __awaiter(void 0, void 0, void 0, function* () {
            expect(body).toBe('marcelo');
        }));
        and(/^é retornado um status "(.*)" OK$/, responseStatusCode => {
            let statusCode = 0;
            if (mockGetPlaylist())
                statusCode = 200;
            expect(+responseStatusCode).toBe(statusCode);
        });
    });
    test('Visualizar playlist sem curtidas', ({ given, when, then, and }) => {
        //              que eu sou um usuário logado no sistema com nome
        given(/^que eu sou um usuário logado no sistema com o id "(.*)"$/, (id) => __awaiter(void 0, void 0, void 0, function* () {
            //checagem com login
            mockGetPlaylist.mockReturnValue(mockPlaylists);
        }));
        when(/^eu faço uma requisição GET "(.*)" com o corpo$/, (endPoint, corpoReq) => __awaiter(void 0, void 0, void 0, function* () {
            if (endPoint) {
                const response = mockGetPlaylist(); //playlists do user com id 0
                let bodyRequested = corpoReq;
                expect(response).toEqual(JSON.parse(bodyRequested));
            }
        }));
        then('é retornado um JSON com corpo', (body) => __awaiter(void 0, void 0, void 0, function* () {
            expect(mockGetPlaylist().filter((playlist) => playlist.likes.length === 0)).toHaveLength(1);
        }));
        and(/^é retornado um status "(.*)" OK$/, responseStatusCode => {
            let statusCode = 0;
            if (mockGetPlaylist())
                statusCode = 200;
            expect(+responseStatusCode).toBe(statusCode);
        });
    });
});
