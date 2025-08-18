"use client";

import {
  Copy,
  Edit,
  Mic,
  Paperclip,
  RefreshCcw,
  Send,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

import MessageRenderer from "./messagee-renderer";

function ChatArea({
  isDarkMode,
  chatMessages,
  setChatMessages,
  message,
  setMessage,
  isRecording,
  setIsRecording,
}) {
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingMessage, setTypingMessage] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-scroll to bottom when entering chat or new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Create new user message
    const newUserMessage = {
      id: Date.now(),
      type: "user",
      content: message.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Add user message to chat
    setChatMessages((prev) => [...prev, newUserMessage]);

    // Clear input field
    setMessage("");

    // Start typing effect
    setIsTyping(true);
    setTypingMessage("");

    // AI response content
    const aiResponseContent =
      "Chatbot is under process of development. I'm still learning and will be ready soon to help you with your questions!";

    // Simulate typing effect
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < aiResponseContent.length) {
        setTypingMessage(aiResponseContent.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        // Typing complete, add the full message to chat
        clearInterval(typingInterval);
        setIsTyping(false);
        setTypingMessage("");

        const aiResponse = {
          id: Date.now() + 1,
          type: "ai",
          content: aiResponseContent,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setChatMessages((prev) => [...prev, aiResponse]);
      }
    }, 50); // Adjust speed here (lower = faster typing)
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col relative min-h-0">
      {/* Enhanced Chat Messages */}
      <div className="flex-1 overflow-y-scroll overflow-x-visible relative custom-scrollbar">
        {/* Animated Background Pattern - Fixed positioning for smooth scrolling */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/40 to-slate-900/90" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-2 sm:px-4 py-2 sm:py-4 space-y-2 sm:space-y-4">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <div
                className={`max-w-[85vw] sm:max-w-2xl relative ${
                  msg.type === "user"
                    ? "bg-gradient-to-r from-purple-800/40 via-purple-700/50 to-purple-800/40 text-white border border-purple-600/30"
                    : `${isDarkMode ? "text-white" : "text-slate-900"}`
                } rounded-xl p-2 sm:p-3 ${msg.type === "user" ? "rounded-br-md" : "rounded-bl-md"} group`}
              >
                <div
                  className={`text-xs leading-relaxed whitespace-pre-wrap ${isDarkMode ? "!text-white" : "!text-slate-900"}`}
                >
                  <MessageRenderer
                    content={msg.content}
                    isDarkMode={isDarkMode}
                  />
                </div>

                <div
                  className={`flex items-center justify-between mt-2 sm:mt-3 pt-2 sm:pt-3 border-t ${isDarkMode ? "border-purple-700/20" : "border-purple-300/20"}`}
                >
                  <div
                    className={`text-xs ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}
                  >
                    {msg.timestamp}
                  </div>

                  {msg.type === "ai" ? (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className={`p-1 sm:p-1.5 rounded-md ${isDarkMode ? "hover:bg-slate-700/40" : "hover:bg-purple-100/50"} transition-colors ${isDarkMode ? "text-purple-300" : "text-purple-600"}`}
                      >
                        <Copy className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                      <button
                        className={`p-1 sm:p-1.5 rounded-md ${isDarkMode ? "hover:bg-slate-700/40" : "hover:bg-purple-100/50"} transition-colors ${isDarkMode ? "text-purple-300" : "text-purple-600"}`}
                      >
                        <ThumbsUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                      <button
                        className={`p-1 sm:p-1.5 rounded-md ${isDarkMode ? "hover:bg-slate-700/40" : "hover:bg-purple-100/50"} transition-colors ${isDarkMode ? "text-purple-300" : "text-purple-600"}`}
                      >
                        <ThumbsDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className={`p-1 sm:p-1.5 rounded-md ${isDarkMode ? "hover:bg-slate-700/40" : "hover:bg-purple-100/50"} transition-colors ${isDarkMode ? "text-purple-300" : "text-purple-600"}`}
                      >
                        <Copy className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                      <button
                        className={`p-1 sm:p-1.5 rounded-md ${isDarkMode ? "hover:bg-slate-700/40" : "hover:bg-purple-100/50"} transition-colors ${isDarkMode ? "text-purple-300" : "text-purple-600"}`}
                      >
                        <Edit className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                      <button
                        className={`p-1 sm:p-1.5 rounded-md ${isDarkMode ? "hover:bg-slate-700/40" : "hover:bg-purple-100/50"} transition-colors ${isDarkMode ? "text-purple-300" : "text-purple-600"}`}
                      >
                        <RefreshCcw className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="max-w-[85vw] sm:max-w-2xl relative text-white rounded-xl p-2 sm:p-3 rounded-bl-md group">
                <div className="text-xs leading-relaxed whitespace-pre-wrap text-white">
                  {typingMessage}
                  <span className="inline-block w-2 h-4 bg-purple-400 ml-1 animate-pulse rounded-sm"></span>
                </div>
                <div className="flex items-center justify-between mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-purple-700/20">
                  <div className="text-xs text-purple-400">
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Invisible div for auto-scrolling */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-2 sm:p-4 relative z-10">
        {/* Background is now handled by the fixed background above */}
        <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 md:px-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-2 sm:p-3">
            <div className="flex items-end gap-2 sm:gap-3">
              <div className="flex-1">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything... I'm here to help!"
                  className="w-full bg-transparent text-white placeholder-gray-400 resize-none outline-none max-h-24 text-xs sm:text-sm focus:outline-none"
                  rows="1"
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
              {/* Quick Actions */}
              <div className="hidden md:flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3 justify-center sm:justify-start">
                <button className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs transition-colors text-white">
                  ✨ Explain this code
                </button>
                <button className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs transition-colors text-white">
                  🎨 Design ideas
                </button>
                <button className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs transition-colors text-white">
                  📝 Write content
                </button>
                <button className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs transition-colors text-white">
                  🔍 Research topic
                </button>
              </div>

              <div className="flex justify-end items-center gap-1.5 sm:gap-2 mt-2 sm:mt-0">
                <button className="p-1.5 sm:p-2 rounded-lg hover:bg-white/10 transition-colors text-white flex items-center justify-center">
                  <Paperclip className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-1.5 sm:p-2 rounded-lg transition-colors flex items-center justify-center text-white ${
                    isRecording
                      ? "bg-red-500 hover:bg-red-600"
                      : "hover:bg-white/10"
                  }`}
                >
                  <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isTyping}
                  className="p-1.5 sm:p-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
