import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Mail, Lock, User, Phone, ArrowRight, CheckCircle } from 'lucide-react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const SignupPage = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const validate = () => {
        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
            return 'Please fill in all required fields.';
        }
        if (form.password.length < 6) {
            return 'Password must be at least 6 characters.';
        }
        if (form.password !== form.confirmPassword) {
            return 'Passwords do not match.';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }
        setIsLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/signup', {
                name: form.name,
                email: form.email,
                password: form.password,
            });
            login(response.data.user, response.data.token);
            setSuccess(true);
            setTimeout(() => navigate('/'), 1200);
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
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
                    <h2 className="text-3xl font-extrabold text-slate-900">Create an account</h2>
                    <p className="mt-2 text-sm text-slate-600">Join CabGo and book rides in seconds</p>
                </div>

                <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-100 sm:px-10">
                    {success ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Account Created!</h3>
                            <p className="text-slate-500">Redirecting to homepage...</p>
                        </div>
                    ) : (
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {error && (
                                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
                                    {error}
                                </div>
                            )}

                            <InputField
                                label="Full Name"
                                name="name"
                                placeholder="John Doe"
                                icon={User}
                                value={form.name}
                                onChange={handleChange}
                                required
                            />

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
                                label="Phone (optional)"
                                type="tel"
                                name="phone"
                                placeholder="+91 9876543210"
                                icon={Phone}
                                value={form.phone}
                                onChange={handleChange}
                            />

                            <InputField
                                label="Password"
                                type="password"
                                name="password"
                                placeholder="Min. 6 characters"
                                icon={Lock}
                                value={form.password}
                                onChange={handleChange}
                                required
                            />

                            <InputField
                                label="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                placeholder="Re-enter password"
                                icon={Lock}
                                value={form.confirmPassword}
                                onChange={handleChange}
                                required
                            />

                            <Button type="submit" className="w-full mt-2" size="lg" isLoading={isLoading}>
                                Create Account <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </form>
                    )}
                </div>

                <div className="mt-8 text-center text-sm text-slate-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                        Log in instead
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
