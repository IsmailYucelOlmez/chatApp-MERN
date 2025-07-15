import { Request, Response } from "express";

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