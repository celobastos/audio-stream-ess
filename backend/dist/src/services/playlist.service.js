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
const playlist_model_1 = __importDefault(require("../models/playlist.model"));
const http_error_1 = require("../utils/errors/http.error");
class PlaylistServiceMessageCode {
}
PlaylistServiceMessageCode.playlist_not_found = 'playlist_not_found';
class PlaylistService {
    constructor(playlistRepository) {
        this.playlistRepository = playlistRepository;
    }
    getPlaylists() {
        return __awaiter(this, void 0, void 0, function* () {
            const playlistsEntity = yield this.playlistRepository.getPlaylists();
            const playlistsModel = playlistsEntity.map(test => new playlist_model_1.default(test));
            return playlistsModel;
        });
    }
    getPlaylist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const playlistEntity = yield this.playlistRepository.getPlaylist(id);
            if (!playlistEntity) {
                throw new http_error_1.HttpNotFoundError({
                    msg: 'Playlist not found',
                    msgCode: PlaylistServiceMessageCode.playlist_not_found,
                });
            }
            const playlistModel = new playlist_model_1.default(playlistEntity);
            return playlistModel;
        });
    }
    createPlaylist(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const playlistEntity = yield this.playlistRepository.createPlaylist(data);
            const playlistModel = new playlist_model_1.default(playlistEntity);
            return playlistModel;
        });
    }
    updatePlaylist(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const playlistEntity = yield this.playlistRepository.updatePlaylist(id, data);
            if (!playlistEntity) {
                throw new http_error_1.HttpNotFoundError({
                    msg: 'Playlist not found',
                    msgCode: PlaylistServiceMessageCode.playlist_not_found,
                });
            }
            const playlistModel = new playlist_model_1.default(playlistEntity);
            return playlistModel;
        });
    }
    deletePlaylist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.playlistRepository.deletePlaylist(id);
        });
    }
}
exports.default = PlaylistService;
