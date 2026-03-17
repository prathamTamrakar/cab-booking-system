import express from 'express';
import Ride from '../models/Ride.js';
import Driver from '../models/Driver.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Haversine formula to calculate distance between two coordinates in km
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};

// Estimate fare
router.get('/estimate', (req, res) => {
    const { pickupLat, pickupLng, dropoffLat, dropoffLng } = req.query;

    if (!pickupLat || !pickupLng || !dropoffLat || !dropoffLng) {
        return res.status(400).json({ message: 'Pickup and dropoff coordinates required' });
    }

    const distance = calculateDistance(
        parseFloat(pickupLat), parseFloat(pickupLng),
        parseFloat(dropoffLat), parseFloat(dropoffLng)
    );

    // Dynamic pricing based on distance
    const basePrices = { Mini: 50, Sedan: 80, SUV: 120 };
    const perKmRate = { Mini: 12, Sedan: 15, SUV: 20 };

    const estimates = [
        { id: 'mini', type: 'Mini', rating: 4.8, time: Math.ceil(distance * 3), price: Math.round(basePrices.Mini + (distance * perKmRate.Mini)), distance: distance.toFixed(1) },
        { id: 'sedan', type: 'Sedan', rating: 4.9, time: Math.ceil(distance * 3), price: Math.round(basePrices.Sedan + (distance * perKmRate.Sedan)), distance: distance.toFixed(1) },
        { id: 'suv', type: 'SUV', rating: 4.7, time: Math.ceil(distance * 3), price: Math.round(basePrices.SUV + (distance * perKmRate.SUV)), distance: distance.toFixed(1) }
    ];

    res.status(200).json(estimates);
});

// Book a ride
router.post('/book', verifyToken, async (req, res) => {
    try {
        const { pickup, pickupLat, pickupLng, dropoff, dropoffLat, dropoffLng, type, price, distance } = req.body;

        if (!pickup || !dropoff || !type || !price) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Optional: find an available driver (dummy logic, just create a new one for tracking sim)
        const driver = new Driver({
            name: 'John Doe',
            vehicleType: type,
            vehicleNumber: 'MH 01 AB 1234',
            currentLocation: { lat: parseFloat(pickupLat) + 0.01, lng: parseFloat(pickupLng) + 0.01, heading: 0 },
            isAvailable: false
        });
        await driver.save();

        const ride = new Ride({
            userId: req.user.id,
            pickup, pickupLat, pickupLng,
            dropoff, dropoffLat, dropoffLng,
            distance,
            type,
            price,
            driverId: driver._id,
            status: 'Confirmed'
        });

        await ride.save();

        res.status(201).json({
            message: 'Ride booked successfully',
            ride
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get user rides
router.get('/history', verifyToken, async (req, res) => {
    try {
        const rides = await Ride.find({ userId: req.user.id })
            .populate('driverId')
            .sort({ createdAt: -1 });
        res.status(200).json(rides);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get tracking info
router.get('/tracking/:id', verifyToken, async (req, res) => {
    try {
        const ride = await Ride.findById(req.params.id).populate('driverId');
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }
        res.status(200).json({
            ride,
            driverLocation: ride.driverId ? ride.driverId.currentLocation : null
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
