import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, Brain, Check, HelpCircle, AlertCircle, Clock, BookOpen } from 'lucide-react';
import { ChatMessage, MockConfig } from '../types';
import { CHAT_HISTORY } from '../mockData';

interface ChatViewProps {
  onAcceptSuggestedConfig: (config: MockConfig) => void;
}

export default function ChatView({ onAcceptSuggestedConfig }: ChatViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(CHAT_HISTORY);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    'Generate a hard JEE Physics mock with negative marking',
    'Make a quick SAT-style Math test focused on Algebra',
    'Assemble a Chemistry review on organic reagents and catalysts',
    'Generate a Biology cell structure test with 10 questions'
  ];

  // Auto scroll to bottom
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // 1. Add User Message
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // 2. Simulate AI response delay
    setTimeout(() => {
      setIsTyping(false);

      // Determine appropriate generated suggested config based on matching terms
      let suggestedConfig: MockConfig | undefined;
      let replyText = '';

      const lowerText = textToSend.toLowerCase();
      if (lowerText.includes('physics') || lowerText.includes('jee')) {
        replyText = 'Understood! I parsed the physics past papers. I have structured a hard-difficulty Physics mock test matching JEE style constraints. Let me know if you would like to run this mockup!';
        suggestedConfig = {
          subject: 'Physics',
          title: 'JEE Mechanics Focus Mock',
          numQuestions: 10,
          difficulty: 'Hard',
          timeLimitMinutes: 30,
          markingScheme: { positive: 4, negative: -1 }
        };
      } else if (lowerText.includes('math') || lowerText.includes('sat') || lowerText.includes('algebra')) {
        replyText = 'No problem. I have extracted algebra matrices, calculus files, and SAT sample cards. Here is an optimized Mathematics simulated set.';
        suggestedConfig = {
          subject: 'Mathematics',
          title: 'SAT Algebra Drill Mock',
          numQuestions: 15,
          difficulty: 'Medium',
          timeLimitMinutes: 20,
          markingScheme: { positive: 3, negative: 0 }
        };
      } else if (lowerText.includes('chemistry') || lowerText.includes('catalyst')) {
        replyText = 'Excellent choice. Chemical reactions and reagent-based questions are highly typical in CBSE and competitive papers. I assembled a medium-intensity config card for you.';
        suggestedConfig = {
          subject: 'Chemistry',
          title: 'Organic Chemistry & Catalyst Review',
          numQuestions: 10,
          difficulty: 'Medium',
          timeLimitMinutes: 15,
          markingScheme: { positive: 4, negative: -1 }
        };
      } else {
        replyText = 'I have configured a comprehensive mock test based on your recent files list. You can review the structural metrics below and launch it directly.';
        suggestedConfig = {
          subject: 'Biology',
          title: 'Cell Structure & Ecology Review',
          numQuestions: 5,
          difficulty: 'Easy',
          timeLimitMinutes: 10,
          markingScheme: { positive: 1, negative: 0 }
        };
      }

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedConfig
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="h-[calc(110vh-220px)] flex flex-col bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden animate-fade-in">
      {/* Header bar */}
      <div className="px-6 py-4.5 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-xl relative">
            <Sparkles className="w-4 h-4" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-gray-900 animate-pulse"></div>
          </div>
          <div>
            <h2 className="text-sm font-bold text-white font-display">AI Mock Exam Architect</h2>
            <p className="text-[10px] text-gray-500 font-mono">Powered by Google Gemini Sandbox</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-[10px] text-gray-500 bg-gray-950 border border-gray-800 px-2 py-1 rounded">Formula Transcription Engine</span>
          <span className="text-[10px] text-gray-500 bg-gray-950 border border-gray-800 px-2 py-1 rounded">LaTeX Output Mode</span>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.map((msg) => {
          const isAI = msg.sender === 'ai';
          return (
            <div 
              key={msg.id}
              className={`flex gap-3.5 max-w-4xl ${isAI ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
            >
              <div className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs shadow-sm ${
                isAI 
                  ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white' 
                  : 'bg-gray-800 text-gray-200 border border-gray-700'
              }`}>
                {isAI ? 'AI' : 'SS'}
              </div>

              <div className="space-y-4 max-w-xl">
                {/* Bubble text contents */}
                <div className={`px-4.5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  isAI 
                    ? 'bg-gray-900 border border-gray-800 text-gray-100 rounded-tl-none' 
                    : 'bg-blue-600 text-white rounded-tr-none'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Sub-card configuration proposal */}
                {isAI && msg.suggestedConfig && (
                  <div className="bg-gray-900 border border-blue-900/40 p-5 rounded-2xl space-y-4 custom-glow-purple">
                    <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                      <div>
                        <span className="text-[9px] text-blue-400 font-bold tracking-widest uppercase font-mono bg-blue-950/40 border border-blue-900/30 px-2 py-0.5 rounded">Suggested Exam Config</span>
                        <h4 className="text-sm font-bold text-white mt-1.5">{msg.suggestedConfig.title}</h4>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] bg-red-950 text-red-400 font-bold tracking-wide rounded border border-red-900/40">
                        {msg.suggestedConfig.difficulty}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-2 bg-gray-950 border border-gray-800/80 rounded-xl space-y-0.5">
                        <span className="text-[10px] text-gray-500 block uppercase">No. Questions</span>
                        <span className="text-xs font-extrabold text-white font-mono">{msg.suggestedConfig.numQuestions}</span>
                      </div>
                      <div className="p-2 bg-gray-950 border border-gray-800/80 rounded-xl space-y-0.5">
                        <span className="text-[10px] text-gray-500 block uppercase">Duration</span>
                        <span className="text-xs font-extrabold text-white font-mono">{msg.suggestedConfig.timeLimitMinutes}m</span>
                      </div>
                      <div className="p-2 bg-gray-950 border border-gray-800/80 rounded-xl space-y-0.5">
                        <span className="text-[10px] text-gray-500 block uppercase">Marking</span>
                        <span className="text-xs font-extrabold text-blue-400 font-mono">
                          +{msg.suggestedConfig.markingScheme.positive}/{msg.suggestedConfig.markingScheme.negative}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onAcceptSuggestedConfig(msg.suggestedConfig!)}
                      id={`btn-accept-proposal-${msg.id}`}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white rounded-xl transition-all shadow-md shadow-blue-500/10 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Accept & Configure Exam parameters
                    </button>
                  </div>
                )}

                <div className={`text-[9px] text-gray-500 font-mono ${isAI ? 'text-left' : 'text-right'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading / Typing indicator bubble */}
        {isTyping && (
          <div className="flex gap-3.5 mr-auto">
            <div className="w-8.5 h-8.5 rounded-xl flex items-center justify-center bg-gray-800 text-gray-400 font-bold text-xs shrink-0 shadow-sm animate-pulse">
              AI
            </div>
            <div className="bg-gray-900 border border-gray-800 px-4.5 py-3 rounded-2xl rounded-tl-none self-start flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        )}

        <div ref={messageEndRef} />
      </div>

      {/* Suggested prompts box */}
      <div className="px-6 py-3.5 bg-gray-950 border-t border-gray-900 flex gap-2 overflow-x-auto select-none no-scrollbar shrink-0">
        {samplePrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSendMessage(prompt)}
            className="px-3.5 py-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-750 text-[10.5px] font-semibold text-gray-400 hover:text-white rounded-full shrink-0 transition-all cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input textbox */}
      <div className="p-4.5 bg-gray-900 border-t border-gray-800 flex gap-3.5 shrink-0">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask AI to compile a syllabus or type custom mock setup prompt..."
          className="flex-1 bg-gray-950 border border-gray-800 hover:border-gray-700/80 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs text-gray-200 px-4.5 py-3.5 rounded-xl transition-all"
        />
        <button
          onClick={() => handleSendMessage(inputValue)}
          id="btn-chat-send"
          type="button"
          className="px-5 py-3.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-blue-500/10"
        >
          Send <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
