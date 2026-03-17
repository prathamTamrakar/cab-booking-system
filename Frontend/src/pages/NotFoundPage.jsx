import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';

const NotFoundPage = () => {
    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 px-4">
            <div className="text-center max-w-lg">
                {/* Large 404 */}
                <div className="relative mb-8">
                    <h1 className="text-[160px] font-black text-slate-100 leading-none select-none">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-blue-100 text-blue-600 p-5 rounded-2xl shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                                <line x1="9" y1="9" x2="9.01" y2="9" />
                                <line x1="15" y1="9" x2="15.01" y2="9" />
                            </svg>
                        </div>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 mb-3">Page Not Found</h2>
                <p className="text-slate-500 mb-8 leading-relaxed">
                    Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link to="/">
                        <Button size="lg" className="gap-2 min-w-[160px]">
                            <Home size={18} /> Go Home
                        </Button>
                    </Link>
                    <button onClick={() => window.history.back()}>
                        <Button variant="outline" size="lg" className="gap-2 min-w-[160px]">
                            <ArrowLeft size={18} /> Go Back
                        </Button>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
