import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles, ShieldCheck, HelpCircle } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/electionData';
import { QuizQuestion } from '../types';
import { playSuccessChime, playTactileClick } from '../utils/audio';

export const VoterQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const question = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    playTactileClick(true);
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === question.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setUserAnswers((prev) => ({ ...prev, [question.id]: selectedOption }));
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
      playSuccessChime(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#2563EB', '#10B981', '#F59E0B', '#8B5CF6'],
        });
      } catch (e) {
        // Ignore
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setUserAnswers({});
    setIsFinished(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 mb-2">
            <Award className="w-3.5 h-3.5" />
            Civic Knowledge & Voter Rights Challenge
          </div>
          <h2 className="text-2xl font-bold font-heading text-slate-900">
            Interactive Voter Readiness Quiz
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl">
            Test your awareness on real-world polling day situations: What happens if your card is lost? Can anyone photograph your vote? What are tendered ballots?
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <span className="text-xs text-slate-400 block font-medium">Current Score</span>
            <span className="text-xl font-bold font-heading text-blue-600">
              {score} / {QUIZ_QUESTIONS.length}
            </span>
          </div>
        </div>
      </div>

      {!isFinished ? (
        /* Active Question Card */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}</span>
              <span className="text-blue-600">{question.category}</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Scenario Callout if present */}
          {question.scenario && (
            <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs text-blue-900 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Real-world Scenario: </span>
                <span>{question.scenario}</span>
              </div>
            </div>
          )}

          {/* Question Text */}
          <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 leading-snug">
            {question.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === question.correctIndex;
              let btnStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-500';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'border-red-500 bg-red-50 text-red-900 font-semibold ring-1 ring-red-500';
                } else {
                  btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                btnStyle = 'border-blue-600 bg-blue-50/60 text-blue-900 font-semibold ring-2 ring-blue-500/20';
              }

              return (
                <button
                  key={idx}
                  id={`quiz-option-${idx}`}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all duration-150 flex items-start gap-3 ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-full border border-slate-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed grow">{opt}</span>
                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner after Submit */}
          {isAnswerSubmitted && (
            <div
              className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1 ${
                selectedOption === question.correctIndex
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50/80 border-amber-200 text-amber-900'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5 text-sm mb-1">
                {selectedOption === question.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Correct! Badge Earned: {question.badgeEarned}
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-amber-600" />
                    Good try! Here is the actual civic procedure:
                  </>
                )}
              </div>
              <p>{question.explanation}</p>
            </div>
          )}

          {/* Action Button */}
          <div className="flex items-center justify-end pt-3 border-t border-slate-100">
            {!isAnswerSubmitted ? (
              <button
                id="quiz-check-answer-btn"
                disabled={selectedOption === null}
                onClick={handleSubmitAnswer}
                className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                  selectedOption !== null
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                id="quiz-next-question-btn"
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs flex items-center gap-2"
              >
                {currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results & Certificate Card */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Award className="w-9 h-9" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Quiz Completed
            </span>
            <h3 className="text-2xl font-bold font-heading text-slate-900 mt-3">
              {score >= 4 ? 'Civic Champion! You Know Your Voter Rights!' : 'Great Effort! Keep Building Your Civic Readiness!'}
            </h3>
            <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
              You correctly answered <strong className="text-slate-900">{score} out of {QUIZ_QUESTIONS.length}</strong> questions on electoral procedures, secrecy of ballot, and anti-fraud protections.
            </p>
          </div>

          {/* Digital Badge Container */}
          <div className="max-w-md mx-auto p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white border border-slate-700 text-left shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  CivicPulse Certification
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="text-lg font-bold font-heading text-white">
              {score === 5 ? 'Certified Master Voter' : score >= 3 ? 'Informed Democratic Citizen' : 'Civic Awareness Explorer'}
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Demonstrated practical understanding of polling booth procedures, identity verification rules, and secret ballot protections.
            </p>
          </div>

          <div className="pt-3 flex items-center justify-center gap-3">
            <button
              id="quiz-retake-btn"
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
