import { model, Schema } from "mongoose";
import { IAuthProvider, IsActive, IsAgent, IUser, ROLE } from "./user.interface";

const authProviderSchema= new Schema<IAuthProvider>({
     provider:{type:String, required:true},
     providerId:{type:String, required:true}
},{
    versionKey:false,
    _id:false
})

const userschema= new Schema <IUser>({
       name:{type:String, required:true},
       email:{type:String, required:true, unique:true},
       password:{type:String},
       role:{
        type:String,
        enum:Object.values(ROLE),
        default:ROLE.USER,

       },
       agentApprovalStatus:{
         type:String,
         enum:Object.values(IsAgent),
         default:"pending",
         required:function(){return this.role===ROLE.AGENT}
       },
       commissionRate: { 
        type: Number, 
         default: 0.01,
         required: function() { return this.role === ROLE.AGENT }
      },

         picture:{type:String},
         address:{type:String},
         phone:{type:String},
         isDeleted:{type:Boolean, default:false},
         isActive:{
             type:String,
             enum:Object.values(IsActive),
             default:IsActive.ACTIVE
         },

         isVerified:{type:Boolean, default:false},
         auths:[authProviderSchema]
},{
    timestamps:true,
    versionKey:false
})

export const User= model<IUser>("User",userschema)