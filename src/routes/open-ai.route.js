const express = require('express');
const router = express.Router();

const { openAI } = require("../controllers/index.controller");

router.post("/score-writing-IELTS", openAI.scoreWritingIELTS );

module.exports = router;