/* eslint-disable no-console */
import {Server} from "http"

import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";


let server:Server;


const startServer= async()=>{
    try{
        await mongoose.connect(envVars.DB_URL)
        console.log("mongoose connected")
        server = app.listen(envVars.PORT,()=>{
             console.log("Server is listening to port 5000")
        });
    }catch(error){
         console.log(error)
    }
}

startServer();


process.on("unhandledRejection",(err)=>{
     console.log("Undhandled Rejecttion detected");
     console.log(err)
     if(server){
        server.close(()=>{
             process.exit(1) 
        })
     }
     process.exit(1)
})
process.on("uncaughtException",(err)=>{
     console.log(err)
     console.log("Uncaught exception detected");
     if(server){
        server.close(()=>{
             process.exit(1)
        })
     }
     process.exit(1)
})
process.on("SIGTERM",()=>{
     console.log("Sigterm signal detected");
     if(server){
        server.close(()=>{
             process.exit(1) 
        })
     }
     process.exit(1)
})
process.on("SIGINT",()=>{
     console.log("SigINT signal detected");
     if(server){
        server.close(()=>{
             process.exit(1) 
        })
     }
     process.exit(1)
})




