import { Request, Response } from "express";
import { IUser } from "../entities/user.entity";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../lib/auth";

export const register=async(req:Request,res:Response)=>{
    
    const {fullName,email,password}=req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }
  
      const user = await User.findOne({ email });
  
      if (user) return res.status(400).json({ message: "Email already exists" });
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
      });
  
      if (newUser) {
        // generate jwt token here
        generateToken(newUser._id, res);
        await newUser.save();
  
        res.status(201).json({
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          profilePic: newUser.profilePic,
        });
      } else {
        res.status(400).json({ message: "Invalid user data" });
      }
    
}

export const login=async(req:Request,res:Response)=>{
    
    const {email,password}=req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
    
}

export const logout=async(req:Request,res:Response)=>{
    
    res.clearCookie("token");
    res.status(200).json({message:"Logged out successfully"});
    
}

export const updateProfile=async(req:Request,res:Response)=>{
    
    const { profilePic } = req.body;
    const userId = req.user?._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
    
}

export const checkAuth=async(req:Request,res:Response)=>{
    
    const user=req.user as IUser;
    res.status(200).json(user); 
}
