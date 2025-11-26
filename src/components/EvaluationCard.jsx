import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, AlertCircle, User } from 'lucide-react';

const EvaluationCard = ({ evaluation, expanded: defaultExpanded = false }) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    const scoreColor =
        evaluation.score >= 80 ? 'text-green-600 bg-green-50 border-green-200' :
            evaluation.score >= 50 ? 'text-amber-600 bg-amber-50 border-amber-200' :
                'text-red-600 bg-red-50 border-red-200';

    const ringColor =
        evaluation.score >= 80 ? 'stroke-green-500' :
            evaluation.score >= 50 ? 'stroke-amber-500' :
                'stroke-red-500';

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300">
            <div
                onClick={() => setExpanded(!expanded)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                            <circle
                                cx="28" cy="28" r="24"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="transparent"
                                strokeDasharray={150}
                                strokeDashoffset={150 - (150 * evaluation.score) / 100}
                                className={ringColor}
                            />
                        </svg>
                        <span className={`absolute text-sm font-bold ${scoreColor.split(' ')[0]}`}>{evaluation.score}</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-lg">{evaluation.scenarioTitle}</h4>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <User size={14} /> {evaluation.applicantName}
                            <span className="text-slate-300">•</span>
                            <span>{new Date(evaluation.timestamp).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
                <button className="text-slate-400">
                    {expanded ? <ChevronUp /> : <ChevronDown />}
                </button>
            </div>

            {expanded && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/50">
                    <div className="mb-4">
                        <h5 className="font-semibold text-slate-900 mb-1">AI Summary</h5>
                        <p className="text-slate-700 text-sm leading-relaxed bg-white p-3 rounded border border-slate-200">
                            {evaluation.summary}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                        <div>
                            <h5 className="font-semibold text-green-700 flex items-center gap-2 mb-2">
                                <CheckCircle2 size={16} /> Strengths
                            </h5>
                            <ul className="list-disc list-inside text-sm text-slate-700 space-y-1 bg-white p-3 rounded border border-green-100">
                                {evaluation.strengths.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-semibold text-amber-700 flex items-center gap-2 mb-2">
                                <AlertCircle size={16} /> Areas for Improvement
                            </h5>
                            <ul className="list-disc list-inside text-sm text-slate-700 space-y-1 bg-white p-3 rounded border border-amber-100">
                                {evaluation.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h5 className="font-semibold text-slate-900 mb-2">Skill Breakdown</h5>
                        <div className="space-y-2 bg-white p-3 rounded border border-slate-200">
                            {evaluation.skillBreakdown && Object.entries(evaluation.skillBreakdown).map(([skill, score]) => (
                                <div key={skill} className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-slate-600 w-32 truncate">{skill}</span>
                                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-500 rounded-full"
                                            style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-bold text-slate-700 w-8 text-right">{score}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EvaluationCard;
