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
const feature = (0, jest_cucumber_1.loadFeature)('tests/features/cadastro_manutencao_playlists.feature');
jest.mock('../../src/repositories/playlist.repository');
const request = (0, supertest_1.default)(app_1.default);
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let mockPlaylists;
    const mockGetPlaylist = jest.fn();
    mockGetPlaylist.mockResolvedValue(true);
    playlist_repository_1.default.prototype.getPlaylist = mockGetPlaylist;
    const mockUpdatePlaylist = jest.fn();
    mockUpdatePlaylist.mockResolvedValue(true);
    playlist_repository_1.default.prototype.updatePlaylist = mockUpdatePlaylist;
    // mocking the repository
    let mockPlaylistRepository;
    let response;
    // Antes de cada test ser rodado, ele reseta o mockRepository
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
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
    }));
    test('Adicionar música a uma playlist como usuário logado', ({ given, and, when, then }) => {
        given(/^que eu sou um usuário logado no sistema com o id (.*)$/, id => {
            if (id === '1') {
                mockGetPlaylist.mockReturnValue(mockPlaylists);
            }
        });
        and(/^o sistema tem uma playlist com o id "(.*)", duracao "(.*)", músicas "(.*)" e quantidade de músicas "(.*)"$/, (arg0, arg1, arg2, arg3) => {
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
            expect(playlist_repository_1.default.prototype.getPlaylist(arg1)).toEqual({
                id: arg1,
                name: 'melhores do grime',
                genre: 'grime',
                description: '',
                idUser: 0,
                duration: arg0,
                qtdMusicas: arg3,
                id_musica: arg2,
            });
        });
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
            let statusCode = 0;
            if (mockGetPlaylist())
                statusCode = 200;
            expect(+responseStatusCode).toBe(statusCode);
        });
    });
    test('Excluir música da playlist como usuário logado', ({ given, and, when, then }) => {
        given(/^que eu sou um usuário logado no sistema com o id (.*)$/, id => {
            if (id === '1') {
                mockGetPlaylist.mockReturnValue(mockPlaylists);
            }
        });
        and(/^o sistema tem uma playlist com o id "(.*)", duracao "(.*)", músicas "(.*)" e quantidade de músicas "(.*)"$/, (arg0, arg1, arg2, arg3) => {
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
            expect(playlist_repository_1.default.prototype.getPlaylist(arg1)).toEqual({
                id: arg1,
                name: 'melhores do grime',
                genre: 'grime',
                description: '',
                idUser: 0,
                duration: arg0,
                qtdMusicas: arg3,
                id_musica: arg2,
            });
        });
        when(/^eu desejo remover a música de id "(.*)", eu atualizo a duração para "(.*)"$/, (arg0, arg1) => {
            mockPlaylists.duration = arg1;
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
            let statusCode = 0;
            if (mockGetPlaylist())
                statusCode = 200;
            expect(+responseStatusCode).toBe(statusCode);
        });
    });
});
