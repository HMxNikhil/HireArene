import React, { useEffect, useState } from 'react';

export default function DarkToggle() {
    const [dark, setDark] = useState(() => {
        const saved = typeof window !== 'undefined' && localStorage.getItem('pref-dark');
        if (saved) return saved === '1';
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark);
        localStorage.setItem('pref-dark', dark ? '1' : '0');
    }, [dark]);

    return (
        <button
            onClick={() => setDark(d => !d)}
            className="px-3 py-1 rounded-lg bg-white/60 dark:bg-slate-800/60 border border-white/30 dark:border-slate-700/50 text-slate-800 dark:text-white shadow-sm"
        >
            {dark ? '🌙 Dark' : '☀️ Light'}
        </button>
    );
}

