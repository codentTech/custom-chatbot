"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar/sidebar.component";
import Header from "../components/header/header.component";
import { conversations } from "../data/conversations";

// Main Component
export default function AIChatbotUI() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [isNewChat, setIsNewChat] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-4o");

  const handleNewChat = () => {
    setIsNewChat(true);
    setMessage("");
  };

  const handleStartChat = (newMessage) => {
    if (newMessage.trim()) {
      const newChatId = Date.now();
      // Navigate to the new chat route
      router.push(`/chat/${newChatId}`);
    }
  };

  const chatMessages = [
    {
      id: 1,
      type: "user",
      content:
        "Hey! I'm working on a new mobile app and need some advice on user experience design. What are the current best practices?",
      timestamp: "2:34 PM",
    },
    {
      id: 2,
      type: "ai",
      content:
        "Great question! Here are the key UX best practices for mobile apps in 2024:\n\n**1. Thumb-Friendly Design**\n• Keep primary actions within easy thumb reach\n• Use bottom navigation for main features\n• Make touch targets at least 44px\n\n**2. Progressive Disclosure**\n• Don't overwhelm users with too many options\n• Reveal complexity gradually as needed\n• Use clear visual hierarchy\n\n**3. Performance & Accessibility**\n• Ensure fast loading times (under 3 seconds)\n• Support dark mode from launch\n• Include proper contrast ratios\n• Test with screen readers\n\n**4. Onboarding Excellence**\n• Keep it under 3 steps\n• Show value immediately\n• Allow users to skip and explore\n\nWould you like me to dive deeper into any of these areas, or do you have specific questions about your app's user flow?",
      timestamp: "2:34 PM",
    },
    {
      id: 3,
      type: "user",
      content:
        "This is really helpful! Can you tell me more about onboarding best practices? I want to make sure users don't drop off.",
      timestamp: "2:36 PM",
    },
    {
      id: 4,
      type: "ai",
      content:
        'Absolutely! User onboarding is critical for retention. Here\'s what works:\n\n**The 3-30-3 Rule:**\n• 3 seconds to grab attention\n• 30 seconds to show core value\n• 3 minutes to complete first meaningful action\n\n**Effective Onboarding Strategies:**\n\n**1. Value-First Approach**\n• Show, don\'t just tell\n• Let users experience the "aha moment" quickly\n• Use progressive onboarding throughout the app\n\n**2. Contextual Guidance**\n• Tooltips appear when relevant\n• Interactive tutorials over static screens\n• Just-in-time help when users need it\n\n**3. Personalization**\n• Ask 1-2 key questions to customize experience\n• Tailor content based on user goals\n• Remember preferences across sessions\n\n**4. Easy Exit Strategy**\n• Always provide "Skip" or "Later" options\n• Don\'t force completion of non-essential steps\n• Allow users to return to onboarding anytime\n\nThe goal is to get users to their first success moment as quickly as possible. What type of app are you building? I can give more specific advice based on your use case.',
      timestamp: "2:37 PM",
    },
  ];

  const baseClasses = "h-screen text-white";

  return (
    <div className={`${baseClasses} overflow-hidden flex relative`}>
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute inset-0 ${isDarkMode ? "bg-gradient-to-br from-slate-900/90 via-purple-900/40 to-slate-900/90" : "bg-gradient-to-br from-slate-100/90 via-purple-100/40 to-slate-100/90"}`}
        />
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 ${isDarkMode ? "bg-purple-500/5" : "bg-purple-300/10"} rounded-full blur-3xl animate-pulse`}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${isDarkMode ? "bg-slate-500/5" : "bg-slate-300/10"} rounded-full blur-3xl animate-pulse`}
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Sidebar Component */}
      <Sidebar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
        conversations={conversations}
        isNewChat={isNewChat}
        handleNewChat={handleNewChat}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header Component */}
        <Header
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />

        {/* New Chat Interface */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Eye-catching New Chat Header */}
          <div className="text-center mb-8 px-4">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-600/20 to-purple-800/30 rounded-2xl flex items-center justify-center border border-purple-600/30 backdrop-blur-sm shadow-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-inner">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white via-purple-200 to-purple-300 bg-clip-text text-transparent">
              Start a New Conversation
            </h1>
            <p className="text-purple-300 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
              Ask me anything - I'm here to help with coding, design, writing,
              research, and much more.
            </p>
          </div>

          {/* Chat Input Area */}
          <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-2.5 sm:p-3">
              <div className="flex items-end gap-2 sm:gap-3">
                <div className="flex-1">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask me anything... I'm here to help!"
                    className="w-full bg-transparent text-white placeholder-gray-400 resize-none outline-none max-h-24 text-xs sm:text-sm"
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
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                  <button className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs transition-colors">
                    ✨ Explain this code
                  </button>
                  <button className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs transition-colors">
                    🎨 Design ideas
                  </button>
                  <button className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs transition-colors">
                    📝 Write content
                  </button>
                  <button className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs transition-colors">
                    🔍 Research topic
                  </button>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button className="p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleStartChat(message)}
                    disabled={!message.trim()}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-purple-800/50 disabled:to-purple-900/50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 flex items-center gap-1.5 sm:gap-2 font-medium text-xs sm:text-sm"
                  >
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v8"
                      />
                    </svg>
                    Start Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className={`lg:hidden fixed top-3 left-3 z-40 p-2 ${isDarkMode ? "bg-slate-800/90 hover:bg-slate-700/90 border-purple-700/50" : "bg-white/90 hover:bg-purple-50/90 border-purple-200"} border rounded-lg backdrop-blur-md transition-all duration-200 ${isDarkMode ? "text-purple-300" : "text-purple-600"} shadow-lg`}
        aria-label="Open menu"
      >
        <Menu size={16} />
      </button>
    </div>
  );
}
