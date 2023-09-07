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
const test_entity_1 = __importDefault(require("../entities/test.entity"));
class TestController {
    constructor(router, testService) {
        this.prefix = '/tests';
        this.router = router;
        this.testService = testService;
        this.initRoutes();
    }
    initRoutes() {
        this.router.get(this.prefix, (req, res) => this.getTests(req, res));
        this.router.get(`${this.prefix}/others`, (req, res) => this.getOthersTests(req, res));
        this.router.get(`${this.prefix}/:id`, (req, res) => this.getTest(req, res));
        this.router.post(this.prefix, (req, res) => this.createTest(req, res));
        this.router.put(`${this.prefix}/:id`, (req, res) => this.updateTest(req, res));
        this.router.delete(`${this.prefix}/:id`, (req, res) => this.deleteTest(req, res));
    }
    getTests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tests = yield this.testService.getTests();
            return new result_1.SuccessResult({
                msg: result_1.Result.transformRequestOnMsg(req),
                data: tests,
            }).handle(res);
        });
    }
    getOthersTests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tests = yield this.testService.getOtherTests();
            return new result_1.SuccessResult({
                msg: result_1.Result.transformRequestOnMsg(req),
                data: tests,
            }).handle(res);
        });
    }
    getTest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const test = yield this.testService.getTest(req.params.id);
            return new result_1.SuccessResult({
                msg: result_1.Result.transformRequestOnMsg(req),
                data: test,
            }).handle(res);
        });
    }
    createTest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const test = yield this.testService.createTest(new test_entity_1.default(req.body));
            return new result_1.SuccessResult({
                msg: result_1.Result.transformRequestOnMsg(req),
                data: test,
            }).handle(res);
        });
    }
    updateTest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const test = yield this.testService.updateTest(req.params.id, new test_entity_1.default(req.body));
            return new result_1.SuccessResult({
                msg: result_1.Result.transformRequestOnMsg(req),
                data: test,
            }).handle(res);
        });
    }
    deleteTest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.testService.deleteTest(req.params.id);
            return new result_1.SuccessResult({
                msg: result_1.Result.transformRequestOnMsg(req),
            }).handle(res);
        });
    }
}
exports.default = TestController;
