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
const test_model_1 = __importDefault(require("../models/test.model"));
const http_error_1 = require("../utils/errors/http.error");
class TestServiceMessageCode {
}
TestServiceMessageCode.test_not_found = 'test_not_found';
class TestService {
    constructor(testRepository, otherRepository) {
        this.testRepository = testRepository;
        this.otherRepository = otherRepository;
    }
    getTests() {
        return __awaiter(this, void 0, void 0, function* () {
            const testsEntity = yield this.testRepository.getTests();
            const testsModel = testsEntity.map(test => new test_model_1.default(test));
            return testsModel;
        });
    }
    getOtherTests() {
        return __awaiter(this, void 0, void 0, function* () {
            const testsEntity = yield this.otherRepository.getTests();
            const testsModel = testsEntity.map(test => new test_model_1.default(test));
            return testsModel;
        });
    }
    getTest(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const testEntity = yield this.testRepository.getTest(id);
            if (!testEntity) {
                throw new http_error_1.HttpNotFoundError({
                    msg: 'Test not found',
                    msgCode: TestServiceMessageCode.test_not_found,
                });
            }
            const testModel = new test_model_1.default(testEntity);
            return testModel;
        });
    }
    createTest(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const testEntity = yield this.testRepository.createTest(data);
            const testModel = new test_model_1.default(testEntity);
            return testModel;
        });
    }
    updateTest(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const testEntity = yield this.testRepository.updateTest(id, data);
            if (!testEntity) {
                throw new http_error_1.HttpNotFoundError({
                    msg: 'Test not found',
                    msgCode: TestServiceMessageCode.test_not_found,
                });
            }
            const testModel = new test_model_1.default(testEntity);
            return testModel;
        });
    }
    deleteTest(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.testRepository.deleteTest(id);
        });
    }
}
exports.default = TestService;
