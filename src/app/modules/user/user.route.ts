import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { ZodTypeAny, ZodError } from "zod";
import { createUserZodSchema } from "./user.validation";
import { authenticate, restrictTo } from "../../middlewares/authMiddleware";
import { ROLE } from "./user.interface";

const router=Router();

const validate=(zodSchema:ZodTypeAny)=> async(req:Request,res:Response,next:NextFunction)=>{

      try{
        console.log("old body",req.body)
         req.body= await zodSchema.parseAsync(req.body)
         console.log("new body",req.body)
         next();
       

      }catch(error){
        if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error,
        });
      }
           next(error)
      }
}

router.post("/register", validate(createUserZodSchema),UserController.createUser)

router.get("/all-users",restrictTo(ROLE.ADMIN),UserController.getallUsers )
router.patch('/approve-agent', authenticate, restrictTo(ROLE.ADMIN), UserController.approveAgent);

export const UserRoutes=router