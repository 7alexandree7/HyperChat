import { Router } from "express";
import { upload } from "../middleware/upload.middleware.js";
import {
    getUsersForSideBar,
    getConversationsForSideBar,
    getMessages,
    sendMessage
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.get("/users", getUsersForSideBar);
router.get("/conversations", getConversationsForSideBar);
router.get("/:id", getMessages);
router.post("/send/:id", upload.single("media"), sendMessage);

export default router