const asyncHandler = require('express-async-handler');

const {
    scoreWritingIELTS
} = require("../services/open-ai.service");

const { processImageToBase64, isValidImageMimeType } = require("../utils/handle-image");

module.exports = {
    scoreWritingIELTS: asyncHandler(async (req, res) => {
        const body = {}
        console.log(req.body);
        body.question = req.body?.question;
        body.answer = req.body?.answer;
        body.infoPrompt = req.body?.infoPrompt;
        if (req.file) {
            if (!isValidImageMimeType(req.file.mimetype)) {
                return res.status(400).json({ error: "Invalid image format" });
            }

            // 👇 xử lý ảnh trước khi gửi xuống service
            const base64Image = await processImageToBase64(req.file.buffer);
            body.imageBase64 = base64Image;
        }
        const response = await scoreWritingIELTS(body);
        console.log(response);
        res.status(200).json(response);
    })
}