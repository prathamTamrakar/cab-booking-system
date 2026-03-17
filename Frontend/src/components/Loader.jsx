import React from 'react';

const Loader = ({ message = 'Loading...', size = 'md' }) => {
    const sizes = {
        sm: 'h-5 w-5 border-2',
        md: 'h-8 w-8 border-[3px]',
        lg: 'h-12 w-12 border-4',
    };

    return (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className={`${sizes[size]} border-slate-200 border-t-blue-600 rounded-full animate-spin`}></div>
            {message && <p className="text-sm text-slate-500 font-medium animate-pulse">{message}</p>}
        </div>
    );
};

export default Loader;
