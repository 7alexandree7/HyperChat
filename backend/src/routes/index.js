import { Router } from "express";
import authRoute from "./auth.route.js";
import messageRoute from "./message.route.js";

const router = Router();

const BASE_PATH = "/api";

router.use(`${BASE_PATH}/auth`, authRoute);
router.use(`${BASE_PATH}/messages`, messageRoute)

export default router;