import mongoose from 'mongoose';

export interface User {
    _id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<User>(
    {
        firstName: {
             type: String, 
             required: true 
        },
        lastName: {
             type: String, 
             required: true 
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<User>('User', userSchema);
