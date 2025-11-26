import React from "react";

export const Button = ({
    children,
    variant = "primary",
    className = "",
    ...props
}) => {
    const base =
        "px-6 py-3.5 rounded-2xl font-semibold flex items-center gap-2 transition-all duration-300";

    const variants = {
        primary:
            "bg-gradient-to-r from-[#2F80E4] to-[#6DA0E1] text-white shadow-lg shadow-blue-500/30 hover:brightness-110 hover:scale-[1.03] active:scale-[0.97]",
        secondary:
            "bg-white/60 backdrop-blur-xl border border-white/40 text-slate-700 shadow-sm hover:bg-white/80",
        soft:
            "bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-sm",
        danger:
            "bg-red-500 text-white hover:bg-red-600 shadow-md",
    };

    return (
        <button className={`${base} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};
