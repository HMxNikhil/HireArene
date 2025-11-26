import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import EvaluationCard from "../components/EvaluationCard";

import { BarChart2, TrendingUp, Users, Award } from "lucide-react";

// UI System
import { GlassPanel } from "../components/UI/GlassPanel";
import { GlassCard } from "../components/UI/GlassCard";
import ParallaxContainer from "../components/ParallaxContainer";
import EmptyState from "../components/EmptyState";
import Skeleton from "../components/Skeleton";

const DashboardPage = () => {
    const [evaluations, setEvaluations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEvaluations();
    }, []);

    const loadEvaluations = async () => {
        setLoading(true);
        const data = await api.getEvaluations();
        setEvaluations(data);
        setLoading(false);
    };

    /* ------------------------ Calculated Stats ------------------------ */
    const totalEvaluations = evaluations.length;

    const avgScore =
        totalEvaluations > 0
            ? Math.round(
                evaluations.reduce((acc, curr) => acc + curr.score, 0) /
                totalEvaluations
            )
            : 0;

    const topScore =
        totalEvaluations > 0
            ? Math.max(...evaluations.map((e) => e.score))
            : 0;

    return (
        <div className="space-y-14 animate-fade-in relative">

            {/* ------------------------ HEADER ------------------------ */}
            <ParallaxContainer strength={0.15}>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-blue-gradient">
                            Analytics Dashboard
                        </h1>
                        <p className="text-slate-600 mt-1">
                            Overview of applicant performance & AI insights.
                        </p>
                    </div>

                    <GlassCard className="px-4 py-2 text-sm font-medium text-slate-700 shadow-md">
                        Last updated: Just now
                    </GlassCard>
                </div>
            </ParallaxContainer>

            {/* ------------------------ STATS GRID ------------------------ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {loading ? (
                    <>
                        <SkeletonStatCard />
                        <SkeletonStatCard />
                        <SkeletonStatCard />
                    </>
                ) : (
                    <>
                        <StatCard
                            title="Total Evaluations"
                            value={totalEvaluations}
                            icon={Users}
                            color="text-bleuDeFrance"
                            bg="bg-bleuDeFrance/10"
                            trend="+12% this week"
                        />
                        <StatCard
                            title="Average Score"
                            value={`${avgScore}%`}
                            icon={TrendingUp}
                            color="text-liberty"
                            bg="bg-liberty/10"
                            trend="Stable"
                        />
                        <StatCard
                            title="Top Performer"
                            value={`${topScore}%`}
                            icon={Award}
                            color="text-purple-600"
                            bg="bg-purple-100"
                            trend="New high"
                        />
                    </>
                )}
            </div>

            {/* ------------------------ RECENT EVALUATIONS ------------------------ */}
            <div className="space-y-8">

                {/* Title */}
                <div className="flex items-center gap-3">
                    <GlassCard className="p-2 shadow-md">
                        <BarChart2 size={20} className="text-slate-700" />
                    </GlassCard>
                    <h2 className="text-xl font-bold text-slate-800">Recent Assessments</h2>
                </div>

                {/* Loading Skeleton */}
                {loading && (
                    <div className="grid gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <GlassCard key={i} className="p-6">
                                <Skeleton className="h-6 w-1/3 mb-4" />
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-4/5 mb-2" />
                                <Skeleton className="h-4 w-3/5" />
                            </GlassCard>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && evaluations.length === 0 && (
                    <EmptyState
                        title="No evaluations yet"
                        subtitle="Once applicants submit responses, their AI analysis will appear here."
                        icon={<BarChart2 size={48} className="text-slate-400" />}
                    />
                )}

                {/* Evaluation List */}
                {!loading && evaluations.length > 0 && (
                    <div className="grid gap-6">
                        {evaluations.map((e, index) => (
                            <div
                                key={e.id}
                                className="animate-slide-up"
                                style={{ animationDelay: `${index * 90}ms` }}
                            >
                                <GlassCard className="p-0 overflow-hidden">
                                    <EvaluationCard evaluation={e} />
                                </GlassCard>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

/* ------------------------ STAT CARD COMPONENT ------------------------ */
const StatCard = ({ title, value, icon: Icon, color, bg, trend }) => (
    <GlassCard className="p-6 group hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
            <div>
                <p className="text-slate-500 text-sm font-medium">{title}</p>
                <h3 className="text-3xl font-bold text-slate-800 mt-1">{value}</h3>
            </div>

            <div
                className={`p-3 rounded-xl ${bg} ${color} group-hover:scale-110 transition-all duration-300`}
            >
                <Icon size={24} />
            </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium">
            <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                {trend}
            </span>
            <span className="text-slate-400">vs last month</span>
        </div>
    </GlassCard>
);

/* ------------------------ SKELETON CARD ------------------------ */
const SkeletonStatCard = () => (
    <GlassCard className="p-6">
        <Skeleton className="h-4 w-1/2 mb-3" />
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-4 w-3/4" />
    </GlassCard>
);

export default DashboardPage;
