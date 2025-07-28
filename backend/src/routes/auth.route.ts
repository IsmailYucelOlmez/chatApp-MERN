import { Router } from "express";
import { register, login, logout, updateProfile, checkAuth } from "../controllers/auth.controller";
import { asyncWrapper } from "../lib/AsyncWrapper";
import { protectedRoute } from "../middleware/auth.middleware";

const router=Router();

router.post("/register", asyncWrapper(register));

router.post("/login", asyncWrapper(login));

router.post("/logout", asyncWrapper(logout));

router.put("/updateprofile", protectedRoute, asyncWrapper(updateProfile));

router.get("/checkauth", protectedRoute, asyncWrapper(checkAuth));

export default router;