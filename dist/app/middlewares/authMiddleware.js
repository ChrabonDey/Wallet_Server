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
exports.restrictTo = exports.authenticate = void 0;
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../modules/user/user.model");
const env_1 = require("../config/env");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token)
        return res.status(401).json({ error: 'Authentication required' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.envVars.JWT_SECRET);
        const user = yield user_model_1.User.findById(decoded.id);
        if (!user || user.isActive !== 'ACTIVE')
            return res.status(401).json({ error: 'Invalid or inactive user' });
        req.user = user;
        console.log('Authenticated user:', user); // Added for debugging
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Invalid token' });
    }
});
exports.authenticate = authenticate;
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied' });
        }
        console.log('User role:', req.user.role); // Added for debugging
        next();
    };
};
exports.restrictTo = restrictTo;
