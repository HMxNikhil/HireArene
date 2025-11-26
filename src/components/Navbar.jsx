import React from 'react';
import { Briefcase, User, BarChart2, Layout } from 'lucide-react';

const Navbar = ({ currentPath, navigate }) => {
    const navItems = [
        { path: '/recruiter', label: 'Recruiter', icon: Briefcase },
        { path: '/applicant', label: 'Applicant', icon: User },
        { path: '/dashboard', label: 'Dashboard', icon: BarChart2 },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/60 backdrop-blur-xl border-b border-white/40 shadow-md">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">

                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-bleuDeFrance/20 text-bleuDeFrance">
                            <Layout size={22} />
                        </div>
                        <span className="text-xl font-bold text-slate-800 tracking-tight">
                            HireArena
                        </span>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-2 p-1 bg-white/50 backdrop-blur-lg rounded-xl border border-white/60 shadow-sm">
                        {navItems.map((item) => {
                            const isActive = currentPath === item.path;
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.path}
                                    onClick={() => navigate(item.path)}
                                    className={`
                                        flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold 
                                        transition-all duration-300
                                        ${isActive
                                            ? 'bg-white text-bleuDeFrance shadow-md border border-white/80'
                                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/50'
                                        }
                                    `}
                                >
                                    <Icon size={16} />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
