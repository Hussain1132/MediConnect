import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js"
import { User } from "../models/userSchema.js";
import {generateToken} from "../utils/jwtToken.js"

export const patientRegister=catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,
        email,phone,nic
        ,dob,gender,
        password,role}=req.body;

        if(!firstName||!lastName||
            !email||!phone
            ||!nic
            ||!dob||
            !gender||
            !password||
            !role){
                return next(new ErrorHandler("Please Fill Full Form !",400));
            }

            let user =await User.findOne({email});

            if(user){
                return next(new ErrorHandler("User already registered !",400));
            }
            user =await User.create({firstName,lastName,
                email,phone,nic
                ,dob,gender,
                password,role});
            
            generateToken(user,"User Registered",200,res)
            // res.status(200).json({
            //     success:true,
            //     message:"User Registered"
            // });
});


export const login= catchAsyncErrors(async(req,res,next)=>{
    const {email,password,confirmPassword,role}=req.body;

    if(!email||!password||!confirmPassword||!role){
        return next(new ErrorHandler("Please provide all details!",400));
    }

    if(password!=confirmPassword){
        return next(new ErrorHandler("Password do not match!",400))
    }

    const user=await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Password or email",400));
    }
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password or email",400));
    }

    if(role!==user.role){
        return next(new ErrorHandler("User with this role not found",400));
    }
    generateToken(user,"User logged in Successfully",200,res)
    // res.status(200).json({
    //     success:true,
    //     message:"User logged in Successfully"
    // });
});



export const addNewAdmin=catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,
        email,phone,nic
        ,dob,gender,
        password}=req.body;

        if(!firstName||!lastName||
            !email||!phone
            ||!nic
            ||!dob||
            !gender||
            !password
            ){
                return next(new ErrorHandler("Please Fill Full Form !",400));
            }
        const isRegistered=await User.findOne({email});
        if(isRegistered){
            return next(new ErrorHandler(`${isRegistered.role} with this email already exist`));

        }

        const admin = await User.create({firstName,lastName,email,phone,nic,dob,gender,password,role:"Admin"});
        res.status(200).json({
            success:true,
            message:"New Admin Registered"
        })

});



export const getAllDoctors =catchAsyncErrors(async(req,res,next)=>{
    const doctors=await User.find({role:"Doctor"});

    res.status(200).json({
        success:true,
        doctors
    })
})

export const getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user= req.user;
    res.status(200).json({
        success:true,
        user,
    });
});

