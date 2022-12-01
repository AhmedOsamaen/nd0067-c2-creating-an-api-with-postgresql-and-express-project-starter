"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dbconnection_1 = require("../properties/dbconnection");
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw new Error('Token is required in Authorization header');
        }
        var token = authorizationHeader.split(' ')[1];
        var decoded = jsonwebtoken_1.default.verify(token, dbconnection_1.secret);
        next();
    }
    catch (error) {
        res.status(401);
        res.send(error + ' And Assign Bearer before token ');
    }
};
exports.verifyAuthToken = verifyAuthToken;
