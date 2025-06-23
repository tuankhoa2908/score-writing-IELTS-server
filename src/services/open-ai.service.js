const asyncHandler = require('express-async-handler');
const common = require('../helpers/respone-service');

const OpenAI = require('openai');

const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

module.exports = {
    scoreWritingIELTS: asyncHandler(async (data, done) => {
        console.log(data);
        return common.returnSuccess(200, data, "OKE");
    })
}