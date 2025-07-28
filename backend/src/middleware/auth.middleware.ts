import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { Request, Response, NextFunction } from "express";
import CustomError from "../lib/Error";
import { HTTP_CODES, LOG_LEVELS } from "../config/enum.js";

export const protectedRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string }

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    const customError = new CustomError({message:error as string, code:HTTP_CODES.INT_SERVER_ERROR, description:LOG_LEVELS.ERROR});
    res.status(customError.code).json(customError);
  }
};