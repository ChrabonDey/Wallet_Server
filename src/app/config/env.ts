import dotenv from "dotenv"
dotenv.config()


interface EnvConfig{
     PORT:string,
     DB_URL:string,
     NODE_ENV:"development" | "production",
     JWT_SECRET:string
}

const loadEnv = (): EnvConfig=>{
    const requiredVariables:string[]=["PORT","DB_URL","NODE_ENV","JWT_SECRET"];

    requiredVariables.forEach(key=>{
         if(!process.env[key]){
             throw new Error(`Missing require environment variable ${key}`)
         }
    })
    return{
       PORT: process.env.PORT as string,
        DB_URL:process.env.DB_URL as string,
        NODE_ENV:process.env.NODE_ENV as "development" | "production",
        JWT_SECRET:process.env.JWT_SECRET as string
    }
}

export const envVars = loadEnv()