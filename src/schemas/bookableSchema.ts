import mongoose, { Document } from 'mongoose';

export interface Bookable extends Document {
    name: string;
    description: string;
    images: string[];
    address: string;
    longitude: number;
    latitude: number;
}

const bookableSchema = new mongoose.Schema<Bookable>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    }
});

export default mongoose.model<Bookable>('Bookable', bookableSchema);
