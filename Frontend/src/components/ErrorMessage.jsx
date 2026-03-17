import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message = 'Something went wrong.', onRetry }) => {
    return (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <AlertTriangle size={20} />
            </div>
            <div className="flex-1">
                <h4 className="text-sm font-semibold text-red-800 mb-1">Error</h4>
                <p className="text-sm text-red-600">{message}</p>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-red-700 hover:text-red-800 bg-red-100 hover:bg-red-200 px-3 py-1.5 rounded-lg transition-colors"
                    >
                        <RefreshCw size={14} /> Try Again
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorMessage;
