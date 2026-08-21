import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { ENV_VARIABLES } from "./config/ENV_VARIABLES.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhook from "./webhooks/clerk.webhook.js";

const app = express();

app.use("/api/webhooks/clerk", express.raw({ type: "application/json" }), clerkWebhook);
app.use(express.json());
app.use(cors({ origin: ENV_VARIABLES.ORIGIN, credentials: true }));
app.use(clerkMiddleware())

const FRONTEND_URL = ENV_VARIABLES.ORIGIN;
const publicDir = path.join(process.cwd(), "public");

if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir));
    app.get("/{*any}", (req, res, next) => {
        res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
    })
}


app.get("/health", (req, res) => res.send("I'm alive!"));

export default app