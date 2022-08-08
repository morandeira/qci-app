import { Router } from "express";
import { isLoggedIn } from "../lib/auth.js";
import {
  renderAddPart,
  addPart,
  renderParts,
  deletePart,
  editPart,
  renderEditPart,
} from "../controllers/parts.controller.js";

const router = Router();

// Authorization
router.use(isLoggedIn);

// Routes
router.get("/add", renderAddPart);
router.post("/add", addPart);
router.get("/", isLoggedIn, renderParts);
router.get("/delete/:id", deletePart);
router.get("/edit/:id", renderEditPart);
router.post("/edit/:id", editPart);

export default router;