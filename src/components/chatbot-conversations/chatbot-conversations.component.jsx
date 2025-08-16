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
    <div className="h-full flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToChatbots}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-purple-300 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-semibold text-white mb-1">
              {chatbot.name}
            </h2>
            <p className="text-sm text-purple-300">
              {chatbot.conversationCount} conversations • {chatbot.lastActive}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
        >
          <Plus className="w-4 h-4" />
          New Conversation
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400 z-10" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-400 outline-none transition-all"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              No conversations found
            </h3>
            <p className="text-purple-300 mb-4">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Start your first conversation to get started"}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Start Conversation
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all duration-200 cursor-pointer group"
                onClick={() => setSelectedConversation(conv.id)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white text-sm truncate">
                        {conv.title}
                      </h3>
                      {conv.isStarred && (
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      )}
                    </div>
                    <p className="text-xs text-purple-300 line-clamp-2">
                      {conv.preview}
                    </p>
                  </div>
                  <button
                    className={`p-1 hover:bg-white/20 rounded transition-colors ${
                      showContextMenu === conv.id
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowContextMenu(conv.id);
                    }}
                  >
                    <MoreVertical className="w-4 h-4 text-purple-300" />
                  </button>
                </div>

                {/* Last Message */}
                {conv.lastMessage && (
                  <div className="mb-3">
                    <p className="text-xs text-white/80 line-clamp-1">
                      {conv.lastMessage}
                    </p>
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-purple-300">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    <span>{conv.messageCount} messages</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{conv.timestamp}</span>
                  </div>
                </div>

                {/* Context Menu */}
                {showContextMenu === conv.id && (
                  <div className="absolute right-2 top-8 bg-slate-800/95 border-purple-700/50 backdrop-blur-md border rounded-lg shadow-xl z-20 min-w-32 sm:min-w-36 py-1">
                    <button
                      className="w-full flex items-center gap-2 px-2 py-1.5 text-xs hover:bg-purple-700/30 transition-colors text-purple-200"
                      onClick={() => setShowContextMenu(null)}
                    >
                      <Edit className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Rename
                    </button>
                    <button
                      className="w-full flex items-center gap-2 px-2 py-1.5 text-xs hover:bg-purple-700/30 transition-colors text-purple-200"
                      onClick={() => setShowContextMenu(null)}
                    >
                      <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Share
                    </button>
                    <button
                      className="w-full flex items-center gap-2 px-2 py-1.5 text-xs hover:bg-red-900/30 transition-colors text-red-400"
                      onClick={() => setShowContextMenu(null)}
                    >
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      {conv.isStarred
                        ? "Remove from favorites"
                        : "Add to favorites"}
                    </button>
                    <hr className="my-1 border-purple-700/50" />
                    <button
                      className="w-full flex items-center gap-2 px-2 py-1.5 text-xs hover:bg-red-900/30 transition-colors text-red-400"
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-white/20 rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                Start New Conversation
              </h3>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-purple-300 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
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
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-400 outline-none transition-all"
                  placeholder="What would you like to discuss?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
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
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-400 outline-none transition-all resize-none"
                  placeholder="Add some context about this conversation..."
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
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
