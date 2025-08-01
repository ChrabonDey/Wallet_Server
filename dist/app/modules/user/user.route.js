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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const zod_1 = require("zod");
const user_validation_1 = require("./user.validation");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const user_interface_1 = require("./user.interface");
const router = (0, express_1.Router)();
const validate = (zodSchema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("old body", req.body);
        req.body = yield zodSchema.parseAsync(req.body);
        console.log("new body", req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: error,
            });
        }
        next(error);
    }
});
router.post("/register", validate(user_validation_1.createUserZodSchema), user_controller_1.UserController.createUser);
router.get("/all-users", (0, authMiddleware_1.restrictTo)(user_interface_1.ROLE.ADMIN), user_controller_1.UserController.getallUsers);
router.patch('/approve-agent', authMiddleware_1.authenticate, (0, authMiddleware_1.restrictTo)(user_interface_1.ROLE.ADMIN), user_controller_1.UserController.approveAgent);
exports.UserRoutes = router;
