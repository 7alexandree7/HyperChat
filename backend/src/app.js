import express from "express";
import cors from "cors";
import { ENV_VARIABLES } from "./config/ENV_VARIABLES.js";
import { clerkMiddleware } from '@clerk/express'

const app = express();

app.use(express.json());
app.use(cors({ origin: ENV_VARIABLES.ORIGIN, credentials: true }));
app.use(clerkMiddleware())

export default app