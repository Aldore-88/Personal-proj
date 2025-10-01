import mongoose from 'mongoose';
import {DB_URI, NODE_ENV} from '../config/env.js';

if(!DB_URI) {
    throw new Error('Please define the MONGODB_URI environemtn variable inside .env.<development/production>.local')
}

const connecToDatabase = async() => {
    try {
        await mongoose.connect(DB_URI) //connect to mongodb through DB_URI key

        console.log(`Connected to database in ${NODE_ENV} mode`);
    } catch(error) {
        console.error('Error connecting to database: ', error);

        process.exit(1)
    }
}

export default connecToDatabase;