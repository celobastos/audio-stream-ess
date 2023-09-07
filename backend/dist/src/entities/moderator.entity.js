"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_entity_1 = __importDefault(require("./base.entity"));
class ModeratorEntity extends base_entity_1.default {
    constructor(data) {
        super(data.id || '');
        this.name = data.name;
        this.genre = data.genre;
        this.description = data.description;
        this.login = data.login;
        this.pass = data.pass;
    }
}
exports.default = ModeratorEntity;
