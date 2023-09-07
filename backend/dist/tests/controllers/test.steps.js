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
const jest_cucumber_1 = require("jest-cucumber");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
const di_1 = require("../../src/di");
const test_repository_1 = __importDefault(require("../../src/repositories/test.repository"));
const feature = (0, jest_cucumber_1.loadFeature)('tests/features/tests.feature');
const request = (0, supertest_1.default)(app_1.default);
(0, jest_cucumber_1.defineFeature)(feature, test => {
    // mocking the repository
    let mockTestRepository;
    let response;
    beforeEach(() => {
        mockTestRepository = di_1.di.getRepository(test_repository_1.default);
    });
    test('Create a test', ({ given, when, then, and }) => {
        given(/^o TestRepository não tem um test com nome "(.*)"$/, (testId, testName) => __awaiter(void 0, void 0, void 0, function* () {
            // Check if the test does not exist in the repository and delete it if it exists
            const existingTest = yield mockTestRepository.getTest(testId);
            if (existingTest) {
                yield mockTestRepository.deleteTest(testId);
            }
        }));
        when(/^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com o nome "(.*)"$/, (url, testName) => __awaiter(void 0, void 0, void 0, function* () {
            response = yield request.post(url).send({
                name: testName,
            });
        }));
        then(/^o status da resposta deve ser "(.*)"$/, statusCode => {
            expect(response.status).toBe(parseInt(statusCode, 10));
        });
        and(/^o JSON da resposta deve conter o nome "(.*)"$/, testName => {
            expect(response.body.data).toEqual(expect.objectContaining({
                name: testName,
            }));
        });
    });
});
