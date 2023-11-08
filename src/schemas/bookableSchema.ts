import mongoose, { Document } from 'mongoose';

export interface Bookable extends Document {
    name: string;
    description: string;
    images: string[];
    address: string;
    longitude: number;
    latitude: number;
    rating: number; // Add rating field
    price: number; // Add price field
    tags: string[]; // Add tags field
    attendees: number; // Add attendees field
    amenities: string[]; // Add amenities field
    location: { //Unique identifyer for location
        address: string;
        parkingDistance: string;
        subwayDistance: string;
        busDistance: string;
    }; // Add location field with subfields
    size: number; // Add size field
    contact_person: {
        name: string;
        email: string;
        phone: string;
    }; // Add contact_person field
    breakoutRooms: boolean; // Add breakoutRooms field
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
    },
    rating: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    attendees: {
        type: Number,
        required: true
    },
    amenities: {
        type: [String],
        required: true
    },
    location: {
        type: {
            address: String,
            parkingDistance: String,
            subwayDistance: String,
            busDistance: String
        },
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    contact_person: {
        type: {
            name: String,
            email: String,
            phone: String
        },
        required: true
    },
    breakoutRooms: {
        type: Boolean,
        required: true
    }
});

export default mongoose.model<Bookable>('Bookable', bookableSchema);
