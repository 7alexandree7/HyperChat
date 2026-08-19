import mongoose from "mongoose";
import { ENV_VARIABLES } from "../config/ENV_VARIABLES.js";
import job from "../lib/cron.js";


export async function ConnectDB() {
    try {
        await mongoose.connect(ENV_VARIABLES.DB_URL);
        console.log("Connected to MongoDB");
        if (ENV_VARIABLES.NODE_ENV === "production")  job.start();
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}
