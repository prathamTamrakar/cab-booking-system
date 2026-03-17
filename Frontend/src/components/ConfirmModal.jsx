import React from 'react';
import { X, CheckCircle, MapPin, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const ConfirmModal = ({ isOpen, onClose, rideDetails, rideId, driver, onTrack }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleTrack = () => {
        onClose();
        if (onTrack) {
            onTrack();
        } else if (rideId) {
            navigate(`/tracking/${rideId}`);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal panel */}
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md transform transition-all p-6">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center mt-2">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">Booking Confirmed!</h3>
                    <p className="text-slate-500 mb-6">Your captain is on the way.</p>

                    {/* Driver details card */}
                    <div className="w-full bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                                    {driver?.name ? driver.name.charAt(0) : '?'}
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold text-slate-900">{driver?.name || 'Assigning driver...'}</div>
                                    <div className="text-sm text-slate-500 flex items-center gap-1">
                                        <span className="text-yellow-500">★</span> {driver?.rating || '—'}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="bg-slate-200 text-slate-800 font-mono font-bold px-2 py-1 rounded text-sm tracking-wider">
                                    {driver?.vehicleNumber || '—'}
                                </div>
                                <div className="text-xs text-slate-500 mt-1">{rideDetails?.type || 'Mini'}</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 text-left">
                            <div className="mt-1">
                                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                <div className="w-0.5 h-6 bg-slate-200 mx-auto my-1"></div>
                                <div className="w-2 h-2 rounded-full bg-slate-900 mt-1"></div>
                            </div>
                            <div className="text-sm font-medium text-slate-700 flex-1 space-y-4">
                                <div className="truncate">{rideDetails?.pickup || 'Pickup location'}</div>
                                <div className="truncate">{rideDetails?.dropoff || 'Dropoff location'}</div>
                            </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center font-bold">
                            <span>Total Fare</span>
                            <span className="text-lg">₹{rideDetails?.price || '—'}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 w-full">
                        <Button variant="outline" className="flex-1" onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="primary" className="flex-1" onClick={handleTrack}>
                            Track Ride
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
