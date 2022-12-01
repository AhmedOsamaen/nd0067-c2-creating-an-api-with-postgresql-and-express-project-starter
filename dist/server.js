"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var users_handler_1 = __importDefault(require("./handlers/users-handler"));
var products_handler_1 = __importDefault(require("./handlers/products-handler"));
var orders_handler_1 = __importDefault(require("./handlers/orders-handler"));
var app = (0, express_1.default)();
var address = "localhost:3000";
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, users_handler_1.default)(app);
(0, products_handler_1.default)(app);
(0, orders_handler_1.default)(app);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
