import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Share2, 
  Copy, 
  Check, 
  Printer, 
  Volume2, 
  VolumeX, 
  Lock, 
  Clock, 
  Briefcase, 
  HeartHandshake, 
  AlertTriangle, 
  ShieldAlert,
  QrCode
} from 'lucide-react';
import { STATUTORY_RIGHTS } from '../data/electionData';
import { StatutoryRight, VoterPledge } from '../types';
import { playSuccessChime, speakCivicText, stopCivicSpeech } from '../utils/audio';

const RIGHT_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Clock,
  Briefcase,
  Lock,
  ShieldAlert,
  HeartHandshake,
  AlertTriangle,
};

export const VoterPledgeCard: React.FC = () => {
  const [voterName, setVoterName] = useState<string>('Alex Rivera');
  const [constituency, setConstituency] = useState<string>('Ward 14 - Metro Central');
  const [motivation, setMotivation] = useState<string>('Protecting public education, infrastructure & climate resilience');
  const [pledgeAccepted, setPledgeAccepted] = useState<boolean>(true);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeRightId, setActiveRightId] = useState<string>('queue-rule');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const pledgeToken = 'CP-2026-CITIZEN-9418';

  const handleSignPledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voterName.trim()) return;

    setIsGenerated(true);
    playSuccessChime(true);

    // Celebratory Confetti Burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#10B981', '#F59E0B', '#6366F1'],
      });
    } catch (err) {
      // Ignore
    }
  };

  const handleCopyCard = () => {
    const text = `DEMOCRATIC CITIZEN PLEDGE CREDENTIAL
Certified Voter: ${voterName}
Constituency: ${constituency}
Credential Token: ${pledgeToken}
Pledge: "I solemnly pledge to cast my vote freely, fearlessly, and without bias on Election Day."
Verified by CivicPulse Platform | Helpline 1950`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleListenRight = (right: StatutoryRight) => {
    if (isSpeaking) {
      stopCivicSpeech();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `${right.title}. Legal Provision: ${right.legalProvision}. Summary: ${right.shortSummary}. Practical Action: ${right.practicalAction}`;
    setIsSpeaking(true);
    speakCivicText(textToRead, () => setIsSpeaking(false));
  };

  const activeRight = STATUTORY_RIGHTS.find((r) => r.id === activeRightId) || STATUTORY_RIGHTS[0];
  const IconCmp = RIGHT_ICONS[activeRight.icon] || ShieldCheck;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200 mb-2">
            <Award className="w-3.5 h-3.5" />
            Citizen Empowerment & Constitutional Rights
          </div>
          <h2 className="text-2xl font-bold font-heading text-slate-900">
            Democratic Voter Pledge & Digital Credential
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
            A healthy democracy thrives when every citizen makes a conscious commitment to participate. Sign the non-partisan voter pledge, obtain your shareable civic credential, and master your 6 statutory voter rights.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            id="print-pledge-btn"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print Card
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Pledge Form & Generated Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Sign Form */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold font-heading text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Take the Sovereign Democratic Pledge
            </h3>

            <form onSubmit={handleSignPledge} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Full Name:</label>
                  <input
                    id="pledge-voter-name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={voterName}
                    onChange={(e) => setVoterName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Constituency / City:</label>
                  <input
                    id="pledge-constituency"
                    type="text"
                    placeholder="e.g. Ward 14 - Metro Central"
                    value={constituency}
                    onChange={(e) => setConstituency(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">What Drives You To Vote?</label>
                <select
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <option value="Protecting public education, infrastructure & climate resilience">
                    Protecting public education, infrastructure & climate resilience
                  </option>
                  <option value="Holding elected leaders accountable for public expenditure">
                    Holding elected leaders accountable for public expenditure
                  </option>
                  <option value="Securing democratic rights, equality and civil liberties">
                    Securing democratic rights, equality and civil liberties
                  </option>
                  <option value="Inspiring my children, youth and community to participate">
                    Inspiring my children, youth and community to participate
                  </option>
                </select>
              </div>

              {/* Solemn Oath Box */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/90 text-blue-950 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="pledge-checkbox"
                  checked={pledgeAccepted}
                  onChange={(e) => setPledgeAccepted(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="pledge-checkbox" className="text-xs leading-relaxed cursor-pointer">
                  <strong>The Solemn Democratic Oath: </strong>
                  "We, the citizens of a free democracy, having abiding faith in constitutional values, hereby pledge to uphold the democratic traditions of our nation and the dignity of free, fair and peaceful elections, and to vote in every election fearlessly and without being influenced by considerations of religion, race, caste, community, or any inducement."
                </label>
              </div>

              <button
                type="submit"
                id="generate-badge-btn"
                disabled={!pledgeAccepted || !voterName.trim()}
                className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all ${
                  pledgeAccepted && voterName.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-blue-500/20'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Award className="w-4 h-4" />
                Sign Pledge & Issue Verified Citizen Credential
              </button>
            </form>
          </div>

          {/* Generated Digital Voter Credential Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-7 text-white border border-slate-700 shadow-xl relative overflow-hidden space-y-5">
            {/* Shimmering Holographic Ribbon Top */}
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-emerald-400 to-blue-500 rounded-full"></div>

            {/* Card Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md text-sm border border-blue-400/40">
                  CP
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 block">
                    CIVICPULSE NATIONAL REGISTRY
                  </span>
                  <h4 className="text-base font-bold font-heading text-white">
                    Verified Democratic Citizen Badge
                  </h4>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                OFFICIALLY PLEDGED
              </span>
            </div>

            {/* Card Body */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-8 space-y-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Citizen Name</span>
                  <span className="text-lg font-bold font-heading text-white tracking-tight">
                    {voterName || 'Registered Citizen'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Constituency</span>
                    <span className="text-slate-200 font-medium">{constituency || 'General Ward'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Voter Token</span>
                    <span className="font-mono text-blue-300 font-bold">{pledgeToken}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Civic Commitment</span>
                  <p className="text-[11px] text-slate-300 italic line-clamp-2">
                    "{motivation}"
                  </p>
                </div>
              </div>

              {/* QR Code & Security Stamp */}
              <div className="sm:col-span-4 flex flex-col items-center justify-center p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                <QrCode className="w-16 h-16 text-blue-400 mb-1" />
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                  SECRECY VERIFIED
                </span>
                <span className="text-[8px] text-slate-500">Conduct of Elections</span>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">
                Valid for all upcoming municipal, state & parliamentary polls.
              </span>

              <button
                id="copy-card-credential"
                onClick={handleCopyCard}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Credential Copied!' : 'Copy Credential'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: 6 Non-Negotiable Statutory Rights (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Legal Shield
                </span>
                <h3 className="text-base font-bold font-heading text-slate-900 mt-1">
                  6 Non-Negotiable Statutory Rights
                </h3>
              </div>

              <button
                id="listen-current-right-btn"
                onClick={() => handleListenRight(activeRight)}
                className={`p-2 rounded-xl text-xs flex items-center gap-1 font-semibold border transition-colors ${
                  isSpeaking
                    ? 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
                }`}
                title={isSpeaking ? 'Stop audio' : 'Listen to this right in audio'}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4 text-amber-600" /> : <Volume2 className="w-4 h-4 text-blue-600" />}
                <span className="text-[11px]">{isSpeaking ? 'Pause' : 'Listen'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Every voter in a democracy is protected by explicit criminal and electoral laws. Click each right below to read its statutory safeguard:
            </p>

            {/* Interactive Pill Grid */}
            <div className="grid grid-cols-2 gap-2">
              {STATUTORY_RIGHTS.map((r) => {
                const isSelected = r.id === activeRightId;
                const Icon = RIGHT_ICONS[r.icon] || ShieldCheck;
                return (
                  <button
                    key={r.id}
                    id={`right-pill-${r.id}`}
                    onClick={() => {
                      setActiveRightId(r.id);
                      if (isSpeaking) {
                        stopCivicSpeech();
                        setIsSpeaking(false);
                      }
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs font-semibold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                    <span className="truncate">{r.title.split(' ')[0]} {r.title.split(' ')[1]}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Right Spotlight Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  {activeRight.legalProvision}
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">
                  {activeRight.category}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 font-heading">
                {activeRight.title}
              </h4>

              <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 text-xs text-slate-800">
                <span className="font-bold text-slate-900 block mb-0.5">The Statutory Guarantee:</span>
                <p className="text-slate-600 leading-relaxed">{activeRight.shortSummary}</p>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                <span className="font-bold text-emerald-900 block mb-0.5">What Happens If Violated:</span>
                <p className="text-emerald-800 leading-relaxed">{activeRight.practicalAction}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
