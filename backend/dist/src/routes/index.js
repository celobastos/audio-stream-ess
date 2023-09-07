"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const di_1 = require("../di");
const test_controller_1 = __importDefault(require("../controllers/test.controller"));
const test_service_1 = __importDefault(require("../services/test.service"));
const album_controller_1 = __importDefault(require("../controllers/album.controller"));
const artist_controller_1 = __importDefault(require("../controllers/artist.controller"));
const artist_service_1 = __importDefault(require("../services/artist.service"));
const playlist_controller_1 = __importDefault(require("../controllers/playlist.controller"));
const playlist_service_1 = __importDefault(require("../services/playlist.service"));
const router = (0, express_1.Router)();
const prefix = '/api';
exports.default = (app) => {
    app.use(prefix, new test_controller_1.default(router, di_1.di.getService(test_service_1.default)).router, new album_controller_1.default(router, di_1.di.getService(test_service_1.default)).router, new playlist_controller_1.default(router, di_1.di.getService(playlist_service_1.default)).router);
    app.use(prefix, new artist_controller_1.default(router, di_1.di.getService(artist_service_1.default)).router);
};
