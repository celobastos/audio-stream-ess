"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_entity_1 = __importDefault(require("./base.entity"));
class TestEntity extends base_entity_1.default {
    constructor(data) {
        super(data.id || '');
        this.name = data.name;
    }
}
exports.default = TestEntity;
