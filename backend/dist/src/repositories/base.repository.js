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
const database_1 = __importDefault(require("../database"));
const http_error_1 = require("../utils/errors/http.error");
const uuid_1 = require("uuid");
class BaseRepository {
    constructor(prefix) {
        this.prefix = prefix;
        this.db = database_1.default.getInstance();
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.db.data[this.prefix]) {
                    this.db.data[this.prefix] = [];
                }
                const newItem = Object.assign(Object.assign({}, data), { id: (0, uuid_1.v4)() });
                this.db.data[this.prefix].push(newItem);
                return newItem;
            }
            catch (e) {
                throw new http_error_1.HttpInternalServerError();
            }
        });
    }
    update(filter, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.db.data[this.prefix]) {
                    return null;
                }
                const item = this.db.data[this.prefix].find(filter);
                if (item) {
                    delete data.id;
                    Object.assign(item, data);
                    return item;
                }
                return null;
            }
            catch (e) {
                throw new http_error_1.HttpInternalServerError();
            }
        });
    }
    findOne(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.db.data[this.prefix]) {
                    return null;
                }
                return this.db.data[this.prefix].find(filter) || null;
            }
            catch (e) {
                throw new http_error_1.HttpInternalServerError();
            }
        });
    }
    findAll(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.db.data[this.prefix]) {
                    return [];
                }
                return filter ? this.db.data[this.prefix].filter(filter) : this.db.data[this.prefix];
            }
            catch (e) {
                throw new http_error_1.HttpInternalServerError();
            }
        });
    }
    delete(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.db.data[this.prefix]) {
                    return;
                }
                this.db.data[this.prefix] = this.db.data[this.prefix].filter(filter);
            }
            catch (e) {
                throw new http_error_1.HttpInternalServerError();
            }
        });
    }
}
exports.default = BaseRepository;
