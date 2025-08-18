"use client";

import {
  Calendar,
  FolderOpen,
  MessageSquare,
  MoreVertical,
  Plus,
  Search,
  Star,
} from "lucide-react";
import { useState } from "react";

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
    <div
      className="h-full flex flex-col chatbot-management-container"
      style={{ padding: "0.5rem" }}
    >
      {/* Header Section */}
      <div
        className="flex flex-col gap-3 mb-4 chatbot-management-header"
        style={{ gap: "0.75rem", marginBottom: "1rem" }}
      >
        <div className="text-center">
          <h2
            className="font-bold text-white mb-2 chatbot-management-title"
            style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}
          >
            My Chatbots
          </h2>
          <p
            className="text-purple-300 max-w-2xl mx-auto chatbot-management-description"
            style={{ fontSize: "0.875rem" }}
          >
            Manage your AI chatbot projects and conversations
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 font-semibold mx-auto chatbot-management-button"
          style={{ padding: "1rem 1.5rem" }}
        >
          <Plus className="w-4 h-4" />
          New Chatbot
        </button>
      </div>

      {/* Search and Filters */}
      <div
        className="flex flex-col gap-3 mb-4"
        style={{ gap: "0.75rem", marginBottom: "1rem" }}
      >
        {/* Search */}
        <div className="w-full relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400 z-10" />
          <input
            type="text"
            placeholder="Search chatbots..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-400 outline-none transition-all font-medium chatbot-management-search"
            style={{ padding: "0.75rem 1rem 0.75rem 2.5rem" }}
          />
        </div>

        {/* Category Filter */}
        <div
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide chatbot-management-filters"
          style={{ gap: "0.5rem", paddingBottom: "0.5rem" }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex-shrink-0 chatbot-management-filter-button ${
                selectedCategory === category.id
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                  : "bg-white/10 text-purple-300 hover:bg-white/20 border border-white/20"
              }`}
              style={{ padding: "0.5rem 0.75rem" }}
            >
              {category.name}
              <span
                className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs"
                style={{ marginLeft: "0.5rem", padding: "0.25rem 0.5rem" }}
              >
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Chatbots Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredChatbots.length === 0 ? (
          <div className="text-center py-8" style={{ padding: "2rem 0" }}>
            <div
              className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ width: "4rem", height: "4rem", marginBottom: "1rem" }}
            >
              <FolderOpen className="w-8 h-8 text-purple-400" />
            </div>
            <h3
              className="text-lg font-semibold text-white mb-2"
              style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}
            >
              No chatbots found
            </h3>
            <p
              className="text-purple-300 mb-4 text-sm max-w-md mx-auto"
              style={{ marginBottom: "1rem", fontSize: "0.875rem" }}
            >
              {searchQuery || selectedCategory !== "all"
                ? "Try adjusting your search or filters"
                : "Create your first chatbot to get started"}
            </p>
            {!searchQuery && selectedCategory === "all" && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition-colors text-sm font-semibold"
                style={{ padding: "0.75rem 1.5rem" }}
              >
                Create Chatbot
              </button>
            )}
          </div>
        ) : (
          <div
            className="grid grid-cols-1 gap-3 chatbot-management-grid"
            style={{ gap: "0.75rem" }}
          >
            {filteredChatbots.map((chatbot) => (
              <div
                key={chatbot.id}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 hover:bg-white/15 transition-all duration-200 cursor-pointer group hover:scale-105 hover:shadow-xl chatbot-management-card"
                onClick={() => onChatbotSelect(chatbot)}
                style={{ padding: "0.75rem" }}
              >
                {/* Header */}
                <div
                  className="flex items-start justify-between mb-3"
                  style={{ marginBottom: "0.75rem" }}
                >
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-bold text-white text-sm mb-2 truncate chatbot-management-card-title"
                      style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}
                    >
                      {chatbot.name}
                    </h3>
                    <p
                      className="text-xs text-purple-300 line-clamp-2 leading-relaxed chatbot-management-card-description"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {chatbot.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                    {chatbot.isFavorite && (
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    )}
                    <button
                      className="p-1.5 hover:bg-white/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle more options
                      }}
                      style={{ padding: "0.375rem" }}
                    >
                      <MoreVertical className="w-4 h-4 text-purple-300" />
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div
                  className="flex items-center justify-between text-xs text-purple-300 mb-3"
                  style={{ fontSize: "0.75rem", marginBottom: "0.75rem" }}
                >
                  <div
                    className="flex items-center gap-1.5"
                    style={{ gap: "0.375rem" }}
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span className="font-medium">
                      {chatbot.conversationCount} chats
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-1.5"
                    style={{ gap: "0.375rem" }}
                  >
                    <Calendar className="w-3 h-3" />
                    <span className="font-medium">{chatbot.lastActive}</span>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="mt-3" style={{ marginTop: "0.75rem" }}>
                  <span
                    className="inline-block px-2 py-1 bg-white/10 border border-white/20 rounded-lg text-xs text-purple-300 font-semibold"
                    style={{ padding: "0.25rem 0.5rem" }}
                  >
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 md:p-4 lg:p-6">
          <div className="bg-slate-800 border border-white/20 rounded-xl p-4 md:p-6 lg:p-8 w-full max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4 md:mb-6 lg:mb-8">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white">
                Create New Chatbot
              </h3>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-purple-300 hover:text-white transition-colors p-1 md:p-2"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-5 lg:space-y-6"
            >
              <div>
                <label className="block text-sm md:text-base lg:text-lg font-semibold text-purple-300 mb-2 md:mb-3">
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
                  className="w-full px-3 md:px-4 lg:px-5 py-2 md:py-3 lg:py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-400 outline-none transition-all text-sm md:text-base font-medium"
                  placeholder="Enter chatbot name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm md:text-base lg:text-lg font-semibold text-purple-300 mb-2 md:mb-3">
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
                  className="w-full px-3 md:px-4 lg:px-5 py-2 md:py-3 lg:py-4 bg-white/10 border border-white/20 rounded-xl text-white outline-none transition-all resize-none text-sm md:text-base font-medium"
                  placeholder="Describe what this chatbot is for"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm md:text-base lg:text-lg font-semibold text-purple-300 mb-2 md:mb-3">
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
                  className="w-full px-3 md:px-4 lg:px-5 py-2 md:py-3 lg:py-4 bg-white/10 border border-white/20 rounded-xl text-white outline-none transition-all text-sm md:text-base font-medium"
                >
                  <option value="general">General</option>
                  <option value="development">Development</option>
                  <option value="writing">Writing</option>
                  <option value="business">Business</option>
                  <option value="education">Education</option>
                </select>
              </div>

              <div className="flex items-center gap-2 md:gap-3">
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
                  className="w-4 h-4 md:w-5 md:h-5 text-purple-600 bg-white/10 border-white/20 rounded outline-none"
                />
                <label
                  htmlFor="favorite"
                  className="text-sm md:text-base lg:text-lg text-purple-300 font-medium"
                >
                  Add to favorites
                </label>
              </div>

              <div className="flex gap-3 md:gap-4 pt-2 md:pt-4 lg:pt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors border border-white/20 text-sm md:text-base font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors text-sm md:text-base font-semibold"
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
