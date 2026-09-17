/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { StageExplorer } from './components/StageExplorer';
import { BoothSimulator } from './components/BoothSimulator';
import { TimelineView } from './components/TimelineView';
import { JargonBuster } from './components/JargonBuster';
import { VoterQuiz } from './components/VoterQuiz';
import { VoterPlan } from './components/VoterPlan';
import { VoterPledgeCard } from './components/VoterPledgeCard';
import { ElectionCountdownBanner } from './components/ElectionCountdownBanner';
import { AICivicAssistant } from './components/AICivicAssistant';
import { VoterLevel } from './types';
import { 
  Shield, 
  CheckCircle2, 
  Phone, 
  Sparkles, 
  Compass, 
  Vote, 
  Clock, 
  BookOpen, 
  Award, 
  CheckSquare,
  ShieldCheck
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('stages');
  const [voterLevel, setVoterLevel] = useState<VoterLevel>('first_time');
  const [aiInitialQuery, setAiInitialQuery] = useState<string>('');
  const [aiStageContext, setAiStageContext] = useState<string>('');

  const handleAskAI = (contextOrQuery: string, customQuery?: string) => {
    setAiStageContext(contextOrQuery);
    setAiInitialQuery(customQuery || `Explain more about ${contextOrQuery} in simple terms.`);
    setActiveTab('ai-assistant');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Sticky Civic Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        voterLevel={voterLevel}
        setVoterLevel={setVoterLevel}
      />

      {/* Main Content Area */}
      <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Live Election Countdown Ticker Banner */}
        <ElectionCountdownBanner />

        {/* Quick Highlights Civic Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div 
            onClick={() => setActiveTab('stages')}
            className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors cursor-pointer flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 font-bold text-xs">
              05
            </div>
            <div className="truncate">
              <span className="text-[11px] text-slate-500 font-medium block">Complete Flow</span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 truncate block">
                5 Election Stages
              </span>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('simulator')}
            className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-emerald-300 transition-colors cursor-pointer flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs">
              04
            </div>
            <div className="truncate">
              <span className="text-[11px] text-slate-500 font-medium block">Inside the Booth</span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 truncate block">
                4-Station Protocol
              </span>
            </div>
          </div>

          <div 
            onClick={() => setActiveTab('pledge')}
            className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-indigo-300 transition-colors cursor-pointer flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div className="truncate">
              <span className="text-[11px] text-slate-500 font-medium block">Constitutional Right</span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 truncate block">
                Voter Pledge & Rights
              </span>
            </div>
          </div>

          <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div className="truncate">
              <span className="text-[11px] text-slate-500 font-medium block">Citizen Helpline</span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 truncate block">
                Toll-Free 1950
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Views */}
        {activeTab === 'stages' && (
          <StageExplorer
            voterLevel={voterLevel}
            onAskAI={handleAskAI}
            onJumpToSimulator={() => setActiveTab('simulator')}
          />
        )}

        {activeTab === 'simulator' && <BoothSimulator />}

        {activeTab === 'timeline' && <TimelineView />}

        {activeTab === 'pledge' && <VoterPledgeCard />}

        {activeTab === 'jargon' && <JargonBuster onAskAI={handleAskAI} />}

        {activeTab === 'quiz' && <VoterQuiz />}

        {activeTab === 'plan' && <VoterPlan />}

        {activeTab === 'ai-assistant' && (
          <AICivicAssistant
            voterLevel={voterLevel}
            initialQuery={aiInitialQuery}
            stageContext={aiStageContext}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-12 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                CP
              </div>
              <div>
                <span className="font-bold text-sm font-heading block text-white">
                  CivicPulse Election Awareness Platform
                </span>
                <span className="text-[11px] text-slate-400 block">
                  Educating, empowering, and demystifying democratic elections for every citizen.
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <button
                onClick={() => setActiveTab('stages')}
                className="hover:text-white transition-colors"
              >
                Stages
              </button>
              <button
                onClick={() => setActiveTab('simulator')}
                className="hover:text-white transition-colors"
              >
                Booth Simulator
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className="hover:text-white transition-colors"
              >
                Timelines
              </button>
              <button
                onClick={() => setActiveTab('pledge')}
                className="hover:text-white transition-colors"
              >
                Pledge & Rights
              </button>
              <button
                onClick={() => setActiveTab('jargon')}
                className="hover:text-white transition-colors"
              >
                Jargon Buster
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className="hover:text-white transition-colors"
              >
                Readiness Quiz
              </button>
              <button
                onClick={() => setActiveTab('plan')}
                className="hover:text-white transition-colors"
              >
                Plan My Vote
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <p>
              Strictly non-partisan public interest educational tool. Not affiliated with any political candidate or party.
            </p>
            <p className="flex items-center gap-1.5">
              <span>National Voter Helpline:</span>
              <span className="text-emerald-400 font-mono font-bold">1950</span>
              <span>• Available nationwide</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
