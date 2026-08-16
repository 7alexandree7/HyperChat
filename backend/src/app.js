import express from "express";
import { ENV_VARIABLES } from "./config/ENV_VARIABLES.js";

const app = express();

app.listen(ENV_VARIABLES.PORT, () => {
    console.log(`Server running on port ${ENV_VARIABLES.PORT}`);
});