import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ShieldCheck, 
  Users, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  UserCheck, 
  MapPin, 
  FileText, 
  BellRing, 
  ClipboardCheck, 
  ShieldAlert, 
  Scale, 
  BadgeDollarSign, 
  VolumeX, 
  Footprints, 
  Printer, 
  Lock, 
  Calculator, 
  FileSearch, 
  Trophy 
} from 'lucide-react';
import { ELECTION_STAGES } from '../data/electionData';
import { VoterLevel, ElectionStage } from '../types';

interface StageExplorerProps {
  voterLevel: VoterLevel;
  onAskAI: (stageName: string, customQuery?: string) => void;
  onJumpToSimulator: () => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  UserCheck,
  MapPin,
  FileText,
  BellRing,
  ClipboardCheck,
  ShieldAlert,
  Sparkles,
  Scale,
  BadgeDollarSign,
  VolumeX,
  CheckCircle2,
  Footprints,
  Printer,
  Lock,
  ShieldCheck,
  Calculator,
  FileSearch,
  Trophy,
};

export const StageExplorer: React.FC<StageExplorerProps> = ({
  voterLevel,
  onAskAI,
  onJumpToSimulator,
}) => {
  const [selectedStageIndex, setSelectedStageIndex] = useState(0);
  const stage = ELECTION_STAGES[selectedStageIndex];

  return (
    <div className="space-y-6">
      {/* Introduction Hero Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-700/50">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Democracy in Motion: Complete 5-Stage Journey
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight mb-3">
            How an Election Actually Works, Step by Step
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            An election is not merely a single voting day—it is a meticulously protected multi-month democratic system designed to prevent voter disenfranchisement, guarantee ballot secrecy, and ensure peaceful transfers of power.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-200">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>5 Sequential Stages</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Multi-Party Oversight</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-200">
              <Users className="w-4 h-4 text-amber-400" />
              <span>
                {voterLevel === 'first_time' ? 'Tailored for First-Time Voters' : voterLevel === 'everyday' ? 'Everyday Citizen Overview' : 'Detailed Statutory Safeguards'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stage Stepper Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 p-2 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {ELECTION_STAGES.map((s, idx) => {
            const isSelected = idx === selectedStageIndex;
            return (
              <button
                key={s.id}
                id={`stage-tab-${s.number}`}
                onClick={() => setSelectedStageIndex(idx)}
                className={`flex flex-col items-start p-3 rounded-lg text-left transition-all duration-200 relative ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/60'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    Stage {s.number}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  )}
                </div>
                <h3
                  className={`text-xs font-bold font-heading line-clamp-1 ${
                    isSelected ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {s.title.split('&')[0]}
                </h3>
                <span
                  className={`text-[11px] mt-0.5 ${
                    isSelected ? 'text-blue-100' : 'text-slate-500'
                  }`}
                >
                  {s.timeframe}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Detailed Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stage.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          {/* Stage Header Banner */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-50 via-blue-50/40 to-slate-50 border-b border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-blue-600 text-white font-bold text-xs rounded-full">
                    {stage.badge}
                  </span>
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Timeline: {stage.timeframe}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
                  {stage.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
                  {stage.summary}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  id={`ask-ai-stage-${stage.number}`}
                  onClick={() => onAskAI(stage.title)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  Ask AI About Stage {stage.number}
                </button>
                {stage.number === 4 && (
                  <button
                    id="jump-to-simulator-btn"
                    onClick={onJumpToSimulator}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    Open Polling Booth Simulator
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Key Actors Pill Row */}
            <div className="mt-5 pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500 font-semibold flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                Key Officials & Participants:
              </span>
              {stage.keyActors.map((actor, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white text-slate-700 border border-slate-200 font-medium"
                >
                  {actor}
                </span>
              ))}
            </div>
          </div>

          {/* Core Body Grid */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* 1. Official Procedures */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                Official Procedures Carried Out
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stage.procedures.map((proc, idx) => {
                  const IconComponent = ICON_MAP[proc.iconName] || FileText;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h5 className="text-sm font-bold text-slate-900 mb-1.5">
                        {proc.title}
                      </h5>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {proc.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Voter Checklist & Myth Buster Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Voter Responsibilities */}
              <div className="p-5 rounded-xl bg-emerald-50/50 border border-emerald-200/80">
                <div className="flex items-center gap-2 mb-3 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Your Responsibilities as a Voter at this Stage
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  {stage.voterResponsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                        ✓
                      </span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Myth vs Fact */}
              <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-200/80">
                <div className="flex items-center gap-2 mb-3 text-amber-900 font-bold text-sm">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Common Myth Debunked
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-white/90 rounded-lg border border-amber-200 text-red-700 font-medium">
                    <span className="font-bold text-red-800">Myth: </span>
                    "{stage.mythVsFact.myth}"
                  </div>
                  <div className="p-2.5 bg-white/90 rounded-lg border border-emerald-200 text-emerald-800 font-medium">
                    <span className="font-bold text-emerald-900">Truth: </span>
                    {stage.mythVsFact.fact}
                  </div>
                  <p className="text-[11px] text-slate-600 italic pt-1">
                    <span className="font-semibold text-slate-700">Why it matters: </span>
                    {stage.mythVsFact.whyItMatters}
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Integrity & Transparency Safeguards */}
            <div className="p-5 rounded-xl bg-slate-900 text-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  Institutional Integrity & Anti-Fraud Safeguards
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Fairness Guarantee
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                {stage.integrityMeasures.map((measure, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/80"
                  >
                    <span className="text-blue-400 font-bold mr-1">#{idx + 1}</span>
                    {measure}
                  </div>
                ))}
              </div>
            </div>

            {/* Persona Guidance Note */}
            {voterLevel === 'first_time' && (
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold">
                  🌱
                </div>
                <div>
                  <h5 className="font-bold text-blue-950 mb-0.5">First-Timer Tip for Stage {stage.number}</h5>
                  <p className="text-blue-800 leading-relaxed">
                    Don't worry if bureaucratic terms sound intimidating! What matters most to you right now is confirming that your name is on the electoral roll. If your name is on the list, you have the full constitutional power to vote with any approved photo ID.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
