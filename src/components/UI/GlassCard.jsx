import React from "react";

export const GlassCard = ({ children, className = "" }) => {
    return (
        <div
            className={`
        backdrop-blur-md bg-white/70 
        border border-white/50 shadow-lg 
        rounded-2xl p-6 transition-all 
        duration-300 hover:shadow-xl 
        ${className}
      `}
        >
            {children}
        </div>
    );
};

