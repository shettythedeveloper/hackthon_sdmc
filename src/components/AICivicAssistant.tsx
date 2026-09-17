import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, HelpCircle, ShieldCheck, RefreshCw, AlertCircle } from 'lucide-react';
import { VoterLevel } from '../types';

interface AICivicAssistantProps {
  voterLevel: VoterLevel;
  initialQuery?: string;
  stageContext?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  source?: string;
  timestamp: string;
}

const QUICK_QUESTIONS = [
  'Can I vote if I lost my physical Voter ID card but have my Passport?',
  'How does VVPAT guarantee my vote cannot be changed or hacked?',
  'What is NOTA and what happens if NOTA wins the most votes?',
  'What are my legal rights if someone already voted in my name?',
  'Can my employer deduct my salary if I take time off on election day?',
  'What is the difference between an Exit Poll and an Opinion Poll?'
];

export const AICivicAssistant: React.FC<AICivicAssistantProps> = ({
  voterLevel,
  initialQuery = '',
  stageContext = '',
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Hello! I am your CivicPulse Election Guide. I provide clear, strictly non-partisan, and accurate information on election stages, polling booth procedures, legal rights, and voter verification rules. What would you like to know about the election process?',
      source: 'Civic Knowledge Base',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputQuery, setInputQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSend = async (queryToSend?: string) => {
    const query = (queryToSend || inputQuery).trim();
    if (!query || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/gemini/election-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          mode: 'voter-guide',
          stageName: stageContext || 'General Election Process',
          voterLevel,
        }),
      });

      const data = await response.json();

      if (data && data.answer) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.answer,
            source: data.source || 'CivicPulse AI Navigator',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        throw new Error('Could not parse response from assistant');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Could not fetch response right now. Please check your connection.');
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'In all democratic elections: (1) Check your registration before polling day; (2) Bring any valid government-approved photo ID; (3) Your ballot is 100% confidential behind the voting compartment; (4) Report any harassment or violations to the national voter helpline 1950.',
          source: 'Standard Civic Safety Guidelines',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content:
          'Chat reset. Ask any question regarding voter registration, polling day rules, or candidate scrutiny.',
        source: 'Civic Knowledge Base',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Non-Partisan Civic AI Guide
          </div>
          <h2 className="text-2xl font-bold font-heading text-slate-900">
            Ask the AI Election Navigator
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl">
            Have a specific scenario, doubt, or question about voting rules? Get plain-English, legally grounded, and non-partisan explanations instantly.
          </p>
        </div>

        <button
          onClick={clearChat}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Clear Conversation
        </button>
      </div>

      {/* Suggested Questions Pills */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
          Frequently Asked Civic Questions (Click to Ask):
        </span>
        <div className="flex flex-wrap gap-2">
          {QUICK_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              id={`quick-question-${idx}`}
              onClick={() => handleSend(q)}
              className="text-xs bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 px-3 py-1.5 rounded-lg text-left transition-colors font-medium shadow-2xs"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Dialogue Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[520px] overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="grow p-6 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={idx}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-900 text-white shadow-xs'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-blue-300" />}
                </div>

                <div
                  className={`max-w-[82%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-1.5 shadow-2xs ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                  <div
                    className={`flex items-center justify-between text-[10px] pt-1 border-t ${
                      isUser
                        ? 'border-blue-500/50 text-blue-200'
                        : 'border-slate-200/80 text-slate-400'
                    }`}
                  >
                    <span>{msg.source || (isUser ? 'You' : 'Civic Guide')}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                <Bot className="w-4 h-4 text-blue-300" />
              </div>
              <div className="p-4 rounded-2xl rounded-tl-none bg-slate-50 border border-slate-200 text-slate-600 text-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
                <span>Consulting election procedures and legal standards...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              id="ai-assistant-input"
              type="text"
              placeholder="Ask anything about elections, voter cards, ID rules, VVPAT, counting..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="grow px-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              id="ai-assistant-send-btn"
              disabled={isLoading || !inputQuery.trim()}
              className={`px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-colors ${
                isLoading || !inputQuery.trim()
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
              }`}
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Ask Guide</span>
            </button>
          </form>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Strictly non-partisan civic assistance
            </span>
            <span>Knowledge Level: {voterLevel}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
