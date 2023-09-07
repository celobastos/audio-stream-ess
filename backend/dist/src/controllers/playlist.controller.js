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
const result_1 = require("../utils/result");
const playlist_entity_1 = __importDefault(require("../entities/playlist.entity"));
const playlist_repository_1 = __importDefault(require("../repositories/playlist.repository"));
const playlist_model_1 = __importDefault(require("../models/playlist.model"));
class PlaylistController {
    constructor(router, playlistService) {
        this.prefix = '/playlist';
        this.router = router;
        this.playlistService = playlistService;
        this.initRoutes();
    }
    initRoutes() {
        this.router.get(this.prefix, (req, res) => this.getPlaylists(req, res));
        this.router.get(`${this.prefix}/:id`, (req, res) => this.getPlaylist(req, res));
        this.router.post(this.prefix, (req, res) => this.createPlaylist(req, res));
        this.router.put(`${this.prefix}/:id`, (req, res) => this.updatePlaylist(req, res));
        this.router.delete(`${this.prefix}/:id`, (req, res) => this.deletePlaylist(req, res));
        this.router.put(`${this.prefix}/:id/adicionar`, (req, res) => this.updatePlaylist(req, res));
        this.router.put(`${this.prefix}/:id/remover/:string`, (req, res) => this.updatePlaylist(req, res));
    }
    getPlaylists(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tests = yield this.playlistService.getPlaylists();
            return new result_1.SuccessResult({
                msg: result_1.Result.transformRequestOnMsg(req),
                data: tests,
            }).handle(res);
        });
    }
    getPlaylist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const test = yield this.playlistService.getPlaylist(req.params.id);
            return new result_1.SuccessResult({
                msg: result_1.Result.transformRequestOnMsg(req),
                data: test,
            }).handle(res);
        });
    }
    createPlaylist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const playlist = new playlist_entity_1.default(req.body);
            const playlistRepository = new playlist_repository_1.default();
            const playlistEntity = yield playlistRepository.createPlaylist(playlist);
            const playlistModel = new playlist_model_1.default(playlistEntity);
            return new result_1.SuccessResult({
                msg: result_1.Result.transformRequestOnMsg(req),
                data: playlistModel,
            }).handle(res);
        });
    }
    updatePlaylist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const test = yield this.playlistService.updatePlaylist(req.params.id, new playlist_entity_1.default(req.body));
            return new result_1.SuccessResult({
                msg: result_1.Result.transformRequestOnMsg(req),
                data: test,
            }).handle(res);
        });
    }
    deletePlaylist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.playlistService.deletePlaylist(req.params.id);
            return new result_1.SuccessResult({
                msg: result_1.Result.transformRequestOnMsg(req),
            }).handle(res);
        });
    }
}
exports.default = PlaylistController;
