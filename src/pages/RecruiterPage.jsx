import React, { useState, useEffect } from "react";
import { PlusCircle, Sparkles, Loader2, Save, Trash2 } from "lucide-react";
import { api } from "../services/api";

import { Button } from "../components/UI/Button";
import { GlassCard } from "../components/UI/GlassCard";
import { GlassPanel } from "../components/UI/GlassPanel";
import ParallaxContainer from "../components/ParallaxContainer";
import EmptyState from "../components/EmptyState";
import Skeleton from "../components/Skeleton";

const RecruiterPage = () => {
    const [scenarios, setScenarios] = useState([]);
    const [formData, setFormData] = useState({ title: "", description: "", skills: "" });
    const [loading, setLoading] = useState(false);
    const [loadingScenarios, setLoadingScenarios] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [rolePrompt, setRolePrompt] = useState("");
    const [showGenerator, setShowGenerator] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadScenarios();
    }, []);

    const loadScenarios = async () => {
        setLoadingScenarios(true);
        const data = await api.getScenarios();
        setScenarios(data);
        setLoadingScenarios(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        await api.saveScenario(formData);

        setFormData({ title: "", description: "", skills: "" });
        await loadScenarios();
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (confirm("Delete this scenario?")) {
            await api.deleteScenario(id);
            loadScenarios();
        }
    };

    const handleAiGenerate = async () => {
        if (!rolePrompt.trim()) return;

        setGenerating(true);
        setError(null);

        try {
            const result = await api.generateScenarioContent(rolePrompt);
            setFormData(result);
            setShowGenerator(false);
            setRolePrompt("");
        } catch {
            setError("Failed to generate scenario. Try again.");
        }

        setGenerating(false);
    };

    return (
        <div className="space-y-14 animate-fade-in">

            {/* Parallax Header */}
            <ParallaxContainer strength={0.18}>
                <div className="text-center space-y-2 mb-4">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-blue-gradient">
                        Challenge Creator
                    </h1>
                    <p className="text-slate-600 max-w-xl mx-auto">
                        Build interview challenges manually or let AI generate perfect scenarios.
                    </p>
                </div>
            </ParallaxContainer>

            {/* Creation Panel */}
            <GlassPanel className="relative overflow-hidden">

                {/* Background Blob */}
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-thistle/30 rounded-full blur-3xl opacity-60 pointer-events-none" />

                <div className="relative z-10 space-y-8">

                    {/* Title Row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-bleuDeFrance/10 text-bleuDeFrance rounded-xl">
                                <PlusCircle size={28} />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">New Scenario</h2>
                                <p className="text-slate-500 text-sm">Create manually or use AI assistant</p>
                            </div>
                        </div>

                        <Button
                            variant={showGenerator ? "secondary" : "soft"}
                            onClick={() => setShowGenerator(!showGenerator)}
                        >
                            <Sparkles size={18} />
                            {showGenerator ? "Close AI Assistant" : "Use AI Assistant"}
                        </Button>
                    </div>

                    {/* AI Generator Box */}
                    {showGenerator && (
                        <GlassCard className="p-6 animate-slideUp">
                            <label className="block text-sm font-bold text-purple-900 mb-3">
                                What role are you hiring for?
                            </label>

                            <div className="flex gap-3">
                                <input
                                    className="flex-1 px-5 py-3 bg-white/80 border border-white/60 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
                                    placeholder="e.g. React Developer, Data Analyst..."
                                    value={rolePrompt}
                                    onChange={(e) => setRolePrompt(e.target.value)}
                                />

                                <Button
                                    variant="primary"
                                    disabled={generating || !rolePrompt}
                                    onClick={handleAiGenerate}
                                >
                                    {generating ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                                    Generate
                                </Button>
                            </div>

                            {error && (
                                <GlassCard className="mt-3 bg-red-50/70 border-red-200 text-red-600">
                                    {error}
                                </GlassCard>
                            )}
                        </GlassCard>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>
                                <label className="text-sm font-semibold ml-1 text-slate-700">Scenario Title</label>
                                <input
                                    required
                                    className="w-full px-5 py-3 bg-white/70 border border-white/60 rounded-xl focus:ring-2 focus:ring-bleuDeFrance/50 outline-none"
                                    placeholder="e.g. Async Logic Debugging"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold ml-1 text-slate-700">Expected Skills</label>
                                <input
                                    className="w-full px-5 py-3 bg-white/70 border border-white/60 rounded-xl focus:ring-2 focus:ring-bleuDeFrance/50 outline-none"
                                    placeholder="e.g. React, API calls, Error Handling"
                                    value={formData.skills}
                                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-semibold ml-1 text-slate-700">Problem Description</label>
                            <textarea
                                required
                                rows={4}
                                className="w-full px-5 py-3 bg-white/70 border border-white/60 rounded-xl focus:ring-2 focus:ring-bleuDeFrance/50 outline-none"
                                placeholder="Explain the scenario clearly…"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button variant="primary" disabled={loading}>
                                {loading ? "Saving..." : (<><Save size={18} /> Save Scenario</>)}
                            </Button>
                        </div>
                    </form>
                </div>
            </GlassPanel>

            {/* Existing Scenarios Section */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 ml-2">
                    <div className="h-8 w-1 bg-bleuDeFrance rounded-full" />
                    <h3 className="text-xl font-bold text-slate-800">
                        Active Scenarios ({scenarios.length})
                    </h3>
                </div>

                {/* Skeleton Loading */}
                {loadingScenarios && (
                    <div className="grid gap-6 md:grid-cols-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <GlassCard key={i} className="p-6">
                                <Skeleton className="h-6 w-1/2 mb-4" />
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-2/3" />
                            </GlassCard>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loadingScenarios && scenarios.length === 0 && (
                    <EmptyState
                        title="No scenarios yet"
                        subtitle="Create your first challenge above."
                    />
                )}

                {/* Scenario List */}
                {!loadingScenarios && scenarios.length > 0 && (
                    <div className="grid gap-6 md:grid-cols-2">
                        {scenarios.map((s, i) => (
                            <GlassCard
                                key={s.id}
                                className="p-6 group animate-slideUp"
                                style={{ animationDelay: `${i * 90}ms` }}
                            >
                                <div className="flex justify-between items-start">
                                    <h4 className="text-lg font-bold text-slate-800 pr-10">{s.title}</h4>

                                    <button
                                        onClick={() => handleDelete(s.id)}
                                        className="p-2 bg-red-50 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <p className="text-slate-600 text-sm mt-2 line-clamp-2">
                                    {s.description}
                                </p>

                                {s.skills && (
                                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-200">
                                        {s.skills.split(",").map((skill, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-blue-50/80 text-blue-600 text-xs font-bold rounded-full border border-blue-100"
                                            >
                                                {skill.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </GlassCard>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecruiterPage;
