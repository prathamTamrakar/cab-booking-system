import React from 'react';
import { User, Clock } from 'lucide-react';

const RideCard = ({
    type,
    image,
    rating,
    time,
    price,
    isSelected,
    onSelect
}) => {
    return (
        <div
            onClick={onSelect}
            className={`
        relative p-4 rounded-xl cursor-pointer transition-all duration-200 border-2
        ${isSelected
                    ? 'border-blue-600 bg-blue-50/50 shadow-md transform scale-[1.02]'
                    : 'border-slate-100 bg-white hover:border-blue-200 hover:shadow-sm'}
      `}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-12 relative flex items-center justify-center bg-slate-100 rounded-lg">
                        {/* Fallback dummy icon if image not provided */}
                        {image ? (
                            <img src={image} alt={type} className="w-full h-full object-contain mix-blend-multiply" />
                        ) : (
                            <span className="text-xl font-bold text-slate-400 text-center w-full">{type[0]}</span>
                        )}
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                            {type}
                            <div className="flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                                <User size={12} />
                                <span>4</span>
                            </div>
                        </h4>
                        <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                            <span className="flex items-center gap-1">
                                <Clock size={14} className="text-emerald-500" />
                                {time} min away
                            </span>
                            <span className="flex items-center gap-1 text-xs opacity-80">
                                ★ {rating}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-lg font-bold text-slate-900">₹{price}</div>
                    <div className="text-xs text-slate-400 line-through">₹{Math.round(price * 1.2)}</div>
                </div>
            </div>

            {isSelected && (
                <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-1 border-2 border-white">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            )}
        </div>
    );
};

export default RideCard;
