import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    vehicleType: {
        type: String,
        enum: ['Mini', 'Sedan', 'SUV'],
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 4.8
    },
    currentLocation: {
        lat: Number,
        lng: Number,
        heading: Number
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Driver = mongoose.model('Driver', driverSchema);
export default Driver;
