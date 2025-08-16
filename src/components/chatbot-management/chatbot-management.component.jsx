"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  FolderOpen,
  MessageSquare,
  Calendar,
  Star,
  MoreVertical,
  Edit,
  Trash2,
  Settings,
} from "lucide-react";
import Link from "next/link";

const ChatbotManagement = ({ onChatbotSelect, onCreateChatbot }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChatbot, setSelectedChatbot] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newChatbotData, setNewChatbotData] = useState({
    name: "",
    description: "",
    category: "general",
    isFavorite: false,
  });

  // Sample chatbots data - this would come from your backend
  const [chatbots] = useState([
    {
      id: 1,
      name: "Mobile App Development",
      description:
        "All conversations related to mobile app development, UX design, and React Native",
      category: "development",
      conversationCount: 12,
      lastActive: "2 hours ago",
      isFavorite: true,
      color: "from-blue-500 to-purple-600",
    },
    {
      id: 2,
      name: "Content Writing Assistant",
      description:
        "Help with blog posts, articles, and creative writing projects",
      category: "writing",
      conversationCount: 8,
      lastActive: "1 day ago",
      isFavorite: false,
      color: "from-green-500 to-teal-600",
    },
    {
      id: 3,
      name: "Code Review & Debugging",
      description: "Code analysis, bug fixing, and performance optimization",
      category: "development",
      conversationCount: 15,
      lastActive: "3 hours ago",
      isFavorite: true,
      color: "from-orange-500 to-red-600",
    },
    {
      id: 4,
      name: "Business Strategy",
      description:
        "Market analysis, business planning, and strategic decisions",
      category: "business",
      conversationCount: 6,
      lastActive: "2 days ago",
      isFavorite: false,
      color: "from-purple-500 to-indigo-600",
    },
    {
      id: 5,
      name: "Learning & Education",
      description: "Study help, concept explanations, and educational content",
      category: "education",
      conversationCount: 9,
      lastActive: "5 hours ago",
      isFavorite: true,
      color: "from-yellow-500 to-orange-600",
    },
  ]);

  const categories = [
    { id: "all", name: "All Chatbots", count: chatbots.length },
    {
      id: "development",
      name: "Development",
      count: chatbots.filter((c) => c.category === "development").length,
    },
    {
      id: "writing",
      name: "Writing",
      count: chatbots.filter((c) => c.category === "writing").length,
    },
    {
      id: "business",
      name: "Business",
      count: chatbots.filter((c) => c.category === "business").length,
    },
    {
      id: "education",
      name: "Education",
      count: chatbots.filter((c) => c.category === "education").length,
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredChatbots = chatbots.filter((chatbot) => {
    const matchesSearch =
      chatbot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chatbot.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || chatbot.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newChatbotData.name.trim()) {
      const newChatbot = {
        id: Date.now(),
        ...newChatbotData,
        conversationCount: 0,
        lastActive: "Just now",
        color: "from-purple-500 to-indigo-600",
      };
      onCreateChatbot(newChatbot);
      setNewChatbotData({
        name: "",
        description: "",
        category: "general",
        isFavorite: false,
      });
      setShowCreateForm(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">My Chatbots</h2>
          <p className="text-sm text-purple-300">
            Manage your AI chatbot projects and conversations
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
        >
          <Plus className="w-4 h-4" />
          New Chatbot
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400 z-10" />
          <input
            type="text"
            placeholder="Search chatbots..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-400 outline-none transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                selectedCategory === category.id
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white/10 text-purple-300 hover:bg-white/20 border border-white/20"
              }`}
            >
              {category.name}
              <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Chatbots Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredChatbots.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              No chatbots found
            </h3>
            <p className="text-purple-300 mb-4">
              {searchQuery || selectedCategory !== "all"
                ? "Try adjusting your search or filters"
                : "Create your first chatbot to get started"}
            </p>
            {!searchQuery && selectedCategory === "all" && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Create Chatbot
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredChatbots.map((chatbot) => (
              <div
                key={chatbot.id}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all duration-200 cursor-pointer group"
                onClick={() => onChatbotSelect(chatbot)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-sm mb-1 truncate">
                      {chatbot.name}
                    </h3>
                    <p className="text-xs text-purple-300 line-clamp-2">
                      {chatbot.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    {chatbot.isFavorite && (
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    )}
                    <button
                      className="p-1 hover:bg-white/20 rounded transition-colors opacity-0 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle more options
                      }}
                    >
                      <MoreVertical className="w-4 h-4 text-purple-300" />
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-purple-300">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    <span>{chatbot.conversationCount} chats</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{chatbot.lastActive}</span>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="mt-3">
                  <span className="inline-block px-2 py-1 bg-white/10 border border-white/20 rounded-md text-xs text-purple-300">
                    {chatbot.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Chatbot Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-white/20 rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                Create New Chatbot
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
                  Name
                </label>
                <input
                  type="text"
                  value={newChatbotData.name}
                  onChange={(e) =>
                    setNewChatbotData({
                      ...newChatbotData,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-400 outline-none transition-all"
                  placeholder="Enter chatbot name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newChatbotData.description}
                  onChange={(e) =>
                    setNewChatbotData({
                      ...newChatbotData,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-400 outline-none transition-all resize-none"
                  placeholder="Describe what this chatbot is for"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-300 mb-2">
                  Category
                </label>
                <select
                  value={newChatbotData.category}
                  onChange={(e) =>
                    setNewChatbotData({
                      ...newChatbotData,
                      category: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white outline-none transition-all"
                >
                  <option value="general">General</option>
                  <option value="development">Development</option>
                  <option value="writing">Writing</option>
                  <option value="business">Business</option>
                  <option value="education">Education</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="favorite"
                  checked={newChatbotData.isFavorite}
                  onChange={(e) =>
                    setNewChatbotData({
                      ...newChatbotData,
                      isFavorite: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded outline-none"
                />
                <label htmlFor="favorite" className="text-sm text-purple-300">
                  Add to favorites
                </label>
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
                  Create Chatbot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotManagement;
