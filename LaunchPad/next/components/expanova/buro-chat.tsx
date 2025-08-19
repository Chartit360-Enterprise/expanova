"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../elements/button";

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface BuroChatProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export const BuroChat: React.FC<BuroChatProps> = ({ isOpen = false, onToggle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: '¡Hola! I\'m your AI bureaucracy assistant. I can help you with NIE applications, empadronamiento, SIP health cards, bank accounts, and more Spanish administrative processes. What would you like to know?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5423'}/api/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify({
          message: userMessage.text,
          sessionId: `session-${Date.now()}`
        })
      });

      const result = await response.json();
      
      if (result.success && result.data?.message) {
        const assistantMessage: ChatMessage = {
          id: result.data.message.id,
          text: result.data.message.content,
          sender: 'assistant',
          timestamp: new Date(result.data.message.timestamp)
        };

        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      
      // Fallback response
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. For NIE applications, you typically need your passport and rental contract. Visit https://sede.policia.gob.es to book an appointment.",
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cursor-accent to-cursor-warning rounded-full blur opacity-75"></div>
            <Button
              onClick={onToggle}
              className="relative bg-cursor-panel backdrop-blur-sm border border-cursor-border/30 hover:border-cursor-accent/50 text-cursor-text hover:text-cursor-accent rounded-full p-4 shadow-2xl transition-all duration-300 hover:shadow-cursor-accent/25"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🤖</span>
                <span className="hidden sm:inline font-medium">BuroChat</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cursor-success rounded-full animate-pulse"></div>
              </div>
            </Button>
          </div>
        </motion.div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-cursor-panel/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-cursor-border/30 flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-cursor-accent to-cursor-warning p-4 flex items-center justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cursor-accent/20 to-cursor-warning/20 backdrop-blur-sm"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                  <div className="text-2xl">🤖</div>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-cursor-success rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-white">BuroChat</h3>
                  <p className="text-xs text-white/80">AI Bureaucracy Assistant</p>
                </div>
              </div>
              <motion.button
                onClick={onToggle}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="text-white/80 hover:text-white text-xl p-1 rounded-full hover:bg-white/10 transition-all relative z-10"
              >
                ×
              </motion.button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-cursor-bg to-cursor-sidebar">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs relative group ${
                    message.sender === 'user' ? 'ml-8' : 'mr-8'
                  }`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm relative ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-cursor-accent to-cursor-warning text-white'
                        : 'bg-cursor-panel/70 backdrop-blur-sm border border-cursor-border/30 text-cursor-text'
                    }`}>
                      <p className="leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-1 opacity-70 ${
                        message.sender === 'user' 
                          ? 'text-white' 
                          : 'text-cursor-text-dim'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                      {message.sender === 'user' && (
                        <div className="absolute -bottom-1 right-3 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-cursor-accent"></div>
                      )}
                      {message.sender === 'assistant' && (
                        <div className="absolute -bottom-1 left-3 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-cursor-panel"></div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex justify-start mr-8"
                >
                  <div className="bg-cursor-panel/70 backdrop-blur-sm border border-cursor-border/30 rounded-2xl px-4 py-3 text-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-cursor-accent rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-cursor-warning rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-cursor-success rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-cursor-panel/50 backdrop-blur-sm border-t border-cursor-border/30">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about NIE, empadronamiento, health cards..."
                    className="w-full px-4 py-3 bg-cursor-bg border border-cursor-border/30 rounded-xl text-sm text-cursor-text placeholder-cursor-text-dim focus:outline-none focus:ring-2 focus:ring-cursor-accent/50 focus:border-cursor-accent/50 transition-all"
                    disabled={isLoading}
                  />
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isLoading}
                    className="px-4 py-3 bg-gradient-to-r from-cursor-accent to-cursor-warning hover:from-cursor-accent/90 hover:to-cursor-warning/90 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-cursor-accent/25 disabled:from-cursor-selection disabled:to-cursor-selection disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22,2 15,22 11,13 2,9"></polygon>
                    </svg>
                  </Button>
                </motion.div>
              </div>
              <div className="mt-2 text-xs text-cursor-text-dim text-center">
                🔒 AI assistant for Spanish bureaucracy
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const BuroChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BuroChat 
      isOpen={isOpen} 
      onToggle={() => setIsOpen(!isOpen)} 
    />
  );
};