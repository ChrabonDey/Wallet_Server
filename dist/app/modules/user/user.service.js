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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Userservice = exports.approveAgent = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const user_interface_1 = require("./user.interface");
const user_model_1 = require("./user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const wallet_model_1 = __importDefault(require("../Wallet/wallet.model"));
const mongoose_1 = require("mongoose");
const createUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = payload, rest = __rest(payload, ["email", "password", "role"]);
    const isUserExist = yield user_model_1.User.findOne({ email });
    if (isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User Already Exist");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const authProvider = {
        provider: "credentials",
        providerId: email,
    };
    const user = yield user_model_1.User.create(Object.assign({ email, password: hashedPassword, auths: [authProvider], role: role || "USER" }, rest));
    if (user.role === "USER" || user.role === "AGENT") {
        const wallet = new wallet_model_1.default({ userId: user._id, balance: 50 });
        yield wallet.save();
    }
    return user;
});
const getAllusers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find({});
    return users;
});
const approveAgent = (payload, status) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = payload;
    if (!_id || !mongoose_1.Types.ObjectId.isValid(_id)) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Invalid or missing user ID");
    }
    const user = yield user_model_1.User.findById(_id);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User not found");
    }
    if (user.role !== user_interface_1.ROLE.AGENT) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, `User is not an agent (role: ${user.role})`);
    }
    user.agentApprovalStatus = status;
    yield user.save();
    return user;
});
exports.approveAgent = approveAgent;
exports.Userservice = {
    createUserService,
    getAllusers,
    approveAgent: exports.approveAgent
};
