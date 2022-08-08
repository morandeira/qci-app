import { Router } from "express";

import {
  renderSignUp,
  signUp,
  renderSignIn,
  signIn,
  logout,
} from "../controllers/auth.controller.js";

import { isNotLoggedIn } from "../lib/auth.js";


const router = Router();

// SIGN UP
router.get("/signup", isNotLoggedIn, renderSignUp);
router.post("/signup", isNotLoggedIn, signUp);

// SING IN
router.get("/signin", isNotLoggedIn, renderSignIn);
router.post("/signin", isNotLoggedIn, signIn);

// LOG OUT
router.get("/logout", logout);

export default router;
