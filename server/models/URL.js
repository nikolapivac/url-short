import mongoose from "mongoose";

// creating a schema for the URL model
const urlSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    date: {
        type: String,
        default: Date.now
    }
});

// creating a model based on the schema
const url = mongoose.model("Url", urlSchema);

export default url;