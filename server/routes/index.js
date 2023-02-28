import express from "express";
const router = express.Router();
import Url from "../models/URL.js";

// GET request to  /:code
// Redirects to the long/original URL
router.get('/:code', async (req, res) => {
    try {
        // find the URL with the matching code in the db
        const url = await Url.findOne({urlCode: req.params.code});

        // if the url is found, redirect the user to the long URL
        if(url) {
            return res.redirect(url.longUrl);
        }else {
            return res.status(404).json("No url found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
})


export default router;