import mongoose from 'mongoose';

//parameters for each bit of data
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, 'User Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please fill a vaild email address'],
    },
    password: {
        type: String,
        required: [true, 'User Password is required'],
        trim: true,
        minLength: 6,
    }
}, {timestamps: true});

const User = mongoose.model(name: 'User', userSchema);

export default User;


//{name: 'John Doe', email: 'johndoe@email.cpm', password: 'password'}