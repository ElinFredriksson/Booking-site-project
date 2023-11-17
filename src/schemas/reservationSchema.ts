import mongoose, { Document } from 'mongoose';

export interface Reservation extends Document {
    bookable_id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    date: Date;
    time: String;
    attendees: String;
    created_at: Date;
    catering: Boolean;
    total_price: number;
    status: 'pending' | 'confirmed' | 'cancelled';
}

const reservationSchema = new mongoose.Schema<Reservation>({
    bookable_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bookable',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    attendees: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    catering: {
        type: Boolean,
        default: false
    },
    total_price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }
});

export default mongoose.model<Reservation>('Reservation', reservationSchema);
