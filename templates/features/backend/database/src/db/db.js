const mongoose = require("mongoose")

const db = ()=>{
    mongoose.connect(process.env.MongoDB_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
}

module.exports = db; 