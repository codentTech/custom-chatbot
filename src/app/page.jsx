"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "../components/sidebar/sidebar.component";
import ChatArea from "../components/chat-area/chat-area.component";

// Main Component
export default function AIChatbotUI() {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState(1);

  const conversations = [
    {
      id: 1,
      title: "Mobile App UX Design",
      time: "2m ago",
      preview: "Help me create a roadmap...",
      starred: true,
      unread: 2,
    },
    {
      id: 2,
      title: "React Code Review",
      time: "1h ago",
      preview: "Can you review this component...",
      starred: false,
      unread: 0,
    },
    {
      id: 3,
      title: "Creative Writing Helper",
      time: "3h ago",
      preview: "Character development ideas...",
      starred: true,
      unread: 1,
    },
    {
      id: 4,
      title: "Math Problem Solver",
      time: "1d ago",
      preview: "Solve this calculus equation...",
      starred: false,
      unread: 0,
    },
    {
      id: 5,
      title: "Travel Planning",
      time: "2d ago",
      preview: "Plan a 7-day trip to Japan...",
      starred: false,
      unread: 0,
    },
    {
      id: 6,
      title: "Business Strategy",
      time: "3d ago",
      preview: "Market analysis discussion...",
      starred: false,
      unread: 0,
    },
    {
      id: 7,
      title: "Learning Python",
      time: "1w ago",
      preview: "Best practices for beginners...",
      starred: true,
      unread: 0,
    },
    {
      id: 8,
      title: "Travel Planning",
      time: "2d ago",
      preview: "Plan a 7-day trip to Japan...",
      starred: false,
      unread: 0,
    },
    {
      id: 9,
      title: "Business Strategy",
      time: "3d ago",
      preview: "Market analysis discussion...",
      starred: false,
      unread: 0,
    },
    {
      id: 10,
      title: "Learning Python",
      time: "1w ago",
      preview: "Best practices for beginners...",
      starred: true,
      unread: 0,
    },
  ];

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

  const baseClasses = isDarkMode
    ? "h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white"
    : "h-screen bg-gradient-to-b from-slate-100 via-purple-100 to-slate-100 text-slate-900";

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
      />

      {/* Chat Area Component */}
      <ChatArea
        isDarkMode={isDarkMode}
        chatMessages={chatMessages}
        message={message}
        setMessage={setMessage}
        isRecording={isRecording}
        setIsRecording={setIsRecording}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

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
        className={`lg:hidden fixed top-4 left-4 z-40 p-2.5 ${isDarkMode ? "bg-slate-800/90 hover:bg-slate-700/90 border-purple-700/50" : "bg-white/90 hover:bg-purple-50/90 border-purple-200"} border rounded-xl backdrop-blur-md transition-all duration-200 ${isDarkMode ? "text-purple-300" : "text-purple-600"} shadow-lg`}
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>
    </div>
  );
}
