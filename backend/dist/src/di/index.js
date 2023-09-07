"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.di = void 0;
const other_repository_1 = __importDefault(require("../repositories/other.repository"));
const test_repository_1 = __importDefault(require("../repositories/test.repository"));
const test_service_1 = __importDefault(require("../services/test.service"));
const injector_1 = __importDefault(require("./injector"));
exports.di = new injector_1.default();
// Test
exports.di.registerRepository(test_repository_1.default, new test_repository_1.default());
exports.di.registerRepository(other_repository_1.default, new other_repository_1.default());
exports.di.registerService(test_service_1.default, new test_service_1.default(exports.di.getRepository(test_repository_1.default), exports.di.getRepository(other_repository_1.default)));
