import { Router } from "express";
import { redirectToLongUrlController } from "../controllers/redirect.controller";

const router = Router();

// redirect route
router.get('/:shortId', redirectToLongUrlController);

export default router;