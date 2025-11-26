import React from "react";

export const GlassPanel = ({ children, className = "" }) => {
    return (
        <div
            className={`
        backdrop-blur-md bg-white/60 
        border border-white/40 shadow-md 
        rounded-2xl p-8 relative 
        overflow-hidden ${className}
      `}
        >
            {children}
        </div>
    );
};
