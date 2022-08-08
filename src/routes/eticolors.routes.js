import { Router } from "express";
import { isLoggedIn } from "../lib/auth.js";
import {
  renderAddEticolor,
  addEticolor,
  renderEticolors,
  deleteEticolor,
  editEticolor,
  renderEditEticolor,
} from "../controllers/eticolors.controller.js";

const router = Router();

// Authorization
router.use(isLoggedIn);

// Routes
router.get("/add", renderAddEticolor);
router.post("/add", addEticolor);
router.get("/", isLoggedIn, renderEticolors);
router.get("/delete/:id", deleteEticolor);
router.get("/edit/:id", renderEditEticolor);
router.post("/edit/:id", editEticolor);

export default router;