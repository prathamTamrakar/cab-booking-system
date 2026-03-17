import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const RideHistoryPage = () => {
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get('/rides/history');
                setRides(response.data);
            } catch (err) {
                console.error("Failed to load history:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
                <Loader message="Loading your rides..." />
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-[calc(100vh-64px)] py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">Your Rides</h1>

                {rides.length === 0 ? (
                    <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-100 text-center">
                        <h2 className="text-lg font-bold text-slate-900 mb-2">No rides found</h2>
                        <p className="text-slate-500 mb-6">Looks like you haven't booked any rides yet.</p>
                        <Link to="/book" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-xl transition-colors">
                            Book a Ride
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {rides.map(ride => (
                            <div key={ride._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Calendar size={14} className="text-slate-400" />
                                            <span className="text-sm font-medium text-slate-700">{ride.date}</span>
                                            <span className="text-slate-300">•</span>
                                            <Clock size={14} className="text-slate-400" />
                                            <span className="text-sm text-slate-600">{ride.time}</span>
                                        </div>
                                        <div className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded mt-1 uppercase tracking-wider">
                                            {ride.status}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-slate-900">₹{ride.price}</div>
                                        <div className="text-xs text-slate-500">{ride.type}</div>
                                    </div>
                                </div>

                                <div className="space-y-3 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
                                    <div className="flex items-start gap-4 z-10 relative">
                                        <div className="mt-1 w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-500 flex-shrink-0"></div>
                                        <div className="text-sm font-medium text-slate-900 line-clamp-1">{ride.pickup}</div>
                                    </div>
                                    <div className="flex items-start gap-4 z-10 relative">
                                        <div className="mt-1 w-4 h-4 rounded-full bg-red-100 border-2 border-red-500 flex-shrink-0"></div>
                                        <div className="text-sm font-medium text-slate-900 line-clamp-1">{ride.dropoff}</div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-sm font-bold">
                                            {ride.driverId ? ride.driverId.name.charAt(0) : 'D'}
                                        </div>
                                        <span className="text-sm text-slate-700 font-medium">
                                            {ride.driverId ? ride.driverId.name : 'Unknown Driver'}
                                        </span>
                                    </div>
                                    <Link to={`/tracking/${ride._id}`} className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700">
                                        View Details <ChevronRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RideHistoryPage;
