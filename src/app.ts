/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import  express, { NextFunction, Request, Response }  from "express";
import cors from "cors"
import { router } from "./app/routes";
import { success } from "zod";
import { envVars } from "./app/config/env";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notfound } from "./app/middlewares/Notfound";
const app=express()
app.use(express.json())
app.use(cors())

app.use("/api", router)

app.get("/",(req:Request,res:Response)=>{
       res.status(200).json({
         message: "Welcome to Tour Management system "
       })
})

app.use(globalErrorHandler)
app.use(notfound)

export default app;