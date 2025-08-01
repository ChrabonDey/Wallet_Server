"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const wallet_route_1 = require("../modules/Wallet/wallet.route");
const transaction_routes_1 = require("../modules/Transaction/transaction.routes");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.UserRoutes
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes
    }, {
        path: "/wallets",
        route: wallet_route_1.walletRoutes
    },
    {
        path: "/transaction",
        route: transaction_routes_1.transactionRoutes
    }
];
moduleRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
