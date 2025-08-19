"use client";

import {
  Calendar,
  FolderOpen,
  MessageSquare,
  Plus,
  Search,
  Star,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ChatbotManagement = ({ onCreateChatbot }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
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
      name: "Development",
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
      name: "Writing",
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
      name: "Code Review",
      description: "Code analysis, bug fixing, and performance optimization",
      category: "development",
      conversationCount: 15,
      lastActive: "3 hours ago",
      isFavorite: true,
      color: "from-orange-500 to-red-600",
    },
    {
      id: 4,
      name: "Business",
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
      name: "Learning",
      description: "Study help, concept explanations, and educational content",
      category: "education",
      conversationCount: 9,
      lastActive: "5 hours ago",
      isFavorite: true,
      color: "from-yellow-500 to-orange-600",
    },
  ]);

  const categories = [
    { id: "all", name: "All", count: chatbots.length },
    {
      id: "development",
      name: "Dev",
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
      name: "Edu",
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
    <div className="h-full flex flex-col">
      {/* Main Container with Max Width */}
      <div className="max-w-6xl mx-auto w-full px-3 sm:px-4 md:px-6 py-4 sm:py-6 flex flex-col h-full">
        {/* Enhanced Header Section with Responsive Flex Layout */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-4 sm:mb-6 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
              My Chatbots
            </h2>
            <p className="text-xs sm:text-sm text-purple-300">
              Manage your AI chatbot projects and conversations
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 font-medium text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">New Chatbot</span>
            <span className="xs:hidden">New</span>
          </button>
        </div>

        {/* Search and Filters Section - Responsive Layout */}
        <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-0 sm:flex sm:flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-4 flex-shrink-0">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
            <input
              type="text"
              placeholder="Search chatbots..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-400 outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Category Filter - Horizontal Scroll on Mobile */}
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-1 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                  selectedCategory === category.id
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
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

        {/* Compact Chatbots Grid - Responsive */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 min-h-0">
          {filteredChatbots.length === 0 ? (
            <div className="text-center py-6 sm:py-8 md:py-12">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FolderOpen className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                No chatbots found
              </h3>
              <p className="text-purple-300 mb-3 sm:mb-4 text-sm max-w-md mx-auto px-4">
                {searchQuery || selectedCategory !== "all"
                  ? "Try adjusting your search or filters"
                  : "Create your first chatbot to get started"}
              </p>
              {!searchQuery && selectedCategory === "all" && (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-colors text-sm font-medium"
                >
                  Create Chatbot
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-3 sm:gap-2 lg:gap-4 pb-4">
              {filteredChatbots.map((chatbot) => (
                <div
                  key={chatbot.id}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg sm:rounded-xl p-3 sm:p-4 transition-all duration-200 cursor-pointer w-full hover:bg-white/15 hover:border-white/30 hover:shadow-lg hover:shadow-purple-500/10"
                  onClick={() => router.push(`/chatbots/${chatbot.id}`)}
                >
                  {/* Compact Header */}
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div className="flex-1 min-w-0 pr-2">
                      <h3 className="font-semibold text-white text-sm sm:text-base mb-1.5 sm:mb-2 truncate">
                        {chatbot.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-purple-300 line-clamp-2 leading-relaxed">
                        {chatbot.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                      {chatbot.isFavorite && (
                        <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                      )}
                    </div>
                  </div>

                  {/* Compact Stats */}
                  <div className="flex items-center justify-between text-xs text-purple-300 mb-2 sm:mb-3">
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-3 h-3" />
                      <span className="font-medium">
                        {chatbot.conversationCount}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      <span className="text-xs truncate">
                        {chatbot.lastActive}
                      </span>
                    </div>
                  </div>

                  {/* Compact Category Badge */}
                  <div>
                    <span className="inline-block px-2 py-1 bg-white/10 border border-white/20 rounded-md text-xs text-purple-300 font-medium">
                      {chatbot.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Compact Create Chatbot Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
            <div className="bg-slate-800 border border-white/20 rounded-xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md mx-auto max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Create New Chatbot
                </h3>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="text-purple-300 hover:text-white transition-colors p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-purple-300 mb-1.5 sm:mb-2">
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
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-400 outline-none transition-all text-sm font-medium"
                    placeholder="Enter chatbot name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-purple-300 mb-1.5 sm:mb-2">
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
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-400 outline-none transition-all text-sm font-medium resize-none"
                    placeholder="Describe your chatbot's purpose"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-purple-300 mb-1.5 sm:mb-2">
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
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white outline-none transition-all text-sm font-medium"
                  >
                    <option value="general" className="bg-slate-800 text-white">
                      General
                    </option>
                    <option
                      value="development"
                      className="bg-slate-800 text-white"
                    >
                      Development
                    </option>
                    <option value="writing" className="bg-slate-800 text-white">
                      Writing
                    </option>
                    <option
                      value="business"
                      className="bg-slate-800 text-white"
                    >
                      Business
                    </option>
                    <option
                      value="education"
                      className="bg-slate-800 text-white"
                    >
                      Education
                    </option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isFavorite"
                    checked={newChatbotData.isFavorite}
                    onChange={(e) =>
                      setNewChatbotData({
                        ...newChatbotData,
                        isFavorite: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-purple-600 bg-transparent border-purple-500 rounded focus:ring-purple-500"
                  />
                  <label
                    htmlFor="isFavorite"
                    className="text-sm text-purple-300 cursor-pointer"
                  >
                    Mark as favorite
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2.5 sm:py-3 px-4 rounded-lg transition-colors text-sm font-medium"
                  >
                    Create Chatbot
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2.5 sm:py-3 px-4 rounded-lg transition-colors text-sm font-medium border border-white/20"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatbotManagement;
