//function that connects app to MongoDB through a thirdpart library 'Mongoose'. Allows me to work with the data.
 
import mongoose from 'mongoose';

//Async operation since "connect" takes a while
const connectDB = async () => {
    try {
        //if no global variable exists- my local database is used
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/wordledb',{
        });
        console.log('Connected to mongoDB');
    } catch (err) {
        console.error('MongoDB-error', err.message);
        process.exit(1); //Exits the program to avoid running the server without database
    }
};

export default connectDB;