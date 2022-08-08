import { Router } from "express";
import { isLoggedIn } from "../lib/auth.js";
import {
  renderAddDefault,
  addDefault,
  renderDefaults,
  deleteDefault,
  editDefault,
  renderEditDefault,
} from "../controllers/defaults.controller.js";

const router = Router();

// Authorization
router.use(isLoggedIn);

// Routes
router.get("/add", renderAddDefault);
router.post("/add", addDefault);
router.get("/", isLoggedIn, renderDefaults);
router.get("/delete/:id", deleteDefault);
router.get("/edit/:id", renderEditDefault);
router.post("/edit/:id", editDefault);

export default router;