"use client";

import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Search,
  MessageSquare,
  Calendar,
  Star,
  Edit,
  MoreVertical,
  ArrowLeft,
} from "lucide-react";

const ChatbotConversations = ({
  chatbot,
  onBackToChatbots,
  onNewConversation,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(null);
  const [newConversationData, setNewConversationData] = useState({
    title: "",
    description: "",
  });

  // Sample conversations data - this would come from your backend
  const [conversations] = useState([
    {
      id: 1,
      title: "UX Design Best Practices",
      preview:
        "Discussion about mobile app UX design principles and current trends...",
      lastMessage: "What are the key principles for mobile-first design?",
      timestamp: "2 hours ago",
      messageCount: 24,
      isStarred: true,
    },
    {
      id: 2,
      title: "React Native Performance",
      preview:
        "Optimizing React Native app performance and reducing bundle size...",
      lastMessage: "How can I reduce the app bundle size?",
      timestamp: "1 day ago",
      messageCount: 18,
      isStarred: false,
    },
    {
      id: 3,
      title: "User Onboarding Flow",
      preview:
        "Designing an effective user onboarding experience for new users...",
      lastMessage: "What's the optimal number of onboarding steps?",
      timestamp: "3 days ago",
      messageCount: 31,
      isStarred: true,
    },
    {
      id: 4,
      title: "API Integration Strategy",
      preview: "Planning the backend API integration and data flow...",
      lastMessage: "Should I use REST or GraphQL for this project?",
      timestamp: "1 week ago",
      messageCount: 15,
      isStarred: false,
    },
    {
      id: 5,
      title: "Testing Strategy",
      preview: "Implementing comprehensive testing for the mobile app...",
      lastMessage: "What testing frameworks do you recommend?",
      timestamp: "2 weeks ago",
      messageCount: 22,
      isStarred: false,
    },
  ]);

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newConversationData.title.trim()) {
      const newConversation = {
        id: Date.now(),
        ...newConversationData,
        preview: "Start a new conversation...",
        lastMessage: "",
        timestamp: "Just now",
        messageCount: 0,
        isStarred: false,
      };
      onNewConversation(newConversation);
      setNewConversationData({
        title: "",
        description: "",
      });
      setShowCreateForm(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-2 md:p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6 lg:mb-8">
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={onBackToChatbots}
            className="p-1.5 md:p-2 lg:p-3 hover:bg-white/10 rounded-xl transition-colors text-purple-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </button>
          <div>
            <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-1 md:mb-2">
              {chatbot.name}
            </h2>
            <p className="text-xs md:text-sm text-purple-300">
              {chatbot.conversationCount} conversations • {chatbot.lastActive}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-3 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 rounded-xl flex items-center justify-center gap-2 md:gap-3 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 text-sm md:text-base lg:text-lg font-semibold"
        >
          <Plus className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
          New Conversation
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 md:mb-6 lg:mb-8">
        <div className="relative">
          <Search className="absolute left-3 md:left-4 lg:left-5 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-purple-400 z-10" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 md:pl-12 lg:pl-14 pr-4 md:pr-6 py-2 md:py-3 lg:py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-400 outline-none transition-all text-sm md:text-base font-medium"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-8 sm:py-12 md:py-16 lg:py-20">
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6">
              <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-purple-400" />
            </div>
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3">
              No conversations found
            </h3>
            <p className="text-purple-300 mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base md:text-lg max-w-md mx-auto">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Start your first conversation to get started"}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-xl transition-colors text-sm sm:text-base md:text-lg font-semibold"
              >
                Start Conversation
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-2.5 sm:p-3 md:p-4 hover:bg-white/15 transition-all duration-200 cursor-pointer group hover:scale-105 hover:shadow-xl"
                onClick={() => setSelectedConversation(conv.id)}
              >
                {/* Compact Header - Single Line */}
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                      <h3 className="font-bold text-white text-sm sm:text-base md:text-lg lg:text-xl truncate">
                        {conv.title}
                      </h3>
                      {conv.isStarred && (
                        <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-yellow-400 fill-current flex-shrink-0" />
                      )}
                    </div>
                  </div>
                  <button
                    className={`p-1 sm:p-1.5 md:p-2 hover:bg-white/20 rounded-lg transition-colors ${
                      showContextMenu === conv.id
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowContextMenu(conv.id);
                    }}
                  >
                    <MoreVertical className="w-3 h-3 text-purple-300" />
                  </button>
                </div>

                {/* Context Menu */}
                {showContextMenu === conv.id && (
                  <div className="absolute right-2 top-8 bg-slate-800/95 border-purple-700/50 backdrop-blur-md border rounded-xl shadow-xl z-20 min-w-28 sm:min-w-32 lg:min-w-36 py-1">
                    <button
                      className="w-full flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 text-xs hover:bg-purple-700/30 transition-colors text-purple-200"
                      onClick={() => setShowContextMenu(null)}
                    >
                      <Edit className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Rename
                    </button>
                    <button
                      className="w-full flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 text-xs hover:bg-purple-700/30 transition-colors text-purple-200"
                      onClick={() => setShowContextMenu(null)}
                    >
                      <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Share
                    </button>
                    <button
                      className="w-full flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 text-xs hover:bg-red-900/30 transition-colors text-red-400"
                      onClick={() => setShowContextMenu(null)}
                    >
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      {conv.isStarred
                        ? "Remove from favorites"
                        : "Add to favorites"}
                    </button>
                    <hr className="my-1 border-purple-700/50" />
                    <button
                      className="w-full flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 text-xs hover:bg-red-900/30 transition-colors text-red-400"
                      onClick={() => setShowContextMenu(null)}
                    >
                      <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-red-400 rounded-sm"></div>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Conversation Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 md:p-6">
          <div className="bg-slate-800 border border-white/20 rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                Start New Conversation
              </h3>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-purple-300 hover:text-white transition-colors p-1 sm:p-2"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-3 sm:space-y-4 md:space-y-6"
            >
              <div>
                <label className="block text-sm sm:text-base md:text-lg font-semibold text-purple-300 mb-2 sm:mb-3">
                  Title
                </label>
                <input
                  type="text"
                  value={newConversationData.title}
                  onChange={(e) =>
                    setNewConversationData({
                      ...newConversationData,
                      title: e.target.value,
                    })
                  }
                  className="w-full px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-400 outline-none transition-all text-sm sm:text-base md:text-lg font-medium"
                  placeholder="What would you like to discuss?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base md:text-lg font-semibold text-purple-300 mb-2 sm:mb-3">
                  Description (Optional)
                </label>
                <textarea
                  value={newConversationData.description}
                  onChange={(e) =>
                    setNewConversationData({
                      ...newConversationData,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-400 outline-none transition-all resize-none text-sm sm:text-base md:text-lg font-medium"
                  placeholder="Add some context about this conversation..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-4 md:pt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors border border-white/20 text-sm sm:text-base md:text-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors text-sm sm:text-base md:text-lg font-semibold"
                >
                  Start Conversation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotConversations;
