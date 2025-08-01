"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./app/routes");
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const Notfound_1 = require("./app/middlewares/Notfound");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", routes_1.router);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Tour Management system "
    });
});
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(Notfound_1.notfound);
exports.default = app;
