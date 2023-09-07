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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class PlaylistRepository {
    constructor() {
        this.prefix = 'playlist';
        this.db = new client_1.PrismaClient();
    }
    getPlaylists() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.playlist.findMany();
        });
    }
    getPlaylist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.playlist.findUnique({ where: { id: id } });
        });
    }
    createPlaylist(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.playlist.create({ data });
        });
    }
    updatePlaylist(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.playlist.update({ where: { id: id }, data });
        });
    }
    deletePlaylist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.playlist.delete({ where: { id: id } });
        });
    }
    getPlaylistLikesDetails(playlistId) {
        return __awaiter(this, void 0, void 0, function* () {
            const likes = yield this.db.likes.findMany({
                where: { playlistId: playlistId },
                include: { user: true },
            });
            const usersWhoLiked = likes.map((like) => {
                var _a, _b;
                return ({
                    id: (_a = like.user) === null || _a === void 0 ? void 0 : _a.id,
                    name: (_b = like.user) === null || _b === void 0 ? void 0 : _b.name,
                });
            });
            return {
                count: likes.length,
                users: usersWhoLiked,
            };
        });
    }
    removeLikeFromPlaylist(playlistId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.likes.delete({
                where: {
                    playlistId: playlistId,
                    userId: userId,
                },
            });
        });
    }
    addLikeToPlaylist(playlistId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.likes.create({
                data: {
                    playlistId: playlistId,
                    userId: userId,
                },
            });
        });
    }
}
exports.default = PlaylistRepository;
