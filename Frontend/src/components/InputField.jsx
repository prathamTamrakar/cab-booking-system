import React from 'react';

const InputField = ({
    label,
    icon: Icon,
    error,
    className = '',
    ...props
}) => {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label className="text-sm font-medium text-slate-700">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Icon size={18} />
                    </div>
                )}
                <input
                    className={`
            w-full rounded-lg border bg-white px-4 py-2.5 text-slate-900 
            placeholder-slate-400 transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 hover:border-slate-300'}
            ${props.disabled ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : ''}
          `}
                    {...props}
                />
            </div>
            {error && (
                <span className="text-xs text-red-500 mt-0.5">{error}</span>
            )}
        </div>
    );
};

export default InputField;
