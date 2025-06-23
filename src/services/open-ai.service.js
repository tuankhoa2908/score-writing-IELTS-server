const asyncHandler = require('express-async-handler');
const common = require('../helpers/respone-service');
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

module.exports = {
    scoreWritingIELTS: asyncHandler(async (data, done) => {
        const { question, answer, imageBase64 } = data;
        const infoPrompt = JSON.parse(data.infoPrompt);

        const systemMessage = infoPrompt?.system_message || "";
        const instructionDir = path.join(__dirname, "..", "instructions-api");
        const fileName = `${infoPrompt.name_prompt}-instruction`;
        const filePath = path.join(instructionDir, fileName);

        // Tạo thư mục nếu chưa có
        if (!fs.existsSync(instructionDir)) {
            fs.mkdirSync(instructionDir, { recursive: true });
        }

        // Xóa file cũ nếu tồn tại
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Ghi file mới
        fs.writeFileSync(filePath, systemMessage, 'utf8');

        data.systemMessageFile = filePath;

        const response = await openAI.responses.create({
            model: infoPrompt.model,
            instructions: systemMessage,
            input: [
                {
                    role: "system",
                    content:
                        "You are a strict IELTS examiner. You must evaluate a writing task using official IELTS Writing Band Descriptors. Your output should include: a score (0-9) and a brief explanation for each of the 4 criteria: Task Response, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy.",
                },
                {
                    role: "user",
                    content: [
                        {
                            type: "input_image",
                            image_url: imageBase64,
                            detail: "auto",
                        },
                        {
                            type: "input_text",
                            text: `The image above is the writing task (question). Below is the candidate's answer:\n\n${answer}`,
                        },
                    ],
                },
            ],

            // text.format: infoPrompt.text_format || 'text',
            temperature: infoPrompt.temperature || 1,
            //max_tokens: infoPrompt.max_tokens || 1024,
            top_p: infoPrompt.top_p || 1,
            logprobs: infoPrompt.store_logs ? undefined : null,
        });

        console.log(response);

        return common.returnSuccess(200, response, "OKE");
    }),
};
