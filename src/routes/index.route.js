const express = require('express');
const router = express.Router();

const openAI = require('./open-ai.route');

router.use('/openAI', openAI);

module.exports = router;