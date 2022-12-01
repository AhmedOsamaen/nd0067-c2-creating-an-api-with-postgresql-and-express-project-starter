"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var server_1 = __importDefault(require("../server"));
var request = (0, supertest_1.default)(server_1.default);
describe('Test endpoint responses', function () {
    it('gets the main endpoint', function (done) {
        request.get('/').expect(200);
        done();
    });
    it('gets the products endpoint', function (done) {
        request
            .get('/products')
            .expect(200);
        done();
    });
    it('gets the users endpoint', function (done) {
        request
            .get('/users')
            .expect(200);
        done();
    });
    it('gets the orders endpoint', function (done) {
        request
            .get('/orders')
            .expect(200);
        done();
    });
});
