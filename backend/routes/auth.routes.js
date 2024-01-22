import express from "express";
import {
  userSignup,
  userSignin,
  refreshAccessToken,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", userSignup);

router.post("/login", userSignin);

router.post("/refresh-access-token", refreshAccessToken);

export default router;
