"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_entity_1 = __importDefault(require("../entities/test.entity"));
class Database {
    constructor() {
        this.data = {};
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    static reset() {
        Database.instance = new Database();
    }
    static seed() {
        Database.getInstance().data = {
            tests: [
                new test_entity_1.default({
                    id: '89ecc32a-aec7-4b71-adfd-03287e4ca74f',
                    name: 'Test Seed',
                }),
            ],
        };
    }
}
exports.default = Database;
