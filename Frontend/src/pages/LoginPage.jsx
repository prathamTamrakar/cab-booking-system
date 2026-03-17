import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            setError('Please fill in all fields.');
            return;
        }
        setIsLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/login', form);
            login(response.data.user, response.data.token);
            setSuccess(true);
            setTimeout(() => navigate('/'), 1200);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-blue-400 opacity-15 blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full bg-indigo-400 opacity-15 blur-3xl"></div>

            <div className="max-w-md w-full relative z-10">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-500/30">
                            <Car size={32} />
                        </div>
                        <span className="font-bold text-3xl tracking-tight text-slate-900">CabGo</span>
                    </Link>
                    <h2 className="text-3xl font-extrabold text-slate-900">Welcome back</h2>
                    <p className="mt-2 text-sm text-slate-600">Enter your credentials to access your account</p>
                </div>

                <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-100 sm:px-10">
                    {success ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Login Successful!</h3>
                            <p className="text-slate-500">Redirecting to homepage...</p>
                        </div>
                    ) : (
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {error && (
                                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
                                    {error}
                                </div>
                            )}

                            <InputField
                                label="Email Address"
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                icon={Mail}
                                value={form.email}
                                onChange={handleChange}
                                required
                            />

                            <InputField
                                label="Password"
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                icon={Lock}
                                value={form.password}
                                onChange={handleChange}
                                required
                            />

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input id="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded" />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">Remember me</label>
                                </div>
                                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>
                            </div>

                            <Button type="submit" className="w-full mt-2" size="lg" isLoading={isLoading}>
                                Log in <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </form>
                    )}
                </div>

                <div className="mt-8 text-center text-sm text-slate-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                        Create one now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
