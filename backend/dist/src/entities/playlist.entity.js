"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlaylistEntity {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.genre = data.genre;
        this.description = data.description;
        this.ownerId = data.ownerId;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
exports.default = PlaylistEntity;
