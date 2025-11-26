import React from 'react';

export default function Skeleton({ className = 'h-4 w-full rounded-md', style }) {
    return (
        <div className={`bg-slate-200/60 dark:bg-slate-700/30 animate-pulse ${className}`} style={style} />
    );
}

