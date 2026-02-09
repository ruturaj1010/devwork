require('dotenv').config()
const express = require("express");

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res)=>{
    res.send("Heyy from backend")
})

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})