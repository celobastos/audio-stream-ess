"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Env {
}
exports.default = Env;
Env.ENV = process.env.ENV || 'DEV';
Env.PORT = process.env.PORT || 5001;
