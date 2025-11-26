import React from 'react';

export default function EmptyState({ title = 'No items', subtitle = '', icon }) {
    return (
        <div className="text-center py-12">
            <div className="mx-auto w-40 h-40 rounded-xl bg-white/70 flex items-center justify-center mb-4 shadow-md">
                {icon ? icon : <svg width="40" height="40" viewBox="0 0 24 24" className="text-slate-400"><path d="M12 2L2 7v7c0 5 10 9 10 9s10-4 10-9V7L12 2z" fill="currentColor" /></svg>}
            </div>
            <h3 className="text-lg font-semibold text-slate-700">{title}</h3>
            {subtitle && <p className="text-slate-500 mt-2 max-w-xl mx-auto">{subtitle}</p>}
        </div>
    );
}

