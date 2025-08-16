"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Archive,
  Bot,
  Brain,
  ChevronLeft,
  ChevronRight,
  Edit3,
  MessageSquare,
  MoreVertical,
  Plus,
  Search,
  Settings,
  Share2,
  Star,
  Trash2,
} from "lucide-react";

function Sidebar({
  sidebarOpen = true,
  setSidebarOpen = () => {},
  searchQuery = "",
  setSearchQuery = () => {},
  selectedConversation = 1,
  setSelectedConversation = () => {},
  conversations = [],
  handleNewChat = () => {},
}) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredConv, setHoveredConv] = useState(null);
  const [showContextMenu, setShowContextMenu] = useState(null);
  const [activeSection, setActiveSection] = useState("chats");

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleContextMenu = (e, convId) => {
    e.preventDefault();
    e.stopPropagation();
    setShowContextMenu(showContextMenu === convId ? null : convId);
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigationItems = [
    {
      id: "projects",
      label: "Chatbots",
      icon: Bot,
      count: 3,
    },
    {
      id: "favorites",
      label: "Favorites",
      icon: Star,
      count: 3,
    },
  ];

  return (
    <>
      {/* Click outside to close context menu */}
      {showContextMenu && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowContextMenu(null)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          collapsed ? "w-16" : "w-80"
        } bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 border-r border-purple-800/30 transition-all duration-300 ease-in-out flex-shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:relative z-30 h-full flex flex-col`}
      >
        {/* Header */}
        <div
          className={`flex items-center ${
            collapsed
              ? "justify-center px-2 py-3"
              : "justify-between p-2.5 sm:p-3"
          } border-b border-purple-800/30 flex-shrink-0`}
        >
          {!collapsed && (
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-slate-700 via-purple-600 to-slate-700 rounded-lg flex items-center justify-center shadow-lg">
                <Brain className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="font-semibold text-white text-xs sm:text-sm">
                NeuralFlow
              </span>
            </div>
          )}

          <button
            onClick={toggleSidebar}
            className="p-1.5 sm:p-1.5 rounded-lg hover:bg-purple-800/20 transition-colors text-purple-300 flex-shrink-0"
            aria-label="Toggle sidebar"
          >
            {collapsed ? (
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            ) : (
              <ChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            )}
          </button>
        </div>

        {/* New Chat Button */}
        <div
          className={`${collapsed ? "px-2" : "px-2.5 sm:px-3"} py-2.5 flex-shrink-0`}
        >
          {collapsed ? (
            <button
              onClick={handleNewChat}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-800/30 hover:bg-purple-700/40 border-purple-700/50 border rounded-lg transition-all duration-200 flex items-center justify-center mx-auto group relative"
              title="New chat"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300" />
              {/* Tooltip */}
              <div className="absolute left-16 bg-slate-800 text-white border-purple-700/50 px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border pointer-events-none">
                New chat
              </div>
            </button>
          ) : (
            <button
              onClick={handleNewChat}
              className="w-full bg-gradient-to-r from-purple-800/30 via-purple-700/40 to-purple-800/30 hover:from-purple-700/40 hover:via-purple-600/50 hover:to-purple-700/40 border-purple-700/50 text-purple-200 border rounded-lg py-1 px-2.5 sm:px-3 font-medium transition-all duration-200 flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-200" />
              New Chat
            </button>
          )}
        </div>

        {/* Search - Only show when not collapsed */}
        {!collapsed && (
          <div className="px-2.5 sm:px-3 pb-3 flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400 z-10" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-1.5 bg-slate-800/50 border-purple-700/50 text-white placeholder-purple-400 border rounded-lg text-xs outline-none transition-all"
              />
            </div>
          </div>
        )}

        {/* Chatbots Section - Only show when not collapsed */}
        {!collapsed && (
          <div className="px-2.5 sm:px-3 pb-3 flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                Chatbots
              </h3>
              <button
                onClick={() => router.push("/chatbots")}
                className="p-1 hover:bg-white/10 rounded transition-colors text-purple-400 hover:text-white"
                title="Manage chatbots"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Quick Chatbot Access */}
            <div className="space-y-1">
              <button
                onClick={() => router.push("/chatbots/1")}
                className="w-full flex items-center justify-between px-2 py-1 hover:bg-white/10 rounded transition-colors text-left group"
              >
                <span className="text-white text-xs font-medium">
                  Development
                </span>
                <span className="text-purple-400 text-xs">12 chats</span>
              </button>

              <button
                onClick={() => router.push("/chatbots/2")}
                className="w-full flex items-center justify-between px-2 py-1 hover:bg-white/10 rounded transition-colors text-left group"
              >
                <span className="text-white text-xs font-medium">Writing</span>
                <span className="text-purple-400 text-xs">8 chats</span>
              </button>

              <button
                onClick={() => router.push("/chatbots/3")}
                className="w-full flex items-center justify-between px-2 py-1 hover:bg-white/10 rounded transition-colors text-left group"
              >
                <span className="text-white text-xs font-medium">
                  Code Review
                </span>
                <span className="text-purple-400 text-xs">15 chats</span>
              </button>

              <button
                onClick={() => router.push("/chatbots/4")}
                className="w-full flex items-center justify-between px-2 py-1 hover:bg-white/10 rounded transition-colors text-left group"
              >
                <span className="text-white text-xs font-medium">Business</span>
                <span className="text-purple-400 text-xs">6 chats</span>
              </button>

              <button
                onClick={() => router.push("/chatbots/5")}
                className="w-full flex items-center justify-between px-2 py-1 hover:bg-white/10 rounded transition-colors text-left group"
              >
                <span className="text-white text-xs font-medium">Learning</span>
                <span className="text-purple-400 text-xs">9 chats</span>
              </button>
            </div>

            <button
              onClick={() => router.push("/chatbots")}
              className="w-full mt-1.5 px-2 py-1 text-xs text-purple-300 hover:text-white hover:bg-white/10 rounded transition-colors font-medium"
            >
              View All →
            </button>
          </div>
        )}

        {/* Divider */}
        <hr className="border-t border-purple-600/50 mx-2.5 sm:mx-3 mb-3 flex-shrink-0" />

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto px-1.5 min-h-0 custom-scrollbar">
          <div className="space-y-0.5">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                className="relative group"
                onMouseEnter={() => setHoveredConv(conv.id)}
                onMouseLeave={() => setHoveredConv(null)}
              >
                <button
                  onClick={() => {
                    setSelectedConversation(conv.id);
                    router.push(`/chat/${conv.id}`);
                  }}
                  className={`w-full flex items-center px-2 py-0.5 rounded transition-all duration-200 ${
                    selectedConversation === conv.id
                      ? "bg-gradient-to-r from-purple-800/40 via-purple-700/50 to-purple-800/40 shadow-lg border border-purple-600/30"
                      : "hover:bg-purple-800/20 hover:shadow-md"
                  }`}
                >
                  {collapsed ? (
                    // Collapsed view - just icon
                    <div className="w-full flex justify-center">
                      <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300" />
                    </div>
                  ) : (
                    // Expanded view
                    <div className="flex items-center justify-between w-full min-w-0">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span
                            className={`font-medium text-xs truncate ${
                              selectedConversation === conv.id
                                ? "text-white"
                                : "text-purple-100"
                            }`}
                          >
                            {conv.title}
                          </span>
                          {conv.starred && (
                            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400 fill-current flex-shrink-0" />
                          )}
                        </div>
                      </div>

                      <div
                        className={`flex items-center gap-1 transition-opacity flex-shrink-0 ${
                          showContextMenu === conv.id
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        <div
                          onClick={(e) => handleContextMenu(e, conv.id)}
                          className="p-1 hover:bg-purple-700/40 rounded-md transition-colors cursor-pointer"
                          title="More options"
                        >
                          <MoreVertical className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-300" />
                        </div>
                      </div>
                    </div>
                  )}
                </button>

                {/* Context Menu */}
                {showContextMenu === conv.id && !collapsed && (
                  <div className="absolute right-2 top-8 bg-slate-800/95 border-purple-700/50 backdrop-blur-md border rounded-lg shadow-xl z-20 min-w-32 sm:min-w-36 py-1">
                    <button
                      className="w-full flex items-center gap-2 px-2 py-1.5 text-xs hover:bg-purple-700/30 transition-colors text-purple-200"
                      onClick={() => setShowContextMenu(null)}
                    >
                      <Edit3 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Rename
                    </button>

                    <button
                      className="w-full flex items-center gap-2 px-2 py-1.5 text-xs hover:bg-purple-700/30 transition-colors text-purple-200"
                      onClick={() => setShowContextMenu(null)}
                    >
                      <Share2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Share
                    </button>
                    <button
                      className="w-full flex items-center gap-2 px-2 py-1.5 text-xs hover:bg-purple-700/30 transition-colors text-purple-200"
                      onClick={() => setShowContextMenu(null)}
                    >
                      <Archive className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Archive
                    </button>
                    <button
                      className="w-full flex items-center gap-2 px-2 py-1.5 text-xs hover:bg-purple-700/30 transition-colors text-purple-200"
                      onClick={() => setShowContextMenu(null)}
                    >
                      <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Add to favourites
                    </button>
                    <hr className="my-1 border-purple-700/50" />
                    <button
                      className="w-full flex items-center gap-2 px-2 py-1.5 text-xs hover:bg-red-900/30 transition-colors text-red-400"
                      onClick={() => setShowContextMenu(null)}
                    >
                      <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Delete
                    </button>
                  </div>
                )}

                {/* Tooltip for collapsed state */}
                {collapsed && hoveredConv === conv.id && (
                  <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-slate-800/95 text-white border-purple-700/50 px-2 py-1.5 rounded-lg shadow-lg z-50 min-w-48 sm:min-w-56 border pointer-events-none backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-xs">{conv.title}</span>
                      {conv.starred && (
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-400 rounded-sm"></div>
                      )}
                    </div>
                    <div className="text-xs text-purple-300">{conv.time}</div>
                    <div className="text-xs text-purple-400 mt-1">
                      {conv.preview}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Settings - Only show when not collapsed */}
        {!collapsed && (
          <div className="p-4 border-t border-purple-600/50 flex-shrink-0">
            <button
              onClick={() => {
                // TODO: Open settings modal or navigate to settings page
                console.log("Settings clicked");
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-800/20 transition-colors text-purple-300"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </button>
          </div>
        )}

        {/* Collapsed settings icon */}
        {collapsed && (
          <div className="py-2 flex-shrink-0">
            <button
              onClick={() => router.push("/settings")}
              className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-purple-800/20 transition-colors text-purple-300 mx-auto group relative"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
              {/* Tooltip */}
              <div className="absolute left-16 bg-slate-800 text-white border-purple-700/50 px-2 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border pointer-events-none">
                Settings
              </div>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Sidebar;
