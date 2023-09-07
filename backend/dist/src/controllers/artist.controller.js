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
const artist_entity_1 = __importDefault(require("../entities/artist.entity"));
const artist_repository_1 = __importDefault(require("../repositories/artist.repository"));
const artist_model_1 = __importDefault(require("../models/artist.model"));
class ArtistController {
    constructor(router, artistService) {
        this.prefix = '/artist';
        this.router = router;
        this.artistService = artistService;
        this.initRoutes();
    }
    initRoutes() {
        this.router.get(this.prefix, (req, res) => this.getArtists(req, res));
        this.router.get(`${this.prefix}/:id`, (req, res) => this.getArtist(req, res));
        this.router.post(this.prefix, (req, res) => this.createArtist(req, res));
        this.router.put(`${this.prefix}/:id`, (req, res) => this.updateArtist(req, res));
        this.router.delete(`${this.prefix}/:id`, (req, res) => this.deleteArtist(req, res));
    }
    getArtists(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tests = yield this.artistService.getArtists();
            return new result_1.SuccessResult({
                msg: result_1.Result.transformRequestOnMsg(req),
                data: tests,
            }).handle(res);
        });
    }
    getArtist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const test = yield this.artistService.getArtist(req.params.id);
            return new result_1.SuccessResult({
                msg: result_1.Result.transformRequestOnMsg(req),
                data: test,
            }).handle(res);
        });
    }
    createArtist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const artist = new artist_entity_1.default(req.body);
            const artistRepository = new artist_repository_1.default();
            const artistEntity = yield artistRepository.createArtist(artist);
            const artistModel = new artist_model_1.default(artistEntity);
            //const test = await this.artistService.createArtist(artist);
            return new result_1.SuccessResult({
                msg: result_1.Result.transformRequestOnMsg(req),
                data: artistModel,
            }).handle(res);
        });
    }
    updateArtist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const test = yield this.artistService.updateArtist(req.params.id, new artist_entity_1.default(req.body));
            return new result_1.SuccessResult({
                msg: result_1.Result.transformRequestOnMsg(req),
                data: test,
            }).handle(res);
        });
    }
    deleteArtist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.artistService.deleteArtist(req.params.id);
            return new result_1.SuccessResult({
                msg: result_1.Result.transformRequestOnMsg(req),
            }).handle(res);
        });
    }
}
exports.default = ArtistController;
