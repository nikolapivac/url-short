import express from "express";
import validUrl from "valid-url";
import shortid from "shortid";
import c from "config";
const router = express.Router();
import Url from "../models/URL.js";

// POST request to  /api/url/shorten
// Creates a short URL
router.post('/shorten', async (req, res) => {
    // extract the longUrl from the request
    const { longUrl } = req.body;
    const baseUrl = c.get('baseUrl');

    // checking if the baseUrl is invalid
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json("Invalid base url");
    }

    //create url code
    const urlCode = shortid.generate();

    // make sure longUrl is valid
    if(validUrl.isUri(longUrl)){
        // check if the longUrl is already in the db
        try {
            let url = await Url.findOne({longUrl});

            if(url){
                res.json(url);
            } else {
                // if longUrl isn't in the db, make a short one for it
                const shortUrl = baseUrl + '/' + urlCode;
                // save the new url to the db
                url = Url({
                    longUrl, 
                    shortUrl,
                    urlCode,
                    date: new Date()
                });
                await url.save();

                res.json(url);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json("Server error");
        }
    } else {
        res.status(401).json("Invalid long url");
    }
})

export default router;