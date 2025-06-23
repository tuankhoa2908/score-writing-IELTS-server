"use strict";
require('dotenv').config({ path: ".env" });

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: false
}));

const PORT = process.env.port || 8080;

const indexRouter = require('./routes/index.route');

app.use('/api', indexRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
})

