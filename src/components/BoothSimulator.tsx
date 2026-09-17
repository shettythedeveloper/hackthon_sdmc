import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Search, 
  Fingerprint, 
  SlidersHorizontal, 
  Vote, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Eye, 
  CheckCircle2, 
  RefreshCw, 
  AlertTriangle, 
  Smartphone, 
  Camera, 
  Check, 
  Info,
  Clock,
  IdCard,
  QrCode,
  FileCheck,
  Award
} from 'lucide-react';
import { POLLING_STATION_STEPS } from '../data/electionData';
import { PollingStationStep } from '../types';
import { 
  playEVMConfirmationBeep, 
  playTactileClick, 
  playVVPATDropSound, 
  playSuccessChime, 
  speakCivicText, 
  stopCivicSpeech 
} from '../utils/audio';

interface Candidate {
  id: number;
  name: string;
  party: string;
  symbol: string;
  symbolName: string;
  braille: string;
}

const MOCK_CANDIDATES: Candidate[] = [
  { id: 1, name: 'Dr. Sophia Mercer', party: 'Green Horizon Coalition', symbol: '🌱', symbolName: 'Sprouting Plant', braille: '⠼⠁' },
  { id: 2, name: 'Marcus Chen, PE', party: 'Civic Progress Alliance', symbol: '⚖️', symbolName: 'Scales of Justice', braille: '⠼⠃' },
  { id: 3, name: 'Amara Okafor', party: 'People’s Democratic Front', symbol: '☀️', symbolName: 'Rising Sun', braille: '⠼⠉' },
  { id: 4, name: 'Elena Rostova', party: 'Independent Citizen Action', symbol: '📘', symbolName: 'Open Book', braille: '⠼⠙' },
  { id: 5, name: 'None of the Above (NOTA)', party: 'Electoral Dissent Option', symbol: '🚫', symbolName: 'NOTA Ballot Symbol', braille: '⠼⠑' }
];

