import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { walletRoutes } from "../modules/Wallet/wallet.route";
import { transactionRoutes } from "../modules/Transaction/transaction.routes";


export const router= Router()

const moduleRoutes=[
    {
        path:"/user",
        route:UserRoutes
    },
    {
        path:"/auth",
        route:AuthRoutes

    },{
        path:"/wallets",
        route:walletRoutes
    },
    {
        path:"/transaction",
        route:transactionRoutes
    }

]

moduleRoutes.forEach((route)=>{
      router.use(route.path,route.route)
})

