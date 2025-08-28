require("dotenv").config()
const express = require("express");
const cors = require("cors");
const db = require("./src/db/db")

const app = express()

app.use(cors())
app.use(express.json())
db();


app.get("/", (req, res)=>{
    res.send("Hello world")
})

app.listen(3000, ()=> console.log("Server is running on http//localhost:3000"))