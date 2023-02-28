import mongoose from 'mongoose';
import c from 'config';

// get the URI from the global variable json file
const url = c.get("mongoURI");

const connectToDB = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true
        });

        console.log("Connected to database");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

// export the function for connecting with the database
export default connectToDB;