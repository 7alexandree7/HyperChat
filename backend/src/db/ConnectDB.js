import mongoose from "mongoose";
import { ENV_VARIABLES } from "../config/ENV_VARIABLES.js";


export async function ConnectDB() {
    try {
        await mongoose.connect(ENV_VARIABLES.DB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}
