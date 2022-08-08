import { Router } from "express";
import auth from "./auth.routes.js";
import index from "./index.routes.js";
import user from "./user.routes.js";
import defaults from "./defaults.routes.js";
import eticolors from "./eticolors.routes.js";
import parts from "./parts.routes.js";
import registers from "./registers.routes.js";

const router = Router();

router.use(index);
router.use(auth);
router.use(user);
router.use("/defaults", defaults);
router.use("/eticolors", eticolors);
router.use("/parts", parts);
router.use("/registers", registers);

export default router;
