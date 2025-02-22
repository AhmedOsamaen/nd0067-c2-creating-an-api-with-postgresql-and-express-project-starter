"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductsService = void 0;
var dbconnection_1 = __importDefault(require("../properties/dbconnection"));
var consts_1 = require("../util/consts");
var OrderProductsService = /** @class */ (function () {
    function OrderProductsService() {
    }
    OrderProductsService.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, orderProdsResult, orderProductsSql, _i, _a, i, prodResult, orderProduct, orderProducts, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, dbconnection_1.default.connect()];
                    case 1:
                        conn = _b.sent();
                        sql = 'select * from Orders';
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _b.sent();
                        orderProdsResult = [];
                        if (!result.rows) return [3 /*break*/, 6];
                        orderProductsSql = 'SELECT product_id, quantity FROM orders_products WHERE order_id=($1)';
                        _i = 0, _a = result.rows;
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        i = _a[_i];
                        return [4 /*yield*/, conn.query(orderProductsSql, [i.id])];
                    case 4:
                        prodResult = _b.sent();
                        orderProduct = prodResult.rows;
                        orderProducts = __assign(__assign({}, i), { products: orderProduct });
                        orderProdsResult.push(orderProducts);
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        conn.release();
                        return [2 /*return*/, orderProdsResult];
                    case 7:
                        err_1 = _b.sent();
                        throw new Error('could not get Orders' + err_1);
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    OrderProductsService.prototype.addProduct = function (quantity, orderId, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var ordersql, conn, result, order, err_2, sql, conn, result, order, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        ordersql = 'SELECT * FROM orders WHERE id=($1)';
                        return [4 /*yield*/, dbconnection_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(ordersql, [orderId])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        if (order.order_status !== consts_1.OrderStatus.active) {
                            throw new Error("Could not add product ".concat(productId, " to order ").concat(orderId, " because order status is ").concat(order.order_status));
                        }
                        conn.release();
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("".concat(err_2));
                    case 4:
                        _a.trys.push([4, 7, , 8]);
                        sql = 'INSERT INTO orders_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
                        return [4 /*yield*/, dbconnection_1.default.connect()];
                    case 5:
                        conn = _a.sent();
                        return [4 /*yield*/, conn
                                .query(sql, [quantity, orderId, productId])];
                    case 6:
                        result = _a.sent();
                        order = result.rows[0];
                        conn.release();
                        return [2 /*return*/, order];
                    case 7:
                        err_3 = _a.sent();
                        throw new Error("Could not add product ".concat(productId, " to order ").concat(orderId, ": ").concat(err_3));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    OrderProductsService.prototype.getOrderProductsDetails = function (orderId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var ordersql, conn, orderResult, order, orderProductsSql, result, orderProduct, orderProducts, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        ordersql = 'SELECT * FROM orders WHERE id=($1)';
                        return [4 /*yield*/, dbconnection_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(ordersql, [orderId])];
                    case 2:
                        orderResult = _a.sent();
                        order = orderResult.rows[0];
                        if (!orderResult.rows[0]) {
                            throw new Error('No Order Found');
                        }
                        orderProductsSql = 'SELECT product_id, quantity FROM orders_products WHERE order_id=($1)';
                        return [4 /*yield*/, conn.query(orderProductsSql, [orderId])];
                    case 3:
                        result = _a.sent();
                        orderProduct = result.rows;
                        orderProducts = __assign(__assign({}, order), { products: orderProduct });
                        return [2 /*return*/, orderProducts];
                    case 4:
                        err_4 = _a.sent();
                        throw new Error("Could not get order ".concat(orderId, ": ").concat(err_4));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrderProductsService.prototype.getActiveOrderProductsDetails = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var ordersql, conn, orderResult, order, orderProductsSql, result, orderProduct, orderProducts, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        ordersql = 'SELECT * FROM orders WHERE user_id=($1) and order_status =($2)';
                        return [4 /*yield*/, dbconnection_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(ordersql, [userId, consts_1.OrderStatus.active])];
                    case 2:
                        orderResult = _a.sent();
                        order = orderResult.rows[0];
                        if (!order) {
                            throw new Error("No Active Orders Found for user ".concat(userId, ":"));
                        }
                        orderProductsSql = 'SELECT product_id, quantity FROM orders_products WHERE order_id=($1)';
                        return [4 /*yield*/, conn.query(orderProductsSql, [order.id])];
                    case 3:
                        result = _a.sent();
                        orderProduct = result.rows;
                        orderProducts = __assign(__assign({}, order), { products: orderProduct });
                        return [2 /*return*/, orderProducts];
                    case 4:
                        err_5 = _a.sent();
                        throw new Error("Could not get order for user ".concat(userId, ": ").concat(err_5));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrderProductsService.prototype.completedOrders = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var ordersql, conn, orderResult, orderProdsResult, orderProductsSql, _i, _a, i, prodResult, orderProduct, orderProducts, err_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        ordersql = 'SELECT * FROM orders WHERE user_id=($1) and order_status =($2)';
                        return [4 /*yield*/, dbconnection_1.default.connect()];
                    case 1:
                        conn = _b.sent();
                        return [4 /*yield*/, conn.query(ordersql, [userId, consts_1.OrderStatus.complete])];
                    case 2:
                        orderResult = _b.sent();
                        orderProdsResult = [];
                        if (!orderResult.rows) return [3 /*break*/, 6];
                        orderProductsSql = 'SELECT product_id, quantity FROM orders_products WHERE order_id=($1)';
                        _i = 0, _a = orderResult.rows;
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        i = _a[_i];
                        return [4 /*yield*/, conn.query(orderProductsSql, [i.id])];
                    case 4:
                        prodResult = _b.sent();
                        orderProduct = prodResult.rows;
                        orderProducts = __assign(__assign({}, i), { products: orderProduct });
                        orderProdsResult.push(orderProducts);
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        conn.release();
                        return [2 /*return*/, orderProdsResult];
                    case 7:
                        err_6 = _b.sent();
                        throw new Error('could not get Orders' + err_6);
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return OrderProductsService;
}());
exports.OrderProductsService = OrderProductsService;
