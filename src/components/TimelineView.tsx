import React, { useState } from 'react';
import { Clock, Calendar, CheckCircle2, AlertCircle, ShieldAlert, Sparkles, Filter } from 'lucide-react';
import { TIMELINE_MILESTONES } from '../data/electionData';
import { TimelineMilestone } from '../types';

export const TimelineView: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<string>('ALL');

  const phases = ['ALL', 'Announcement', 'Nomination', 'Scrutiny', 'Campaign', 'Silence', 'Voting', 'Counting'];

  const filteredMilestones = selectedPhase === 'ALL'
    ? TIMELINE_MILESTONES
    : TIMELINE_MILESTONES.filter((m) => m.phase === selectedPhase);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200 mb-2">
            <Clock className="w-3.5 h-3.5" />
            Election Calendar & Legal Deadlines
          </div>
          <h2 className="text-2xl font-bold font-heading text-slate-900">
            Electoral Timelines, Stages & Deadlines
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
            From the statutory notification to the final certificate of victory, democratic elections follow a strict, constitutionally enforced timeline. Learn what happens at each milestone and what deadlines citizens must not miss.
          </p>
        </div>

        {/* Phase Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar shrink-0">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {phases.map((ph) => (
            <button
              key={ph}
              id={`filter-phase-${ph.toLowerCase()}`}
              onClick={() => setSelectedPhase(ph)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedPhase === ph
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {ph}
            </button>
          ))}
        </div>
      </div>

      {/* Critical Highlight: 48-Hour Silence & Polling Day */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-white border border-amber-300 text-slate-900 shadow-xs">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            Crucial Milestone: The 48-Hour Campaign Silence
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            All political rallies, loud music broadcasts, and partisan television ads must stop 48 hours before polling closes. This ensures voters have two peaceful, unbiased days to reflect without peer or media pressure.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-white border border-blue-300 text-slate-900 shadow-xs">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-sm mb-1.5">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Polling Day (T - 0): The 6:00 PM Rule
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            If you are in line inside the polling station perimeter at the official closing hour (usually 6:00 PM), <strong className="text-blue-900">you ARE legally entitled to vote!</strong> The Presiding Officer will issue numbered slips to everyone in queue.
          </p>
        </div>
      </div>

      {/* Vertical Timeline Card List */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
          {filteredMilestones.map((milestone, idx) => {
            const isImportant = milestone.isCrucial;
            return (
              <div key={idx} className="relative group">
                {/* Timeline Circle Marker */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full border-4 transition-transform group-hover:scale-110 flex items-center justify-center ${
                    isImportant
                      ? 'bg-blue-600 border-blue-100 ring-2 ring-blue-500/40'
                      : 'bg-white border-slate-300'
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      isImportant ? 'bg-white' : 'bg-slate-500'
                    }`}
                  ></div>
                </div>

                {/* Content Box */}
                <div
                  className={`p-5 rounded-xl border transition-all ${
                    isImportant
                      ? 'bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-white border-blue-200 shadow-xs'
                      : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-900 text-white">
                        {milestone.dayOffset}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                          milestone.phase === 'Voting'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : milestone.phase === 'Silence'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {milestone.phase}
                      </span>
                    </div>

                    {isImportant && (
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Critical Action
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold font-heading text-slate-900 mb-1">
                    {milestone.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {milestone.description}
                  </p>

                  {/* Voter Task Banner */}
                  <div className="p-3 rounded-lg bg-white border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-800">
                    <span className="font-bold text-blue-700 shrink-0">Your Role:</span>
                    <span>{milestone.voterTask}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
