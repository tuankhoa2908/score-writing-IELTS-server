const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const { openAI } = require("../controllers/index.controller");

router.post("/score-writing-IELTS", upload.single("image"), openAI.scoreWritingIELTS );

module.exports = router;