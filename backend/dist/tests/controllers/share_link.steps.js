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
const playlist_repository_1 = __importDefault(require("../../src/repositories/playlist.repository"));
const feature = (0, jest_cucumber_1.loadFeature)('tests/features/gerar_link_de_playlist.feature');
jest.mock('../../src/repositories/playlist.repository');
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let mockPlaylists;
    const mockGetPlaylist = jest.fn();
    mockGetPlaylist.mockResolvedValue(true);
    playlist_repository_1.default.prototype.getPlaylists = mockGetPlaylist;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        (mockPlaylists = {
            id: '1',
            name: 'melhores do grime',
            genre: 'grime',
            description: '',
            idUser: 0,
            duration: 25,
        }),
            {
                id: '2',
                name: 'melhores do mpb',
                genre: 'mpb',
                description: '',
                idUser: 0,
                duration: 50,
            },
            {
                id: '3',
                name: 'UK Drill',
                genre: 'drill',
                description: '',
                idUser: 0,
                duration: 120,
            };
    }));
    test('Criar link de compartilhamento de playlists', ({ given, when, then, and }) => {
        given(/^que eu sou o usuário com id "(.*)"$/, (id) => __awaiter(void 0, void 0, void 0, function* () {
            //Checagem de login
            if (id === '0')
                mockGetPlaylist.mockReturnValue(mockPlaylists);
        }));
        and('eu estou na página da playlist', (playlist) => __awaiter(void 0, void 0, void 0, function* () {
            // get mockado
            let obj = JSON.parse(playlist);
            expect(mockGetPlaylist()).toMatchObject(obj);
        }));
        when('eu clicar no ícone de compartilhamento da playlist', url => {
            //url.idUser = 0 e url.id = 1
            let parsed = JSON.parse(url);
            expect(`/api/playlist/${parsed.idUser}/` + parsed.id).toBe('/api/playlist/0/1');
        });
        then(/^a url da playlist melhores do grime será "(.*)"$/, copyUrl => {
            expect(copyUrl).toBe('/api/playlist/0/1');
        });
    });
});
