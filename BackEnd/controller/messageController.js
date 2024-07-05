import { Message } from "../models/messageSchema.js";
import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/errorMiddleware.js"


export const sendMessage=catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,message}=req.body;
    if(!firstName|| !lastName|| !email|| !phone|| !message){
        // return res.status(400).json({
        //     success:false,
        //     message:"Please fill all details of form",
        // });
        return next(new ErrorHandler("PLease Fill the details properly!",400))
    }
        await Message.create({firstName,lastName,email,phone,message});
        res.status(200).json({
            success:true,
            message:"Message send Successfully"
        });
    
})


export const getAllMessages=catchAsyncErrors(async(req,res,next)=>{
    const messages=await Message.find();

    res.status(200).json({
        success:true,
        messages,
    });
});