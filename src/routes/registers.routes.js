import { Router } from "express";
import { isLoggedIn } from "../lib/auth.js";
import {
  renderAddRegister,
  addRegister,
  renderRegisters,
  deleteRegister,
  editRegister,
  renderEditRegister,
} from "../controllers/registers.controller.js";

const router = Router();

// Authorization
router.use(isLoggedIn);

// Routes
router.get("/add", renderAddRegister);
router.post("/add", addRegister);
router.get("/", isLoggedIn, renderRegisters);
router.get("/delete/:id", deleteRegister);
router.get("/edit/:id", renderEditRegister);
router.post("/edit/:id", editRegister);

export default router;