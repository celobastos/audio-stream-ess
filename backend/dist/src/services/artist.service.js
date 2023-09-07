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
const artist_model_1 = __importDefault(require("../models/artist.model"));
const http_error_1 = require("../utils/errors/http.error");
class ArtistServiceMessageCode {
}
ArtistServiceMessageCode.artist_not_found = 'artist_not_found';
class ArtistService {
    constructor(artistRepository) {
        this.artistRepository = artistRepository;
    }
    getArtists() {
        return __awaiter(this, void 0, void 0, function* () {
            const artistsEntity = yield this.artistRepository.getArtists();
            const artistsModel = artistsEntity.map(test => new artist_model_1.default(test));
            return artistsModel;
        });
    }
    getArtist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const artistEntity = yield this.artistRepository.getArtist(id);
            if (!artistEntity) {
                throw new http_error_1.HttpNotFoundError({
                    msg: 'Artist not found',
                    msgCode: ArtistServiceMessageCode.artist_not_found,
                });
            }
            const artistModel = new artist_model_1.default(artistEntity);
            return artistModel;
        });
    }
    createArtist(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const artistEntity = yield this.artistRepository.createArtist(data);
            const artistModel = new artist_model_1.default(artistEntity);
            return artistModel;
        });
    }
    updateArtist(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const ArtistEntity = yield this.artistRepository.updateArtist(id, data);
            if (!ArtistEntity) {
                throw new http_error_1.HttpNotFoundError({
                    msg: 'Artist not found',
                    msgCode: ArtistServiceMessageCode.artist_not_found,
                });
            }
            const artistModel = new artist_model_1.default(ArtistEntity);
            return artistModel;
        });
    }
    deleteArtist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.artistRepository.deleteArtist(id);
        });
    }
}
exports.default = ArtistService;
