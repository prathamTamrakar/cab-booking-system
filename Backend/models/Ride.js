import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pickup: {
        type: String,
        required: true
    },
    pickupLat: { type: Number },
    pickupLng: { type: Number },
    dropoff: {
        type: String,
        required: true
    },
    dropoffLat: { type: Number },
    dropoffLng: { type: Number },
    distance: { type: Number }, // in km
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        default: null
    },
    type: {
        type: String,
        enum: ['Mini', 'Sedan', 'SUV'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Confirmed'
    },
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Ride = mongoose.model('Ride', rideSchema);
export default Ride;
