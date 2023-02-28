import express from "express";
import connectToDB from "./config/db.js"

// initializing the app
const app = express();

// Connect to the database 
connectToDB();

// allows the server to accept json data
app.use(express.json({ extended: false }));

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));