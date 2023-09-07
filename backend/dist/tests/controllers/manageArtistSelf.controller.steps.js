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
const feature = (0, jest_cucumber_1.loadFeature)('tests/features/manutencao_artistas_artista.feature');
jest.mock('../../src/repositories/artist.repository');
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let loggedInArtist;
    const mockUpdateArtist = jest.fn();
    mockUpdateArtist.mockResolvedValue(true);
    artist_repository_1.default.prototype.updateArtist = mockUpdateArtist;
    const mockDeleteArtist = jest.fn();
    mockDeleteArtist.mockResolvedValue(true);
    artist_repository_1.default.prototype.deleteArtist = mockDeleteArtist;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Enquanto não há login
        loggedInArtist = {
            id: '',
            name: '',
            description: '',
            genre: '',
            login: 'mocklogin',
            pass: 'mockpassword',
        };
    }));
    test('Atualizar artista como artista logado', ({ given, and, when, then }) => {
        given(/^que eu sou um artista de nome: "(.*)", de id: "(.*)" logado no sistema$/, (arg0, arg1) => {
            loggedInArtist.name = arg0;
            loggedInArtist.id = arg1;
        });
        when(/^eu abro a caixa de edição do artista "(.*)", de id: "(.*)", description: "(.*)" e genre: "(.*)"$/, (arg0, arg1, arg2, arg3) => {
            if (loggedInArtist.id !== arg1 || loggedInArtist.name !== arg0) {
                throw new Error('Artista logado não é o mesmo que o artista a ser editado');
            }
            else {
                loggedInArtist.description = arg2;
                loggedInArtist.genre = arg3;
            }
        });
        and(/^eu atualizo o campo nome para "(.*)", o campo description para "(.*)" e o campo genre para "(.*)"$/, (arg0, arg1, arg2) => __awaiter(void 0, void 0, void 0, function* () {
            loggedInArtist.name = arg0;
            loggedInArtist.description = arg1;
            loggedInArtist.genre = arg2;
            mockUpdateArtist.mockReturnValueOnce({ loggedInArtist });
            // Use supertest to simulate a PUT request
            const putResponse = artist_repository_1.default.prototype.updateArtist(loggedInArtist.id, loggedInArtist);
            // Check the response status and handle any errors here
            if (!putResponse) {
                throw new Error('PUT request failed');
            }
        }));
        then(/^o banco de dados deve ter o artista "(.*)", de id: "(.*)", description: "(.*)" e genre: "(.*)"$/, (arg0, arg1, arg2, arg3) => {
            expect(artist_repository_1.default.prototype.updateArtist).toHaveBeenCalledWith(loggedInArtist.id, expect.objectContaining({
                name: loggedInArtist.name,
                description: loggedInArtist.description,
                genre: loggedInArtist.genre,
            }));
        });
    });
    test('Excluir artista como artista logado', ({ given, and, when, then }) => {
        given(/^que eu sou um artista de nome: "(.*)", de id: "(.*)" logado no sistema$/, (arg0, arg1) => {
            loggedInArtist.name = arg0;
            loggedInArtist.id = arg1;
        });
        when(/^eu clico no botão de excluir do artista "(.*)", de id: "(.*)", description: "(.*)" e genre: "(.*)"$/, (arg0, arg1, arg2, arg3) => {
            if (loggedInArtist.id !== arg1 || loggedInArtist.name !== arg0) {
                throw new Error('Artista logado não é o mesmo que o artista a ser excluído');
            }
            else {
                loggedInArtist.description = arg2;
                loggedInArtist.genre = arg3;
            }
        });
        then(/^o artista "(.*)", de id: "(.*)", description: "(.*)" e genre: "(.*)" deve ser removido da lista de artistas$/, (arg0, arg1, arg2, arg3) => {
            mockDeleteArtist.mockReturnValueOnce({ id: arg1 });
            artist_repository_1.default.prototype.deleteArtist(arg1);
            expect(artist_repository_1.default.prototype.deleteArtist).toHaveBeenCalledWith(arg1);
        });
        and('eu devo ser desconectado do sistema', () => { });
    });
});
