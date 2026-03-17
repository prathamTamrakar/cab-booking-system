import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                                <Car size={24} />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-white">CabGo</span>
                        </Link>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            Book your ride in seconds. Fast, reliable, and comfortable cab services across the city.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/book" className="hover:text-white transition-colors">Book a Ride</Link></li>
                            <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
                            <li><Link to="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Services</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/book" className="hover:text-white transition-colors">City Rides</Link></li>
                            <li><span className="text-slate-500 cursor-default">Airport Transfer</span></li>
                            <li><span className="text-slate-500 cursor-default">Car Rentals</span></li>
                            <li><span className="text-slate-500 cursor-default">Corporate</span></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Legal</h3>
                        <ul className="space-y-3 text-sm">
                            <li><span className="text-slate-500 cursor-default">Terms of Service</span></li>
                            <li><span className="text-slate-500 cursor-default">Privacy Policy</span></li>
                            <li><span className="text-slate-500 cursor-default">Cookie Policy</span></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} CabGo Technologies. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-full text-xs">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            All systems operational
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
