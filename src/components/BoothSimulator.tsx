import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Fingerprint, 
  SlidersHorizontal, 
  Vote, 
  ShieldCheck, 
  Volume2, 
  Eye, 
  CheckCircle2, 
  RefreshCw, 
  AlertTriangle, 
  Smartphone, 
  Camera, 
  Check, 
  Info,
  Clock
} from 'lucide-react';
import { POLLING_STATION_STEPS } from '../data/electionData';
import { PollingStationStep } from '../types';

interface Candidate {
  id: number;
  name: string;
  party: string;
  symbol: string;
  symbolName: string;
}

const MOCK_CANDIDATES: Candidate[] = [
  { id: 1, name: 'Dr. Sophia Mercer', party: 'Green Horizon Coalition', symbol: '🌱', symbolName: 'Sprouting Plant' },
  { id: 2, name: 'Marcus Chen, PE', party: 'Civic Progress Alliance', symbol: '⚖️', symbolName: 'Scales of Justice' },
  { id: 3, name: 'Amara Okafor', party: 'People’s Democratic Front', symbol: '☀️', symbolName: 'Rising Sun' },
  { id: 4, name: 'Elena Rostova', party: 'Independent Citizen Action', symbol: '📘', symbolName: 'Open Book' },
  { id: 5, name: 'None of the Above (NOTA)', party: 'Electoral Dissent Option', symbol: '🚫', symbolName: 'NOTA Ballot Symbol' }
];

