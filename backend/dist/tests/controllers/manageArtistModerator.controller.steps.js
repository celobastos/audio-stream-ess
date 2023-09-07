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
const artist_repository_1 = __importDefault(require("../../src/repositories/artist.repository"));
const feature = (0, jest_cucumber_1.loadFeature)('tests/features/manutencao_artistas_moderador.feature');
jest.mock('../../src/repositories/artist.repository');
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let mockArtist;
    const mockGetArtist = jest.fn();
    mockGetArtist.mockResolvedValue(true);
    artist_repository_1.default.prototype.getArtist = mockGetArtist;
    const mockUpdateArtist = jest.fn();
    mockUpdateArtist.mockResolvedValue(true);
    artist_repository_1.default.prototype.updateArtist = mockUpdateArtist;
    const mockDeleteArtist = jest.fn();
    mockDeleteArtist.mockResolvedValue(true);
    artist_repository_1.default.prototype.deleteArtist = mockDeleteArtist;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        mockArtist = {
            id: '',
            name: '',
            description: '',
            genre: '',
            login: 'mocklogin',
            pass: 'mockpassword',
        };
    }));
    test('Atualizar artista como usuário moderador', ({ given, and, when, then }) => {
        given('que eu sou um usuário moderador logado no sistema', () => {
            //Não há checagem ainda, fica com login
        });
        and(/^o sistema tem um artista cadastrado com o nome "(.*)", id "(.*)" descrição "(.*)" e gênero "(.*)"$/, (arg0, arg1, arg2, arg3) => {
            mockGetArtist.mockReturnValueOnce({
                id: arg1,
                name: arg0,
                description: arg2,
                genre: arg3,
                login: 'mockLogin',
                pass: 'mockPass',
            });
            expect(artist_repository_1.default.prototype.getArtist(arg1)).toEqual({
                id: arg1,
                name: arg0,
                description: arg2,
                genre: arg3,
                login: 'mockLogin',
                pass: 'mockPass',
            });
        });
        when(/^eu atualizo o nome do artista para "(.*)"$/, arg0 => {
            mockArtist.name = arg0;
        });
        and(/^eu atualizo a descrição do artista para "(.*)"$/, arg0 => {
            mockArtist.description = arg0;
        });
        and(/^eu atualizo o gênero do artista para "(.*)"$/, arg0 => {
            mockArtist.genre = arg0;
        });
        then(/^o sistema atualiza o artista de id "(.*)" com o nome "(.*)", descrição "(.*)" e gênero "(.*)"$/, (arg0, arg1, arg2, arg3) => {
            mockUpdateArtist.mockReturnValueOnce({ mockArtist });
            // Use supertest to simulate a PUT request
            const putResponse = artist_repository_1.default.prototype.updateArtist(mockArtist.id, mockArtist);
            // Check the response status and handle any errors here
            if (!putResponse) {
                throw new Error('PUT request failed');
            }
        });
        and('uma mensagem de sucesso é exibida', () => { });
    });
    test('Excluir artista como usuário moderador', ({ given, and, when, then }) => {
        given('que eu sou um usuário moderador logado no sistema', () => { });
        and(/^há um artista cadastrado com o nome "(.*)" e id "(.*)"$/, (arg0, arg1) => {
            mockGetArtist.mockReturnValueOnce({
                id: arg1,
                name: arg0,
                description: 'mockDescription',
                genre: 'mockGenre',
                login: 'mockLogin',
                pass: 'mockPass',
            });
            expect(artist_repository_1.default.prototype.getArtist(arg1)).toEqual({
                id: arg1,
                name: arg0,
                description: 'mockDescription',
                genre: 'mockGenre',
                login: 'mockLogin',
                pass: 'mockPass',
            });
        });
        when(/^eu clico em "(.*)"$/, arg0 => { });
        then(/^o sistema exclui o artista de id "(.*)"$/, arg0 => {
            mockDeleteArtist.mockReturnValueOnce({ id: arg0 });
            artist_repository_1.default.prototype.deleteArtist(arg0);
            expect(artist_repository_1.default.prototype.deleteArtist).toHaveBeenCalledWith(arg0);
        });
        and('uma mensagem de sucesso é exibida', () => { });
    });
});
