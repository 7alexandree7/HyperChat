import ImageKit, { toFile } from "@imagekit/nodejs"
import { ENV_VARIABLES } from "../config/ENV_VARIABLES.js";

const imageKit = new ImageKit({
    privateKey: ENV_VARIABLES.IMAGEKIT_PRIVATE_KEY,
})

function hasImageKitConfig() {
    return Boolean(ENV_VARIABLES.IMAGEKIT_PRIVATE_KEY);
}

function createFileName(originalName = "upload") {
    const safeName = originalName.replace(/[^a-zA-Z0-9]/g, "_");
    return `chat-${Date.now()}-${safeName}`;
}


async function uploadChatMedia(file) {
    const fileName = createFileName(file.originalname);

    const result = await imageKit.files.upload({
        file: await toFile(file.buffer, fileName, { type: file.mimetype }),
        fileName,
        folder: "/chat",
    });

    return result.url;
    
}


export {
    hasImageKitConfig,
    uploadChatMedia
}