export const BoothSimulator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isVoted, setIsVoted] = useState<boolean>(false);
  const [isVvpatVisible, setIsVvpatVisible] = useState<boolean>(false);
  const [vvpatTimer, setVvpatTimer] = useState<number>(7);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [hasInkedFinger, setHasInkedFinger] = useState<boolean>(false);
  const [hasVoterSlip, setHasVoterSlip] = useState<boolean>(false);
  const [identityVerified, setIdentityVerified] = useState<boolean>(false);
  const timerRef = useRef<any>(null);

  // Web Audio Confirmation Beep
  const playEvmBeep = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1100, ctx.currentTime); // authentic EVM frequency tone
      gain.gain.setValueAtTime(0.2, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2); // 1.2s tone
    } catch (e) {
      console.log('Audio not supported or permitted', e);
    }
  };

  const handleVote = (candidate: Candidate) => {
    if (isVoted) return;
    setSelectedCandidate(candidate);
    setIsVoted(true);
    playEvmBeep();

    // Show VVPAT for 7 seconds
    setIsVvpatVisible(true);
    setVvpatTimer(7);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setVvpatTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsVvpatVisible(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetSimulation = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedCandidate(null);
    setIsVoted(false);
    setIsVvpatVisible(false);
    setVvpatTimer(7);
    setCurrentStep(1);
    setIdentityVerified(false);
    setHasInkedFinger(false);
    setHasVoterSlip(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const activeStepData: PollingStationStep = POLLING_STATION_STEPS[currentStep - 1];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200 mb-2">
            <Eye className="w-3.5 h-3.5" />
            Zero-Anxiety Walkthrough
          </div>
          <h2 className="text-2xl font-bold font-heading text-slate-900">
            Interactive Polling Booth Simulator
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
            Never voted before or wondering what actually happens behind closed doors? Experience the exact 4-station physical procedure and practice casting a secure vote on a simulated EVM & VVPAT unit.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            id="toggle-sound-btn"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
              soundEnabled
                ? 'bg-slate-100 text-slate-700 border-slate-300'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            Sound: {soundEnabled ? 'ON (Beep)' : 'Muted'}
          </button>
          <button
            id="reset-simulation-btn"
            onClick={resetSimulation}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Walkthrough
          </button>
        </div>
      </div>

      {/* 4 Physical Stations Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {POLLING_STATION_STEPS.map((s) => {
          const isCurrent = currentStep === s.step;
          const isPassed = currentStep > s.step;
          return (
            <button
              key={s.step}
              id={`booth-step-card-${s.step}`}
              onClick={() => setCurrentStep(s.step)}
              className={`p-4 rounded-xl text-left border transition-all duration-200 relative ${
                isCurrent
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-500/20'
                  : isPassed
                  ? 'bg-emerald-50 text-slate-800 border-emerald-300/80 hover:bg-emerald-100/50'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    isCurrent
                      ? 'bg-white/20 text-white'
                      : isPassed
                      ? 'bg-emerald-200 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Station {s.step}
                </span>
                {isPassed && <Check className="w-4 h-4 text-emerald-600" />}
                {isCurrent && <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>}
              </div>
              <h3
                className={`text-xs font-bold font-heading line-clamp-1 ${
                  isCurrent ? 'text-white' : 'text-slate-900'
                }`}
              >
                {s.officerTitle}
              </h3>
              <p
                className={`text-[11px] mt-1 line-clamp-1 ${
                  isCurrent ? 'text-blue-100' : 'text-slate-500'
                }`}
              >
                {s.actionTitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Simulation Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Station Narrative & Official Protocol (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                <span>{activeStepData.location}</span>
              </div>
              <h3 className="text-xl font-bold font-heading text-slate-900">
                {activeStepData.actionTitle}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Official In-Charge: <strong className="text-slate-700">{activeStepData.officerTitle}</strong>
              </p>
            </div>

            {/* Voter Action */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80">
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                <Info className="w-3.5 h-3.5 text-blue-600" />
                What You Do As A Citizen:
              </h4>
              <p className="text-xs text-blue-800 leading-relaxed">
                {activeStepData.voterInstructions}
              </p>
            </div>

            {/* Officer Protocol */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                Official Statutory Protocol:
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {activeStepData.officialProtocol}
              </p>
            </div>

            {/* Security Feature */}
            <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Anti-Fraud Safeguard: </span>
                <span>{activeStepData.securityFeature}</span>
              </div>
            </div>

            {/* Interactive Station Actions */}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              {currentStep === 1 && (
                <button
                  id="action-verify-id"
                  onClick={() => {
                    setIdentityVerified(true);
                    setCurrentStep(2);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Search className="w-4 h-4" />
                  Show ID & Check Name on Electoral Roll → Proceed
                </button>
              )}

              {currentStep === 2 && (
                <button
                  id="action-ink-sign"
                  onClick={() => {
                    setHasInkedFinger(true);
                    setHasVoterSlip(true);
                    setCurrentStep(3);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Fingerprint className="w-4 h-4" />
                  Get Indelible Ink & Sign Register 17A → Proceed
                </button>
              )}

              {currentStep === 3 && (
                <button
                  id="action-activate-ballot"
                  onClick={() => setCurrentStep(4)}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Officer Presses "BALLOT" Button → Enter Private Booth
                </button>
              )}

              {currentStep === 4 && (
                <div className="text-center py-1 text-xs text-slate-500 font-medium">
                  Use the simulated voting unit on the right to cast your vote!
                </div>
              )}
            </div>
          </div>

          {/* Golden Rules of the Polling Station */}
          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 text-xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-white">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Strict Rules Inside the Polling Station
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded bg-slate-800/80 border border-slate-700 flex items-center gap-2 text-red-300">
                <Smartphone className="w-3.5 h-3.5 shrink-0 text-red-400" />
                <span>NO Mobile Phones inside compartment</span>
              </div>
              <div className="p-2 rounded bg-slate-800/80 border border-slate-700 flex items-center gap-2 text-red-300">
                <Camera className="w-3.5 h-3.5 shrink-0 text-red-400" />
                <span>NO Photos or Selfies of your vote</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              The secrecy of your ballot is protected under criminal penalty. Neither party agents nor polling officers can look over your shoulder while voting.
            </p>
          </div>
        </div>

        {/* Right: Interactive Hardware Simulator (EVM & VVPAT) (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                  EVM
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-tight text-white">
                    Electronic Voting Machine (Balloting Unit)
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Standalone Microcontroller • Zero Network Connectivity • Tamper-Evident
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase">
                  Ready to Vote
                </span>
              </div>
            </div>

            {/* VVPAT Glass Inspection Unit */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-xs font-bold text-slate-300 font-mono">
                    VVPAT WINDOW (Voter Verifiable Paper Audit Trail)
                  </span>
                </div>
                {isVvpatVisible && (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                    <Clock className="w-3 h-3 animate-spin" />
                    Visible: {vvpatTimer}s remaining
                  </span>
                )}
              </div>

              {/* Glass Window Simulation */}
              <div className="h-32 bg-slate-900/90 rounded-lg border-2 border-slate-700/80 p-3 relative overflow-hidden flex items-center justify-center">
                <AnimatePresence>
                  {isVvpatVisible && selectedCandidate ? (
                    <motion.div
                      initial={{ y: -60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 80, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-52 bg-amber-50 text-slate-900 p-3 rounded shadow-lg border border-amber-300 text-center font-mono"
                    >
                      <div className="text-[9px] uppercase tracking-widest text-slate-500 font-bold border-b border-slate-300 pb-1 mb-1">
                        Paper Audit Slip (Cast Receipt)
                      </div>
                      <div className="flex items-center justify-between px-2 text-xs font-bold">
                        <span>#{selectedCandidate.id}</span>
                        <span className="text-lg">{selectedCandidate.symbol}</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 truncate mt-0.5">
                        {selectedCandidate.name}
                      </div>
                      <div className="text-[9px] text-slate-500 truncate">
                        {selectedCandidate.party}
                      </div>
                      <div className="text-[8px] text-emerald-700 font-semibold mt-1 bg-emerald-100/70 py-0.5 rounded">
                        ✓ Verified & Deposited into Sealed Box
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center text-xs text-slate-500">
                      {isVoted ? (
                        <div className="space-y-1">
                          <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                          <p className="text-slate-300 font-medium text-xs">
                            Slip has safely dropped into the sealed compartment.
                          </p>
                          <p className="text-[10px] text-slate-500">
                            Vote successfully recorded in tamper-proof non-volatile memory.
                          </p>
                        </div>
                      ) : (
                        <p>
                          Press any candidate's blue button below. The printed slip will appear here for 7 seconds to let you visually confirm your vote!
                        </p>
                      )}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Candidate Ballot Sheet on Machine */}
            <div className="space-y-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="grid grid-cols-12 text-[11px] font-bold text-slate-400 px-3 pb-1 border-b border-slate-800">
                <span className="col-span-1">No.</span>
                <span className="col-span-6">Candidate & Affiliation</span>
                <span className="col-span-2 text-center">Symbol</span>
                <span className="col-span-3 text-right">Press to Vote</span>
              </div>

              {MOCK_CANDIDATES.map((cand) => {
                const isThisCandidate = selectedCandidate?.id === cand.id;
                return (
                  <div
                    key={cand.id}
                    className={`grid grid-cols-12 items-center p-2.5 rounded-lg border transition-all ${
                      isThisCandidate
                        ? 'bg-slate-800/90 border-blue-500 ring-1 ring-blue-500'
                        : 'bg-slate-900 border-slate-800 hover:bg-slate-800/50'
                    }`}
                  >
                    <span className="col-span-1 font-mono font-bold text-slate-400 text-xs">
                      0{cand.id}
                    </span>
                    <div className="col-span-6 pr-2">
                      <div className="text-xs font-bold text-white tracking-tight">
                        {cand.name}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {cand.party}
                      </div>
                    </div>
                    <div className="col-span-2 flex items-center justify-center text-xl" title={cand.symbolName}>
                      {cand.symbol}
                    </div>
                    <div className="col-span-3 flex items-center justify-end gap-2">
                      {/* Red LED indicator */}
                      <span
                        className={`w-3 h-3 rounded-full border transition-all ${
                          isThisCandidate && isVoted
                            ? 'bg-red-500 border-red-400 shadow-md shadow-red-500/80 animate-pulse'
                            : 'bg-red-950 border-red-900'
                        }`}
                        title={isThisCandidate ? 'Vote Registered' : 'Standby'}
                      ></span>

                      {/* Blue Push Button */}
                      <button
                        id={`btn-vote-candidate-${cand.id}`}
                        disabled={isVoted}
                        onClick={() => handleVote(cand)}
                        className={`w-14 py-1.5 rounded font-bold text-xs shadow transition-all duration-150 ${
                          isVoted
                            ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-500 active:scale-95 text-white shadow-blue-700/50 cursor-pointer'
                        }`}
                      >
                        VOTE
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Voting Success Confirmation Banner */}
            {isVoted && selectedCandidate && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-gradient-to-r from-emerald-950 to-slate-900 border border-emerald-500/40 text-xs space-y-2"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  Your Vote is 100% Cast, Confidential, and Audited!
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  You voted for <strong className="text-white">{selectedCandidate.name}</strong> ({selectedCandidate.party}). The confirmation beep sounded and the paper slip confirmed the selection for 7 seconds. You can now walk out proudly knowing you exercised your sovereign democratic right.
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-emerald-900/60">
                  <span className="text-[10px] text-slate-400">
                    Next voter can only vote after Officer 3 presses "BALLOT" again.
                  </span>
                  <button
                    id="try-again-btn"
                    onClick={resetSimulation}
                    className="text-xs text-blue-400 hover:text-blue-300 font-semibold underline"
                  >
                    Simulate Another Voter
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
