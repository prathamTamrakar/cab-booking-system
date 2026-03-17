import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MapComponent from '../components/MapComponent';
import api from '../api/axios';
import { MapPin, Navigation, Phone } from 'lucide-react';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const RideTrackingPage = () => {
    const { id } = useParams();
    const [ride, setRide] = useState(null);
    const [driverLocation, setDriverLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrackingInfo = async () => {
            try {
                const response = await api.get(`/rides/tracking/${id}`);
                setRide(response.data.ride);
                setDriverLocation(response.data.driverLocation);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching tracking info:", err);
                setLoading(false);
            }
        };

        fetchTrackingInfo();

        // Polling driver location every 5 seconds (simulating real-time)
        const interval = setInterval(fetchTrackingInfo, 5000);
        return () => clearInterval(interval);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
                <Loader message="Loading ride tracking..." />
            </div>
        );
    }

    if (!ride) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
                <ErrorMessage message="Ride not found. It may have been completed or removed." />
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-[calc(100vh-64px)] flex flex-col pt-4 pb-8">
            <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 flex-1 flex flex-col gap-6">

                {/* Header Information */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold border-l-4 border-emerald-500 pl-3">On Route to Pickup</h1>
                        <p className="text-slate-500 text-sm mt-1 pl-4">ETA: 4 mins • {ride.distance} km total</p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{ride.type}</div>
                        <div className="text-2xl font-bold mt-1">₹{ride.price}</div>
                    </div>
                </div>

                {/* Map Area */}
                <div className="bg-slate-200 rounded-2xl h-[400px] w-full relative overflow-hidden shadow-sm border border-slate-200 z-0 flex-shrink-0">
                    <MapComponent
                        pickupLatLng={ride.pickupLat ? [ride.pickupLat, ride.pickupLng] : null}
                        dropoffLatLng={ride.dropoffLat ? [ride.dropoffLat, ride.dropoffLng] : null}
                        driverLatLng={driverLocation ? [driverLocation.lat, driverLocation.lng] : null}
                    />
                </div>

                {/* Driver Details & Actions */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Driver Card */}
                    <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
                            <span className="text-2xl font-bold text-blue-600">
                                {ride.driverId ? ride.driverId.name.charAt(0) : 'D'}
                            </span>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-900">{ride.driverId ? ride.driverId.name : 'Assigning Driver...'}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-semibold text-slate-600 border border-slate-200">
                                    {ride.driverId ? ride.driverId.vehicleNumber : 'PENDING'}
                                </span>
                                <span className="text-sm text-yellow-500 flex items-center">
                                    ★ 4.8
                                </span>
                            </div>
                        </div>
                        <button className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-200 transition-colors">
                            <Phone size={20} />
                        </button>
                    </div>

                    {/* Trip Summary */}
                    <div className="flex flex-col justify-center gap-3 text-sm text-slate-700 font-medium">
                        <div className="flex items-center gap-3">
                            <Navigation size={16} className="text-blue-500 flex-shrink-0" />
                            <span className="line-clamp-1">{ride.pickup}</span>
                        </div>
                        <div className="w-0.5 h-3 bg-slate-200 ml-2"></div>
                        <div className="flex items-center gap-3">
                            <MapPin size={16} className="text-red-500 flex-shrink-0" />
                            <span className="line-clamp-1">{ride.dropoff}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RideTrackingPage;
