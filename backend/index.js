require('dotenv').config()
const express = require("express");
const connectDB = require('./db/db');

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT;

connectDB();

app.get("/", (req, res)=>{
    res.send("Heyy from backend")
})

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})