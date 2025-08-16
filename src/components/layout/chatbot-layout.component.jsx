"use client";

import { useState } from "react";
import Header from "../header/header.component";
import Sidebar from "../sidebar/sidebar.component";
import { conversations } from "../../data/conversations";

export default function ChatbotLayout({ children, title = "Chatbots" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleNewChat = () => {
    // Navigate to new chat
    console.log("New chat clicked");
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900/90 via-purple-900/40 to-slate-900/90 text-white relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/40 to-slate-900/90" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 h-full flex">
        {/* Sidebar */}
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
          isNewChat={false}
          handleNewChat={handleNewChat}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Main Content */}
          <div className="flex-1 overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  );
}
