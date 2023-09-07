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
const test_entity_1 = __importDefault(require("../../src/entities/test.entity"));
const test_service_1 = __importDefault(require("../../src/services/test.service"));
const test_model_1 = __importDefault(require("../../src/models/test.model"));
const feature = (0, jest_cucumber_1.loadFeature)('tests/features/tests-service.feature');
(0, jest_cucumber_1.defineFeature)(feature, test => {
    // mocking the repository
    let mockTestRepository;
    let mockOtherRepository;
    let service;
    let tests;
    let testReturned;
    let idToCall;
    let mockTestEntity;
    let mockTestModel;
    beforeEach(() => {
        mockTestRepository = {
            getTests: jest.fn(),
            getTest: jest.fn(),
            createTest: jest.fn(),
            updateTest: jest.fn(),
            deleteTest: jest.fn(),
        };
        mockOtherRepository = {
            getTests: jest.fn(),
        };
        service = new test_service_1.default(mockTestRepository, mockOtherRepository);
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    test('Return all tests', ({ given, when, then }) => {
        given(/^o método getTests do TestService retorna um array com o test de nome "(.*)" e id "(.*)"$/, (testName, testId) => __awaiter(void 0, void 0, void 0, function* () {
            mockTestEntity = new test_entity_1.default({
                id: testId,
                name: testName,
            });
            jest.spyOn(mockTestRepository, 'getTests').mockResolvedValue([mockTestEntity]);
        }));
        when('o método getTests do TestService for chamado', () => __awaiter(void 0, void 0, void 0, function* () {
            tests = yield service.getTests();
        }));
        then(/^o array retornado deve conter o test de nome "(.*)" e id "(.*)"$/, (testName, testId) => {
            mockTestModel = new test_model_1.default(new test_entity_1.default({ id: testId, name: testName }));
            expect(tests).toEqual([mockTestModel]);
        });
    });
    test('Return test by id', ({ given, when, then }) => {
        given(/^o método getTest chamado com "(.*)" do TestService retorna um test de nome "(.*)" e id "(.*)"$/, (id, testName, testId) => __awaiter(void 0, void 0, void 0, function* () {
            idToCall = id;
            mockTestEntity = new test_entity_1.default({
                id: testId,
                name: testName,
            });
            jest.spyOn(mockTestRepository, 'getTest').mockResolvedValue(mockTestEntity);
        }));
        when(/^o método getTest do TestService for chamado com o id "(.*)"$/, (testId) => __awaiter(void 0, void 0, void 0, function* () {
            testReturned = yield service.getTest(testId);
        }));
        then(/^o test retornado deve ter o nome "(.*)" e id "(.*)"$/, (testName, testId) => {
            const testEntity = new test_entity_1.default({ id: testId, name: testName });
            expect(testReturned).toEqual(testEntity);
            expect(mockTestRepository.getTest).toBeCalledWith(idToCall);
        });
    });
});
