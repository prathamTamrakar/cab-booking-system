import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import axios from 'axios';

const LocationAutocomplete = ({ label, placeholder, icon: Icon, onSelect, initialValue = '' }) => {
    const [query, setQuery] = useState(initialValue);
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const wrapperRef = useRef(null);
    const debounceTimeout = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchLocations = async (text) => {
        if (text.length < 3) {
            setResults([]);
            setIsOpen(false);
            setLoading(false);
            return;
        }

        try {
            // Switched to Photon API (by Komoot)
            // It is built on OpenStreetMap data but optimized specifically for fast autocomplete (search-as-you-type)
            // and does not have the strict CORS/rate-limiting issues that public Nominatim does.
            const res = await axios.get(`https://photon.komoot.io/api/?q=${encodeURIComponent(text)}&limit=8`);

            // Photon returns GeoJSON where the results are in the 'features' array
            if (res.data && res.data.features) {
                setResults(res.data.features);
            } else {
                setResults([]);
            }
            setIsOpen(true);
        } catch (err) {
            console.error("Geocoding error:", err);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const text = e.target.value;
        setQuery(text);

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        if (text.length >= 3) {
            setLoading(true);
            debounceTimeout.current = setTimeout(() => {
                fetchLocations(text);
            }, 600); // 600ms debounce to prevent API spam
        } else {
            setResults([]);
            setIsOpen(false);
            setLoading(false);
        }
    };

    const handleSelect = (feature) => {
        const { properties, geometry } = feature;
        const name = properties.name || '';
        const city = properties.city || properties.state || properties.country || '';
        const displayName = name ? `${name}${city ? `, ${city}` : ''}` : city;

        setQuery(displayName);
        setIsOpen(false);
        onSelect({
            address: displayName,
            lat: geometry.coordinates[1], // Latitude is second in GeoJSON [lng, lat]
            lng: geometry.coordinates[0]  // Longitude is first in GeoJSON [lng, lat]
        });
    };

    return (
        <div ref={wrapperRef} className="relative w-full z-20">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    {Icon ? <Icon size={18} className="text-slate-400" /> : <MapPin size={18} className="text-slate-400" />}
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => { if (results.length > 0) setIsOpen(true); }}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm bg-slate-50 focus:bg-white sm:text-sm"
                    placeholder={placeholder}
                />
                {loading && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></span>
                    </div>
                )}
            </div>

            {isOpen && results.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                    <ul className="py-1">
                        {results.map((feature, index) => {
                            const { properties } = feature;
                            // Basic formatting: show name, city, and state
                            const name = properties.name || '';
                            const city = properties.city || properties.state || properties.country || '';
                            const detail = [properties.street, properties.district, properties.state]
                                .filter(Boolean).join(', ');

                            const primaryText = name || city;
                            let secondaryText = detail;
                            if (!secondaryText && name && city) secondaryText = city;

                            return (
                                <li
                                    key={properties.osm_id || index}
                                    className="px-4 py-2 hover:bg-slate-50 cursor-pointer flex items-start gap-3 border-b border-slate-50 last:border-0"
                                    onClick={() => handleSelect(feature)}
                                >
                                    <MapPin size={16} className="text-slate-400 mt-1 flex-shrink-0" />
                                    <div className="text-sm">
                                        <p className="font-medium text-slate-800 line-clamp-1">{primaryText}</p>
                                        <p className="text-xs text-slate-500 line-clamp-1">{secondaryText || 'Location'}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LocationAutocomplete;
