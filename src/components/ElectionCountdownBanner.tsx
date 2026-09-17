import React, { useState, useEffect } from 'react';
import { Clock, Calendar, AlertCircle, ShieldAlert, Sparkles, ChevronRight, Volume2, Bell } from 'lucide-react';
import { ELECTION_COUNTDOWN_EVENTS } from '../data/electionData';

export const ElectionCountdownBanner: React.FC = () => {
  const [selectedEventId, setSelectedEventId] = useState<string>('general');
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 37, hours: 5, minutes: 57, seconds: 31 });

  const activeEvent = ELECTION_COUNTDOWN_EVENTS.find((e) => e.id === selectedEventId) || ELECTION_COUNTDOWN_EVENTS[0];

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(activeEvent.targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [activeEvent]);

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-800 text-white shadow-lg relative overflow-hidden">
      {/* Background Subtle Accent Glow */}
      <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute left-1/3 -top-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Event Selection & Meta */}
        <div className="space-y-2 max-w-xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-[11px] border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Election Ticker
            </span>

            {/* Event Dropdown / Pill Switcher */}
            <div className="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/80">
              {ELECTION_COUNTDOWN_EVENTS.map((ev) => (
                <button
                  key={ev.id}
                  id={`countdown-event-${ev.id}`}
                  onClick={() => setSelectedEventId(ev.id)}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                    selectedEventId === ev.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {ev.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-bold font-heading text-white tracking-tight">
            {activeEvent.name}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {activeEvent.description}. Target Polling Date:{' '}
            <strong className="text-amber-300">
              {new Date(activeEvent.targetDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </strong>
          </p>
        </div>

        {/* Right: Live Ticking Counter Flippers */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Days */}
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-2.5 sm:p-3 text-center min-w-[62px] sm:min-w-[72px] shadow-inner">
            <span className="font-mono text-xl sm:text-2xl font-black text-white block tracking-tight">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Days
            </span>
          </div>

          <span className="font-mono font-bold text-slate-600 text-lg sm:text-xl">:</span>

          {/* Hours */}
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-2.5 sm:p-3 text-center min-w-[62px] sm:min-w-[72px] shadow-inner">
            <span className="font-mono text-xl sm:text-2xl font-black text-white block tracking-tight">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Hours
            </span>
          </div>

          <span className="font-mono font-bold text-slate-600 text-lg sm:text-xl">:</span>

          {/* Minutes */}
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-2.5 sm:p-3 text-center min-w-[62px] sm:min-w-[72px] shadow-inner">
            <span className="font-mono text-xl sm:text-2xl font-black text-white block tracking-tight">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Mins
            </span>
          </div>

          <span className="font-mono font-bold text-slate-600 text-lg sm:text-xl">:</span>

          {/* Seconds */}
          <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-2.5 sm:p-3 text-center min-w-[62px] sm:min-w-[72px] shadow-inner">
            <span className="font-mono text-xl sm:text-2xl font-black text-blue-400 block tracking-tight">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Secs
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Mini Milestone Alert */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Bell className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            <strong className="text-slate-200">Current Phase:</strong> {activeEvent.phase} — Ensure your name is on the electoral roll {activeEvent.rollCloseDays} days before polling!
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-blue-300 font-semibold shrink-0">
          <span>Campaign Silence begins {activeEvent.silenceHours}h before polls</span>
        </div>
      </div>
    </div>
  );
};
