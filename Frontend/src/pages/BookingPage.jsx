import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation, Calendar, Clock, CreditCard, Shield, Info } from 'lucide-react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import RideCard from '../components/RideCard';
import ConfirmModal from '../components/ConfirmModal';
import LocationAutocomplete from '../components/LocationAutocomplete';
import MapComponent from '../components/MapComponent';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import api from '../api/axios';

const DEFAULT_RIDES = [
    { id: 'mini', type: 'Mini', image: '', rating: 4.8, time: 3, price: 0 },
    { id: 'sedan', type: 'Sedan', image: '', rating: 4.9, time: 5, price: 0 },
    { id: 'suv', type: 'SUV', image: '', rating: 4.7, time: 8, price: 0 },
];

const BookingPage = () => {
    const navigate = useNavigate();
    const [pickup, setPickup] = useState({ address: '', lat: null, lng: null });
    const [dropoff, setDropoff] = useState({ address: '', lat: null, lng: null });
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [selectedRideId, setSelectedRideId] = useState('mini');
    const [isBooking, setIsBooking] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [bookedRideId, setBookedRideId] = useState(null);
    const [bookedDriver, setBookedDriver] = useState(null);

    const [ridesAvailable, setRidesAvailable] = useState(DEFAULT_RIDES);
    const [estimateLoading, setEstimateLoading] = useState(false);
    const [estimateError, setEstimateError] = useState('');

    const isFormValid = pickup.address.trim() !== '' && dropoff.address.trim() !== '' && pickup.lat && dropoff.lat;

    // Fetch estimates when both locations are selected
    useEffect(() => {
        if (!isFormValid) return;

        setEstimateLoading(true);
        setEstimateError('');
        api.get(`/rides/estimate?pickupLat=${pickup.lat}&pickupLng=${pickup.lng}&dropoffLat=${dropoff.lat}&dropoffLng=${dropoff.lng}`)
            .then(res => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setRidesAvailable(res.data);
                }
            })
            .catch(() => setEstimateError('Failed to fetch fare estimates. Please try again.'))
            .finally(() => setEstimateLoading(false));
    }, [pickup.lat, pickup.lng, dropoff.lat, dropoff.lng]);

    const selectedRide = ridesAvailable.find(r => r.id === selectedRideId) || ridesAvailable[0];

    const handleBookRide = async () => {
        if (!isFormValid || !selectedRide) return;
        setIsBooking(true);

        try {
            const bookingPayload = {
                pickup: pickup.address,
                pickupLat: pickup.lat,
                pickupLng: pickup.lng,
                dropoff: dropoff.address,
                dropoffLat: dropoff.lat,
                dropoffLng: dropoff.lng,
                type: selectedRide.type,
                price: selectedRide.price,
                distance: selectedRide.distance,
                date: date || new Date().toISOString().split('T')[0],
                time: time || new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric" })
            };

            const response = await api.post('/rides/book', bookingPayload);
            setBookedRideId(response.data._id || response.data.id);
            setBookedDriver(response.data.driver || null);
            setShowModal(true);
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        } finally {
            setIsBooking(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-[calc(100vh-64px)] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-12 gap-8">

                    {/* Left Column: Form & Ride Selection */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* Booking Form Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Plan your ride</h2>

                            <div className="space-y-4 relative">
                                <div className="absolute left-[19px] top-10 bottom-10 w-0.5 bg-slate-200 z-0"></div>

                                <div className="relative z-30">
                                    <LocationAutocomplete
                                        label="Pickup Location"
                                        placeholder="Search starting point..."
                                        icon={Navigation}
                                        onSelect={(loc) => setPickup(loc)}
                                    />
                                </div>

                                <div className="relative z-20">
                                    <LocationAutocomplete
                                        label="Dropoff Location"
                                        placeholder="Search destination..."
                                        onSelect={(loc) => setDropoff(loc)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <InputField
                                    type="date"
                                    label="Date"
                                    icon={Calendar}
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                                <InputField
                                    type="time"
                                    label="Time"
                                    icon={Clock}
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Ride Selection */}
                        <div className={`transition-all duration-500 ease-in-out ${isFormValid ? 'opacity-100 translate-y-0' : 'opacity-50 pointer-events-none translate-y-4'}`}>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 px-1">Choose Ride</h3>

                            {estimateLoading && <Loader message="Calculating fares..." size="sm" />}
                            {estimateError && <ErrorMessage message={estimateError} onRetry={() => window.location.reload()} />}

                            {!estimateLoading && !estimateError && (
                                <div className="space-y-3">
                                    {ridesAvailable.map((ride) => (
                                        <RideCard
                                            key={ride.id}
                                            {...ride}
                                            isSelected={selectedRideId === ride.id}
                                            onSelect={() => setSelectedRideId(ride.id)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Right Column: Map & Fare Estimate */}
                    <div className="lg:col-span-8 flex flex-col gap-6">

                        {/* Map */}
                        <div className="bg-slate-200 rounded-2xl h-80 lg:h-[400px] w-full flex-1 relative overflow-hidden border border-slate-200 shadow-sm flex items-center justify-center z-0">
                            <MapComponent
                                pickupLatLng={pickup.lat ? [pickup.lat, pickup.lng] : null}
                                dropoffLatLng={dropoff.lat ? [dropoff.lat, dropoff.lng] : null}
                            />
                        </div>

                        {/* Fare Summary & Booking */}
                        <div className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all duration-300 ${isFormValid ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Fare Breakdown</h3>

                            <div className="space-y-3 text-sm text-slate-600 mb-6 border-b border-slate-100 pb-6">
                                <div className="flex justify-between">
                                    <span>Base Fare ({selectedRide?.type})</span>
                                    <span className="font-medium text-slate-900">₹{selectedRide ? Math.max(0, selectedRide.price - 50) : 0}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Taxes & Fees</span>
                                    <span className="font-medium text-slate-900">₹50</span>
                                </div>
                                {selectedRide?.distance && (
                                    <div className="flex justify-between text-slate-500">
                                        <span>Distance</span>
                                        <span className="font-medium">{selectedRide.distance} km</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center text-emerald-600 bg-emerald-50 p-2 rounded-lg">
                                    <span className="flex items-center gap-1.5"><Shield size={14} /> Insurance covered</span>
                                    <span>Included</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <div className="text-2xl font-bold text-slate-900">₹{selectedRide?.price || 0}</div>
                                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                        <Info size={12} /> Estimate based on current traffic
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                        <CreditCard size={16} className="text-slate-400" /> Cash / Card
                                    </div>
                                </div>
                            </div>

                            <Button
                                size="lg"
                                className="w-full text-lg shadow-lg shadow-blue-500/30"
                                onClick={handleBookRide}
                                isLoading={isBooking}
                                disabled={!isFormValid || isBooking}
                            >
                                {isBooking ? 'Confirming...' : 'Confirm Booking'}
                            </Button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                rideId={bookedRideId}
                driver={bookedDriver}
                rideDetails={{
                    pickup: pickup.address,
                    dropoff: dropoff.address,
                    type: selectedRide?.type,
                    price: selectedRide?.price
                }}
                onTrack={() => {
                    if (bookedRideId) navigate(`/tracking/${bookedRideId}`);
                }}
            />
        </div>
    );
};

export default BookingPage;
