"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminPass = exports.secret = exports.saltRounds = exports.pepper = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_TEST_DB = _a.POSTGRES_TEST_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, BCRYPT_PASSWORD = _a.BCRYPT_PASSWORD, SALT_ROUNDS = _a.SALT_ROUNDS, TOKEN_SECRET = _a.TOKEN_SECRET, ADMIN_PASS = _a.ADMIN_PASS, ENV = _a.ENV;
var client = new pg_1.Pool;
if (ENV === 'dev') {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
if (ENV === 'test') {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
exports.pepper = BCRYPT_PASSWORD;
exports.saltRounds = SALT_ROUNDS;
exports.secret = TOKEN_SECRET;
exports.adminPass = ADMIN_PASS;
exports.default = client;
