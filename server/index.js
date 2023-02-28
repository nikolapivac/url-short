import express from "express";
import connectToDB from "./config/db.js"
import indexRoutes from "./routes/index.js"
import urlRoutes from "./routes/url.js"

// initializing the app
const app = express();

// Connect to the database 
connectToDB();

// allows the client to accept requests from localhost:3000
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  

// allows the server to accept json data
app.use(express.json({ extended: false }));

// defining the routes
app.use('/', indexRoutes);
app.use('/api/url', urlRoutes);

// start listening
const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));