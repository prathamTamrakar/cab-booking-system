import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Settings, CreditCard, HelpCircle, ChevronRight, History, Edit3 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import Loader from '../components/Loader';
import api from '../api/axios';

const ProfilePage = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [rideCount, setRideCount] = useState(null);

    useEffect(() => {
        api.get('/rides/history')
            .then(res => setRideCount(Array.isArray(res.data) ? res.data.length : 0))
            .catch(() => setRideCount(0));
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) return null;

    const memberYear = user.createdAt ? new Date(user.createdAt).getFullYear() : new Date().getFullYear();

    return (
        <div className="bg-slate-50 min-h-[calc(100vh-64px)] py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">My Profile</h1>

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
                    <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-lg">
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl font-bold text-slate-900">{user.name || 'CabGo User'}</h2>
                            <p className="text-slate-500 mt-1">{user.email}</p>
                            <div className="inline-block mt-3 px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full uppercase tracking-wider">
                                Verified Member
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 px-6 py-4 flex justify-between md:justify-start gap-8 border-t border-slate-100 text-sm">
                        <div>
                            <span className="block text-slate-500">Member since</span>
                            <span className="font-semibold text-slate-900">{memberYear}</span>
                        </div>
                        <div>
                            <span className="block text-slate-500">Total Rides</span>
                            <span className="font-semibold text-slate-900">
                                {rideCount !== null ? rideCount : '...'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid gap-3">
                    <Link to="/history" className="w-full bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:border-blue-200 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                <History size={20} />
                            </div>
                            <span className="font-medium text-slate-700">Ride History</span>
                        </div>
                        <ChevronRight size={20} className="text-slate-400 group-hover:text-blue-500" />
                    </Link>

                    <button className="w-full bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:border-blue-200 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                <Settings size={20} />
                            </div>
                            <span className="font-medium text-slate-700">Account Settings</span>
                        </div>
                        <ChevronRight size={20} className="text-slate-400 group-hover:text-blue-500" />
                    </button>

                    <button className="w-full bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:border-blue-200 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                <CreditCard size={20} />
                            </div>
                            <span className="font-medium text-slate-700">Payment Methods</span>
                        </div>
                        <ChevronRight size={20} className="text-slate-400 group-hover:text-blue-500" />
                    </button>

                    <button className="w-full bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:border-blue-200 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                <HelpCircle size={20} />
                            </div>
                            <span className="font-medium text-slate-700">Help & Support</span>
                        </div>
                        <ChevronRight size={20} className="text-slate-400 group-hover:text-blue-500" />
                    </button>

                    <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="w-full mt-4 !text-red-500 !border-red-200 hover:!bg-red-50"
                    >
                        <LogOut size={18} className="mr-2" /> Log Out
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;
