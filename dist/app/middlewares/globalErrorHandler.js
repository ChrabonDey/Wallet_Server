"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const env_1 = require("../config/env");
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
    }
    else if (err instanceof Error) {
        statusCode = 500;
    }
    res.status(statusCode).json({
        success: false,
        message: `Something Went Wrong! ${err.message} from chrabon created`,
        err,
        stack: env_1.envVars.NODE_ENV === "development" ? err.stack : null //basically detected which line give me an error so it find out very well 
    });
};
exports.globalErrorHandler = globalErrorHandler;
