import React, { useState, useEffect } from 'react';
import { User, Sparkles, Loader2, FileText } from 'lucide-react';
import { api } from '../services/api';
import EvaluationCard from '../components/EvaluationCard';

// UI System
import { Button } from "../components/UI/Button";
import { GlassCard } from "../components/UI/GlassCard";
import { GlassPanel } from "../components/UI/GlassPanel";

const ApplicantPage = () => {
    const [scenarios, setScenarios] = useState([]);
    const [selectedScenarioId, setSelectedScenarioId] = useState('');
    const [applicantName, setApplicantName] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            const data = await api.getScenarios();
            setScenarios(data);
        };
        load();
    }, []);

    const selectedScenario = scenarios.find(s => String(s.id) === String(selectedScenarioId));

    const handleEvaluate = async () => {
        if (!selectedScenarioId || !answer.trim()) return;

        setLoading(true);
        setResult(null);
        setError(null);

        try {
            const evaluation = await api.evaluateAnswer({
                scenario: `Title: ${selectedScenario.title}\nDescription: ${selectedScenario.description}`,
                answer,
                applicantName,
                scenarioTitle: selectedScenario.title
            });
            setResult(evaluation);
        } catch (e) {
            setError("Failed to evaluate. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-10 animate-fade-in pb-20">

            {/* Header */}
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-blue-gradient">
                    Applicant Portal
                </h1>
                <p className="text-slate-600">
                    Select a challenge, submit your solution, and get instant AI feedback.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">

                {/* LEFT: Submission Form */}
                <div className="lg:col-span-2 space-y-8">
                    <GlassPanel>

                        {/* Section Header */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-bleuDeFrance/20 text-bleuDeFrance rounded-lg">
                                <FileText size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">Submission Details</h2>
                        </div>

                        <div className="space-y-6">

                            {/* Name + Scenario */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="font-semibold text-slate-700 text-sm ml-1">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-3.5 text-slate-400" size={18} />
                                        <input
                                            type="text"
                                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/70 border border-white/60 focus:ring-2 focus:ring-bleuDeFrance/50 outline-none"
                                            placeholder="John Doe"
                                            value={applicantName}
                                            onChange={e => setApplicantName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Scenario Selector */}
                                <div className="space-y-2">
                                    <label className="font-semibold text-slate-700 text-sm ml-1">
                                        Select Challenge
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 rounded-xl bg-white/70 border border-white/60 focus:ring-2 focus:ring-bleuDeFrance/50 outline-none"
                                        value={selectedScenarioId}
                                        onChange={e => {
                                            setSelectedScenarioId(e.target.value);
                                            setResult(null);
                                            setAnswer('');
                                        }}
                                    >
                                        <option value="">-- Choose a Challenge --</option>
                                        {scenarios.map(s => (
                                            <option key={s.id} value={s.id}>{s.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Answer Box */}
                            <div className="space-y-2">
                                <label className="font-semibold text-slate-700 text-sm ml-1">Your Solution</label>

                                <textarea
                                    disabled={!selectedScenarioId}
                                    rows={10}
                                    className="w-full px-5 py-4 rounded-xl bg-white/70 border border-white/60 focus:ring-2 focus:ring-bleuDeFrance/40 outline-none disabled:bg-slate-100 disabled:cursor-not-allowed"
                                    placeholder={selectedScenarioId ? "Write your solution…" : "Select a scenario first."}
                                    value={answer}
                                    onChange={e => setAnswer(e.target.value)}
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <GlassCard className="text-red-600 border-red-200 bg-red-50/60">
                                    {error}
                                </GlassCard>
                            )}

                            {/* Submit Button */}
                            <Button
                                variant="primary"
                                disabled={loading || !selectedScenarioId || !answer.trim()}
                                onClick={handleEvaluate}
                                className="w-full justify-center"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" />
                                        Evaluating…
                                    </>
                                ) : (
                                    <>
                                        Evaluate with AI <Sparkles size={20} />
                                    </>
                                )}
                            </Button>
                        </div>
                    </GlassPanel>
                </div>

                {/* RIGHT: Scenario & Result */}
                <div className="space-y-8">

                    {/* Scenario Card */}
                    <GlassCard className="border-l-4 border-l-bleuDeFrance">
                        <h3 className="text-lg font-bold mb-3 text-slate-800 flex items-center gap-2">
                            Challenge Context
                        </h3>

                        {selectedScenario ? (
                            <div className="space-y-4">
                                <h4 className="font-semibold text-bleuDeFrance">{selectedScenario.title}</h4>
                                <p className="text-slate-600 text-sm">{selectedScenario.description}</p>

                                {selectedScenario.skills && (
                                    <div className="flex flex-wrap gap-2">
                                        {selectedScenario.skills.split(',').map((skill, i) => (
                                            <span key={i} className="px-2 py-1 bg-white/80 border border-slate-200 text-xs rounded-md">
                                                {skill.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="text-slate-400 text-center py-8 text-sm">
                                Select a scenario to view details
                            </p>
                        )}
                    </GlassCard>

                    {/* Evaluation Result */}
                    {result && (
                        <div className="animate-slide-up">
                            <EvaluationCard evaluation={result} expanded />
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ApplicantPage;