export const BoothSimulator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isVoted, setIsVoted] = useState<boolean>(false);
  const [isVvpatVisible, setIsVvpatVisible] = useState<boolean>(false);
  const [vvpatTimer, setVvpatTimer] = useState<number>(7);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [hasInkedFinger, setHasInkedFinger] = useState<boolean>(false);
  const [hasSignedRegister, setHasSignedRegister] = useState<boolean>(false);
  const [identityVerified, setIdentityVerified] = useState<boolean>(false);
  const [isBallotActivated, setIsBallotActivated] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const timerRef = useRef<any>(null);

  const handleVote = (candidate: Candidate) => {
    if (isVoted) return;
    playTactileClick(soundEnabled);
    setSelectedCandidate(candidate);
    setIsVoted(true);
    playEVMConfirmationBeep(soundEnabled);

    // Show VVPAT for 7 seconds
    setIsVvpatVisible(true);
    setVvpatTimer(7);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setVvpatTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsVvpatVisible(false);
          playVVPATDropSound(soundEnabled);

          // Confetti celebration when the slip drops safely
          try {
            confetti({
              particleCount: 70,
              spread: 60,
              origin: { y: 0.65 },
              colors: ['#2563EB', '#10B981', '#F59E0B'],
            });
          } catch (e) {
            // Ignore
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleBallotActivation = () => {
    playTactileClick(soundEnabled);
    setIsBallotActivated(true);
    setCurrentStep(4);
  };

  const resetSimulation = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    stopCivicSpeech();
    setIsSpeaking(false);
    setSelectedCandidate(null);
    setIsVoted(false);
    setIsVvpatVisible(false);
    setVvpatTimer(7);
    setCurrentStep(1);
    setIdentityVerified(false);
    setHasInkedFinger(false);
    setHasSignedRegister(false);
    setIsBallotActivated(false);
  };

  const handleReadAloud = (text: string) => {
    if (isSpeaking) {
      stopCivicSpeech();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speakCivicText(text, () => setIsSpeaking(false));
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopCivicSpeech();
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
            Never voted before or curious about what happens inside? Walk through the physical 4-station procedure, check your name on the roll, get inked, and test the EVM & 7-second VVPAT paper audit trail.
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
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-red-500" />}
            Audio: {soundEnabled ? 'ON (Authentic Beeps)' : 'Muted'}
          </button>
          <button
            id="reset-simulation-btn"
            onClick={resetSimulation}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Simulator
          </button>
        </div>
      </div>

      {/* 4 Physical Stations Progression Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {POLLING_STATION_STEPS.map((s) => {
          const isCurrent = currentStep === s.step;
          const isPassed = currentStep > s.step;
          return (
            <button
              key={s.step}
              id={`booth-step-card-${s.step}`}
              onClick={() => {
                stopCivicSpeech();
                setIsSpeaking(false);
                setCurrentStep(s.step);
              }}
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

      {/* Main Simulation Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Station Narrative & Interactive Artifacts (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {activeStepData.location}
                </span>
                <h3 className="text-xl font-bold font-heading text-slate-900 mt-1">
                  {activeStepData.actionTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Official In-Charge: <strong className="text-slate-700">{activeStepData.officerTitle}</strong>
                </p>
              </div>

              <button
                id="listen-station-instructions"
                onClick={() =>
                  handleReadAloud(
                    `${activeStepData.actionTitle}. Officer: ${activeStepData.officerTitle}. What you do: ${activeStepData.voterInstructions}. Protocol: ${activeStepData.officialProtocol}`
                  )
                }
                className="p-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 flex items-center gap-1 shrink-0"
                title="Listen to voice guide"
              >
                <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[11px]">{isSpeaking ? 'Stop' : 'Listen'}</span>
              </button>
            </div>

            {/* Voter Action Instructions */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80">
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                <Info className="w-3.5 h-3.5 text-blue-600" />
                What You Do As A Citizen:
              </h4>
              <p className="text-xs text-blue-800 leading-relaxed">
                {activeStepData.voterInstructions}
              </p>
            </div>

            {/* Interactive Station Interactive Mini-Experiences */}
            {currentStep === 1 && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <IdCard className="w-4 h-4 text-blue-600" />
                    Presented Official ID Document
                  </span>
                  <span className="text-[10px] text-emerald-700 font-mono bg-emerald-100 px-2 py-0.5 rounded">
                    APPROVED
                  </span>
                </div>

                {/* Simulated Plastic Voter ID Card (EPIC) */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-md relative overflow-hidden border border-blue-700/60">
                  <div className="flex items-center justify-between border-b border-blue-800 pb-2 mb-2">
                    <span className="text-[9px] font-bold tracking-widest text-blue-300 uppercase">
                      ELECTION COMMISSION OF THE DEMOCRACY
                    </span>
                    <span className="text-[10px] font-mono font-bold text-amber-300">EPIC: WBX9182374</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-14 bg-slate-800 rounded border border-blue-400 flex items-center justify-center text-xs font-bold text-slate-300">
                      PHOTO
                    </div>
                    <div className="text-xs space-y-0.5">
                      <div className="font-bold text-white">Alex Rivera</div>
                      <div className="text-[10px] text-blue-200">Roll Serial #412 • Part #18</div>
                      <div className="text-[10px] text-slate-300">Booth #04 • Metro Central</div>
                    </div>
                  </div>
                </div>

                <button
                  id="action-verify-id"
                  onClick={() => {
                    playTactileClick(soundEnabled);
                    setIdentityVerified(true);
                    setCurrentStep(2);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Search className="w-4 h-4" />
                  Officer Checks Roll & Calls Name → Proceed to Station 2
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Fingerprint className="w-4 h-4 text-indigo-600" />
                    Indelible Ink & Register 17A
                  </span>
                  <span className="text-[10px] text-indigo-700 font-mono bg-indigo-100 px-2 py-0.5 rounded">
                    PURPLE MARK
                  </span>
                </div>

                {/* Finger Ink Visualizer */}
                <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-14 bg-amber-100 rounded-t-full border border-amber-300 relative flex flex-col items-center justify-start pt-1 overflow-hidden shadow-inner">
                      <div className="w-6 h-4 bg-white/70 rounded-t-full border border-amber-200"></div>
                      {/* Indelible Ink Stripe */}
                      <div
                        className={`w-1.5 h-9 rounded-full mt-1 transition-all duration-300 ${
                          hasInkedFinger ? 'bg-purple-800 shadow-md shadow-purple-900/60' : 'bg-transparent'
                        }`}
                      ></div>
                    </div>
                    <div className="text-xs">
                      <span className="font-bold text-slate-900 block">Left Index Finger</span>
                      <span className="text-[11px] text-slate-500">
                        {hasInkedFinger ? 'Indelible Ink Applied (Cuticle to Nail)' : 'Waiting for ink application'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playTactileClick(soundEnabled);
                      setHasInkedFinger(true);
                      setHasSignedRegister(true);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      hasInkedFinger ? 'bg-purple-100 text-purple-800' : 'bg-purple-600 text-white'
                    }`}
                  >
                    {hasInkedFinger ? '✓ Inked' : 'Apply Ink'}
                  </button>
                </div>

                <button
                  id="action-ink-sign"
                  onClick={() => {
                    playTactileClick(soundEnabled);
                    setHasInkedFinger(true);
                    setHasSignedRegister(true);
                    setCurrentStep(3);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <FileCheck className="w-4 h-4" />
                  Sign Register 17A & Collect Slip → Proceed to Station 3
                </button>
              </div>
            )}

            {currentStep === 3 && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                    Officer's Control Unit (CU)
                  </span>
                  <span className="text-[10px] text-emerald-700 font-mono bg-emerald-100 px-2 py-0.5 rounded">
                    BALLOT ACTIVATOR
                  </span>
                </div>

                {/* Control Unit Hardware Display */}
                <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-3 shadow-inner">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-mono text-slate-400">CONTROL UNIT MODEL MK-III</span>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="text-[10px] font-mono text-emerald-400">CU READY</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-xs">
                    <span className="text-slate-400">TOTAL VOTES RECORDED:</span>
                    <span className="text-emerald-400 font-bold text-sm tracking-widest">0 4 1 2</span>
                  </div>

                  {/* Prominent Blue "BALLOT" Push Button */}
                  <button
                    id="action-cu-ballot-btn"
                    onClick={handleBallotActivation}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition-transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Vote className="w-4 h-4" />
                    Officer Presses "BALLOT" → Unlocks Private Voting Machine!
                  </button>
                </div>
              </div>
            )}

            {/* Anti-Fraud Statutory Safeguard */}
            <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Statutory Integrity Guarantee: </span>
                <span>{activeStepData.securityFeature}</span>
              </div>
            </div>
          </div>

          {/* Strict Booth Rules */}
          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 text-xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-white">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Strict Law Inside the Voting Compartment
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded bg-slate-800/80 border border-slate-700 flex items-center gap-2 text-red-300">
                <Smartphone className="w-3.5 h-3.5 shrink-0 text-red-400" />
                <span>NO Mobile Phones inside compartment</span>
              </div>
              <div className="p-2 rounded bg-slate-800/80 border border-slate-700 flex items-center gap-2 text-red-300">
                <Camera className="w-3.5 h-3.5 shrink-0 text-red-400" />
                <span>NO Photos or Selfies of your ballot</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400">
              The secrecy of your vote is protected under criminal law (Conduct of Elections Rules Section 128).
            </p>
          </div>
        </div>

        {/* Right: Realistic 3D EVM & 7-Second VVPAT Unit (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl space-y-6 relative overflow-hidden">
            {/* Booth Screen Frame Tag */}
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                  CONFIDENTIAL VOTING BOOTH COMPARTMENT
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">STANDALONE HARDWARE • NO INTERNET</span>
            </div>

            {/* VVPAT Glass Inspection Unit */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-xs font-bold text-slate-300 font-mono">
                    VVPAT INSPECTION WINDOW (Voter Verifiable Paper Audit Trail)
                  </span>
                </div>
                {isVvpatVisible && (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-amber-300 bg-amber-950/90 px-2 py-0.5 rounded border border-amber-800">
                    <Clock className="w-3 h-3 animate-spin" />
                    Visible: {vvpatTimer}s remaining
                  </span>
                )}
              </div>

              {/* Glass Window Simulation with Internal Lamp Glow */}
              <div
                className={`h-36 rounded-lg border-2 transition-all duration-300 p-3 relative overflow-hidden flex items-center justify-center ${
                  isVvpatVisible
                    ? 'bg-amber-950/20 border-amber-400/80 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900/90 border-slate-700/80'
                }`}
              >
                <AnimatePresence>
                  {isVvpatVisible && selectedCandidate ? (
                    <motion.div
                      initial={{ y: -60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 80, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-56 bg-amber-50 text-slate-900 p-3 rounded-sm shadow-xl border border-amber-300 text-center font-mono relative"
                    >
                      {/* Thermal Paper Perforation Line */}
                      <div className="border-b border-dashed border-slate-400 pb-1 mb-1.5 flex items-center justify-between text-[9px] uppercase font-bold text-slate-600">
                        <span>EVM AUDIT SLIP</span>
                        <span>7-SEC AUDIT</span>
                      </div>
                      <div className="flex items-center justify-between px-2 text-xs font-bold">
                        <span>#{selectedCandidate.id}</span>
                        <span className="text-xl">{selectedCandidate.symbol}</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 truncate mt-0.5">
                        {selectedCandidate.name}
                      </div>
                      <div className="text-[9px] text-slate-600 truncate">
                        {selectedCandidate.party}
                      </div>
                      <div className="text-[8px] text-emerald-800 font-bold mt-1 bg-emerald-100 py-0.5 rounded">
                        ✓ Verified & Auto-Deposited Into Sealed Box
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center text-xs text-slate-500 max-w-sm">
                      {isVoted ? (
                        <div className="space-y-1">
                          <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                          <p className="text-slate-200 font-semibold text-xs">
                            Paper slip has severed and dropped safely into the sealed ballot compartment!
                          </p>
                          <p className="text-[10px] text-slate-400">
                            Your vote is permanently tallied in encrypted read-only memory.
                          </p>
                        </div>
                      ) : (
                        <p>
                          Press any candidate's blue button on the Balloting Unit below. The authentic paper receipt will appear here for <strong className="text-slate-300">7 seconds</strong> so you can visually verify that your vote went to your exact choice!
                        </p>
                      )}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* EVM Balloting Unit (BU) */}
            <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-300">EVM BALLOTING UNIT</span>
                  <span className="text-[10px] text-slate-500 font-mono">M3 MODEL</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isVoted ? 'bg-slate-600' : 'bg-emerald-400 animate-pulse shadow-md shadow-emerald-500/50'
                    }`}
                  ></span>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                    {isVoted ? 'VOTE RECORDED' : 'READY FOR VOTE'}
                  </span>
                </div>
              </div>

              {/* Candidates Grid Header */}
              <div className="grid grid-cols-12 text-[11px] font-bold text-slate-400 px-3 pb-1 border-b border-slate-800">
                <span className="col-span-1">No.</span>
                <span className="col-span-6">Candidate & Party</span>
                <span className="col-span-2 text-center">Symbol</span>
                <span className="col-span-3 text-right">Press Button</span>
              </div>

              {/* Candidate Ballot Rows */}
              {MOCK_CANDIDATES.map((cand) => {
                const isThisCandidate = selectedCandidate?.id === cand.id;
                return (
                  <div
                    key={cand.id}
                    className={`grid grid-cols-12 items-center p-3 rounded-lg border transition-all ${
                      isThisCandidate
                        ? 'bg-slate-800/90 border-blue-500 ring-1 ring-blue-500'
                        : 'bg-slate-900 border-slate-800 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="col-span-1 flex flex-col items-start font-mono text-xs">
                      <span className="font-bold text-slate-300">0{cand.id}</span>
                      <span className="text-[10px] text-blue-400" title="Braille Numeral">
                        {cand.braille}
                      </span>
                    </div>

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

                    <div className="col-span-3 flex items-center justify-end gap-2.5">
                      {/* Red LED indicator lamp */}
                      <span
                        className={`w-3.5 h-3.5 rounded-full border transition-all ${
                          isThisCandidate && isVoted
                            ? 'bg-red-500 border-red-300 shadow-lg shadow-red-500 animate-pulse'
                            : 'bg-red-950 border-red-900/60'
                        }`}
                        title={isThisCandidate ? 'Vote Registered' : 'Standby'}
                      ></span>

                      {/* Physical Push Button */}
                      <button
                        id={`btn-vote-candidate-${cand.id}`}
                        disabled={isVoted}
                        onClick={() => handleVote(cand)}
                        className={`w-16 py-2 rounded-md font-bold text-xs transition-all duration-150 shadow-md ${
                          isVoted
                            ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-500 active:scale-95 text-white shadow-blue-600/40 cursor-pointer border-t border-blue-400'
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
                  You voted for <strong className="text-white">{selectedCandidate.name}</strong> ({selectedCandidate.party}). The confirmation tone sounded, the red lamp lit up, and the paper audit slip confirmed your choice for 7 seconds. You have successfully fulfilled your highest constitutional duty.
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-emerald-900/60">
                  <span className="text-[10px] text-slate-400">
                    The EVM is now locked until the next voter is authorized at Station 3.
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
