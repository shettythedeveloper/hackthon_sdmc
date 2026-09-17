import React from 'react';
import { Vote, Sparkles, Shield, Compass, BookOpen, Clock, Award, CheckSquare, MessageSquare } from 'lucide-react';
import { VoterLevel } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  voterLevel: VoterLevel;
  setVoterLevel: (level: VoterLevel) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  voterLevel,
  setVoterLevel,
}) => {
  const tabs = [
    { id: 'stages', label: 'Stages & Lifecycle', icon: Compass },
    { id: 'simulator', label: 'Booth Simulator', icon: Vote },
    { id: 'timeline', label: 'Timelines & Deadlines', icon: Clock },
    { id: 'jargon', label: 'Jargon Buster', icon: BookOpen },
    { id: 'quiz', label: 'Civic Quiz', icon: Award },
    { id: 'plan', label: 'Plan My Vote', icon: CheckSquare },
    { id: 'ai-assistant', label: 'AI Civic Guide', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Banner */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium text-[11px] border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Democratic Awareness Initiative
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline text-slate-300">
              Non-partisan civic education platform for free, fair, and informed voting
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-[11px]">Helpline:</span>
            <span className="font-mono text-emerald-300 font-semibold bg-slate-800 px-2 py-0.5 rounded text-[11px] border border-slate-700">
              1950 (Voter Toll-Free)
            </span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Logo & Identity */}
          <div className="flex items-center justify-between">
            <div 
              id="brand-logo" 
              onClick={() => setActiveTab('stages')}
              className="cursor-pointer flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
                <Vote className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-bold font-heading text-slate-900 tracking-tight leading-none">
                    CivicPulse
                  </h1>
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
                    Election Navigator
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Understand Every Stage • Practice Booth Procedures • Exercise Your Rights
                </p>
              </div>
            </div>

            {/* Mobile Level Pill */}
            <div className="lg:hidden flex items-center">
              <select
                id="mobile-voter-level-selector"
                value={voterLevel}
                onChange={(e) => setVoterLevel(e.target.value as VoterLevel)}
                className="text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="first_time">👶 First-Time Voter</option>
                <option value="everyday">⚡ Everyday Citizen</option>
                <option value="deep_dive">🔍 Deep Dive Scholar</option>
              </select>
            </div>
          </div>

          {/* Persona / Knowledge Level Selector (Desktop) */}
          <div className="hidden lg:flex items-center gap-2.5 bg-slate-100/90 p-1.5 rounded-xl border border-slate-200/90 text-xs">
            <span className="px-2 text-slate-500 font-medium flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              Viewing as:
            </span>
            <button
              id="level-first-time"
              onClick={() => setVoterLevel('first_time')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-150 ${
                voterLevel === 'first_time'
                  ? 'bg-white text-blue-700 font-semibold shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              🌱 First-Time Voter
            </button>
            <button
              id="level-everyday"
              onClick={() => setVoterLevel('everyday')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-150 ${
                voterLevel === 'everyday'
                  ? 'bg-white text-blue-700 font-semibold shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              ⚡ Everyday Citizen
            </button>
            <button
              id="level-deep-dive"
              onClick={() => setVoterLevel('deep_dive')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-150 ${
                voterLevel === 'deep_dive'
                  ? 'bg-white text-blue-700 font-semibold shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              📜 Deep Dive & Laws
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 no-scrollbar border-t border-slate-100 mt-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs shadow-blue-500/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
