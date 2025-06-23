const sharp = require('sharp');
const fs = require('fs');

module.exports = {
    processImageToBase64: async (buffer, width = 512, height = 512) => {
        try {
            const resizedBuffer = await sharp(buffer)
                .resize(width, height)
                .jpeg({ quality: 80 }) // or .png()
                .toBuffer();

            return `data:image/jpeg;base64,${resizedBuffer.toString("base64")}`;
        } catch (err) {
            throw new Error("Image processing failed: " + err.message);
        }
    },
    isValidImageMimeType: (mimetype) => {
        return ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif',].includes(mimetype);
    }
}