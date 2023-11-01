import mongoose from 'mongoose';

export interface LikedBookable extends mongoose.Document {
    user: mongoose.Types.ObjectId;
    bookable: mongoose.Types.ObjectId;
    createdAt: Date;
}

const likedBookableSchema = new mongoose.Schema<LikedBookable>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
        },
        bookable: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bookable', // Reference to the Bookable model
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<LikedBookable>('LikedBookable', likedBookableSchema);
