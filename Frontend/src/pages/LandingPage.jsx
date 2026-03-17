import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Clock, MapPin, ChevronRight, Star } from 'lucide-react';
import Button from '../components/Button';

const LandingPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
                {/* Background blobs for modern feel */}
                <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-indigo-100 blur-3xl opacity-50" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                        {/* Left content */}
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                Available in 50+ Cities
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                                Book Your Ride in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Seconds</span>
                            </h1>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                Experience seamless travel with our modern cab booking system. Fast pickups, verified drivers, and transparent pricing—all at your fingertips.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/book">
                                    <Button size="lg" className="w-full sm:w-auto min-w-[160px] gap-2">
                                        Book Now <ChevronRight size={20} />
                                    </Button>
                                </Link>
                                <div className="flex items-center gap-2 pl-4">
                                    <div className="flex -space-x-3">
                                        <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" alt="User" />
                                        <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bob" alt="User" />
                                        <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie" alt="User" />
                                    </div>
                                    <div className="text-sm">
                                        <div className="flex text-yellow-500">
                                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                                        </div>
                                        <span className="font-medium text-slate-700">4.9/5 from 10k+ reviews</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right illustration */}
                        <div className="relative lg:h-[500px] flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-full blur-3xl opacity-60"></div>
                            {/* Dummy Cab Illustration using HTML/CSS */}
                            <div className="relative w-full max-w-sm aspect-square bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 transform rotate-2 hover:rotate-0 transition-all duration-500 p-6 flex flex-col justify-between">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                        <MapPin size={24} />
                                    </div>
                                    <div className="bg-emerald-100 text-emerald-700 font-semibold px-3 py-1 rounded-full text-sm">
                                        Arriving in 3 min
                                    </div>
                                </div>

                                <div className="relative mb-8 flex-1 flex items-center justify-center">
                                    {/* Abstract Taxi representation */}
                                    <div className="w-48 h-24 bg-yellow-400 rounded-t-2xl rounded-b-lg relative shadow-lg">
                                        {/* Taxi sign */}
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-slate-900 rounded flex items-center justify-center text-[10px] font-bold text-yellow-400">TAXI</div>
                                        {/* Windows */}
                                        <div className="absolute top-2 left-2 right-2 h-10 bg-slate-800 rounded-lg flex gap-2 p-1">
                                            <div className="flex-1 bg-slate-700 rounded opacity-50"></div>
                                            <div className="flex-1 bg-slate-700 rounded opacity-50"></div>
                                        </div>
                                        {/* Wheels */}
                                        <div className="absolute -bottom-3 left-4 w-8 h-8 rounded-full bg-slate-800 border-4 border-slate-900 shadow"></div>
                                        <div className="absolute -bottom-3 right-4 w-8 h-8 rounded-full bg-slate-800 border-4 border-slate-900 shadow"></div>
                                    </div>
                                </div>

                                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <div className="flex gap-3 items-center text-sm text-slate-600">
                                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                        Current Location
                                    </div>
                                    <div className="w-0.5 h-4 bg-slate-200 ml-1"></div>
                                    <div className="flex gap-3 items-center text-sm font-medium text-slate-900">
                                        <div className="w-2 h-2 rounded-full bg-slate-900"></div>
                                        Business Park
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose CabGo?</h2>
                        <p className="text-slate-600">We prioritize your comfort, safety, and time. Enjoy a premium ride experience at affordable prices.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-md transition-shadow duration-300">
                            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                                <Clock size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Lightning Fast</h3>
                            <p className="text-slate-600 leading-relaxed">Average pickup time under 5 minutes. Real-time driver tracking ensures you never have to wait.</p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-md transition-shadow duration-300 transform md:-translate-y-4">
                            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                                <Shield size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Safe & Secure</h3>
                            <p className="text-slate-600 leading-relaxed">Verified drivers, SOS button, and trip sharing. Your safety is our absolute priority on every ride.</p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-md transition-shadow duration-300">
                            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                                <Star size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Premium Comfort</h3>
                            <p className="text-slate-600 leading-relaxed">Well-maintained fleet from minis to SUVs. Clean interiors and polite drivers guaranteed.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
