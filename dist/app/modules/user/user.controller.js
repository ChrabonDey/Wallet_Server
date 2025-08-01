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
exports.UserController = exports.approveAgent = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_service_1 = require("./user.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const createUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.Userservice.createUserService(req.body);
    res.status(http_status_codes_1.default.CREATED).json({
        message: "User created successfully",
        user
    });
}));
const getallUsers = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.Userservice.getAllusers();
    res.status(http_status_codes_1.default.OK).json({
        message: "User found successfully",
        user
    });
}));
exports.approveAgent = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, status } = req.body;
    if (!_id) {
        res.status(http_status_codes_1.default.BAD_REQUEST).json({ message: "User ID (_id) is required" });
        return;
    }
    if (!status || (status !== 'approved' && status !== 'suspended')) {
        res.status(http_status_codes_1.default.BAD_REQUEST).json({ message: "Status must be 'approved' or 'suspended'" });
        return;
    }
    console.log('approveAgent called with:', { _id, status });
    const user = yield user_service_1.Userservice.approveAgent({ _id }, status);
    res.status(http_status_codes_1.default.OK).json({
        message: "User updated successfully",
        user,
    });
}));
exports.UserController = {
    createUser,
    getallUsers,
    approveAgent: exports.approveAgent
};
//higher order function means this kind of function who basically get a function in parameter and return a function
