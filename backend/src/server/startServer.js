import app from "../app.js";
import { ENV_VARIABLES } from "../config/ENV_VARIABLES.js";
import { ConnectDB } from "../db/ConnectDB.js";

export const startServer = async () => {
    try {
        await ConnectDB();
        app.listen(ENV_VARIABLES.PORT, () => {
            console.log(`Server running on port ${ENV_VARIABLES.PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

startServer();