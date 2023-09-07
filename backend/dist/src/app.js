"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("./logger"));
const index_1 = __importDefault(require("./routes/index"));
const result_1 = require("./utils/result");
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: '*',
}));
(0, index_1.default)(app);
app.use((error, req, res, next) => {
    var _a;
    if (error.status >= 500) {
        logger_1.default.error(error.toString());
    }
    new result_1.FailureResult({
        msg: (_a = error.msg) !== null && _a !== void 0 ? _a : error.message,
        msgCode: error.msgCode,
        code: error.status,
    }).handle(res);
});
// e.g. Seed database with initial data;
database_1.default.seed();
exports.default = app;
