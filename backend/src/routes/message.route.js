import { Router } from "express";
import {
    getUsersForSideBar,
    getConversationsForSideBar,
    getMessages
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/users", protectRoute, getUsersForSideBar);
router.get("/conversations", protectRoute, getConversationsForSideBar);
router.get("/:id", protectRoute, getMessages);

export default router