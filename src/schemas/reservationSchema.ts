import mongoose, { Document } from 'mongoose';

export interface Reservation extends Document {
    bookable_id: mongoose.Types.ObjectId;
    user_id: mongoose.Types.ObjectId;
    start_date: Date;
    end_date: Date;
    created_at: Date;
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
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
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
