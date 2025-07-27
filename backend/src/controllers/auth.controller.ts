import { Request, Response } from "express";
import { IUser } from "../entities/user.entity";

export const register=async(req:Request,res:Response)=>{
    try {
        const {name,email,password}=req.body;
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}

export const login=async(req:Request,res:Response)=>{
    try {
        const {email,password}=req.body;
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}

export const logout=async(req:Request,res:Response)=>{
    try {
        res.clearCookie("token");
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}

export const updateProfilePicture=async(req:Request,res:Response)=>{
    try {
        const {profilePic}=req.body;
        const user=req.user as IUser;
        const updatedUser=await User.findByIdAndUpdate(user._id,{profilePic},{new:true});
        res.status(200).json({message:"Profile picture updated successfully",user:updatedUser});
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}