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
const base_repository_1 = __importDefault(require("./base.repository"));
class TestRepository extends base_repository_1.default {
    constructor() {
        super('tests');
    }
    getTests() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findAll();
        });
    }
    getTest(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne(item => item.id === id);
        });
    }
    createTest(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.add(data);
        });
    }
    updateTest(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.update(item => item.id === id, data);
        });
    }
    deleteTest(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.delete(item => item.id !== id);
        });
    }
}
exports.default = TestRepository;
