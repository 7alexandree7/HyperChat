import { Router } from "express";
import authRoute from "./auth.route.js";

const router = Router();

const BASE_PATH = "/api/v1";

router.use(`${BASE_PATH}/auth`, authRoute);

export default router;