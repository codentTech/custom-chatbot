"use client";

import {
  Archive,
  Brain,
  ChevronLeft,
  ChevronRight,
  Edit3,
  MessageSquare,
  MoreVertical,
  Plus,
  Share2,
  Star,
  Trash2,
  FolderOpen,
  MessageCircle,
  LogOut,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Sidebar({
  sidebarOpen = true,
  setSidebarOpen = () => {},
  searchQuery = "",
  setSearchQuery = () => {},
  selectedConversation = 1,
  setSelectedConversation = () => {},
  conversations = [],
}) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredConv, setHoveredConv] = useState(null);
  const [showContextMenu, setShowContextMenu] = useState(null);
  const [activeSection, setActiveSection] = useState("chats");

  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContextMenu = (e, convId) => {
    e.preventDefault();
    e.stopPropagation();
    setShowContextMenu(showContextMenu === convId ? null : convId);
  };

  const navigationItems = [
    {
      id: "chats",
      label: "Chats",
      icon: MessageCircle,
      count: conversations.length,
    },
    {
      id: "projects",
      label: "Projects",
      icon: FolderOpen,
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
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:relative z-30 h-full bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 border-r border-purple-800/30 flex flex-col transition-all duration-300 ${
          collapsed ? "w-16" : "w-80"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center ${
            collapsed ? "justify-center px-2 py-4" : "justify-between p-4"
          } border-b border-purple-800/30 flex-shrink-0`}
        >
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-700 via-purple-600 to-slate-700 rounded-lg flex items-center justify-center shadow-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-white">NeuralFlow</span>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-purple-800/20 transition-colors text-purple-300 flex-shrink-0"
            aria-label="Toggle sidebar"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* New Chat Button */}
        <div className={`${collapsed ? "px-2" : "px-4"} py-3 flex-shrink-0`}>
          {collapsed ? (
            <button
              className="w-12 h-12 bg-purple-800/30 hover:bg-purple-700/40 border-purple-700/50 border rounded-lg transition-all duration-200 flex items-center justify-center mx-auto group relative"
              title="New chat"
            >
              <Plus className="w-5 h-5 text-purple-300" />
              {/* Tooltip */}
              <div className="absolute left-16 bg-slate-800 text-white border-purple-700/50 px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border pointer-events-none">
                New chat
              </div>
            </button>
          ) : (
            <button className="w-full bg-gradient-to-r from-purple-800/30 via-purple-700/40 to-purple-800/30 hover:from-purple-700/40 hover:via-purple-600/50 hover:to-purple-700/40 border-purple-700/50 text-purple-200 border rounded-lg py-1 px-4 font-medium transition-all duration-200 flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              New Chat
            </button>
          )}
        </div>

        {/* Search - Only show when not collapsed */}
        {!collapsed && (
          <div className="px-4 pb-4 flex-shrink-0">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-3 pr-4 py-2 bg-slate-800/50 border-purple-700/50 text-white placeholder-purple-400 focus:border-purple-500/70 focus:bg-slate-800/70 border rounded-lg text-sm focus:outline-none transition-all backdrop-blur-sm"
              />
            </div>
          </div>
        )}

        {/* Navigation Tabs - Only show when not collapsed */}
        {!collapsed && (
          <div className="px-4 flex-shrink-0">
            <div className="flex flex-col gap-1 rounded-lg p-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center border border-purple-800 gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? "bg-purple-600 text-white shadow-md"
                      : "text-purple-300 hover:bg-purple-800/30"
                  }`}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full flex-shrink-0 ${
                      activeSection === item.id
                        ? "bg-purple-500/20 text-purple-200"
                        : "bg-slate-700/50 text-slate-300"
                    }`}
                  >
                    {item.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <hr className="border-t border-purple-600/50 mx-4 my-4 flex-shrink-0" />

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto px-2 min-h-0">
          <div className="space-y-1">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                className="relative group"
                onMouseEnter={() => setHoveredConv(conv.id)}
                onMouseLeave={() => setHoveredConv(null)}
              >
                <button
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`w-full flex items-center p-2 rounded-lg transition-all duration-200 ${
                    selectedConversation === conv.id
                      ? "bg-gradient-to-r from-purple-800/40 via-purple-700/50 to-purple-800/40 shadow-lg border border-purple-600/30"
                      : "hover:bg-purple-800/20 hover:shadow-md"
                  }`}
                >
                  {collapsed ? (
                    // Collapsed view - just icon
                    <div className="w-full flex justify-center">
                      <MessageSquare className="w-5 h-5 text-purple-300" />
                    </div>
                  ) : (
                    // Expanded view
                    <div className="flex items-center justify-between w-full min-w-0">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="w-4 h-4 text-purple-300" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-medium text-sm truncate ${
                                selectedConversation === conv.id
                                  ? "text-white"
                                  : "text-purple-100"
                              }`}
                            >
                              {conv.title}
                            </span>
                            {conv.starred && (
                              <Star className="w-3 h-3 text-yellow-400 fill-current flex-shrink-0" />
                            )}
                          </div>
                          <div className="text-xs text-left text-purple-400 mt-0.5">
                            {conv.time}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <div
                          onClick={(e) => handleContextMenu(e, conv.id)}
                          className="p-1.5 hover:bg-purple-700/40 rounded-md transition-colors cursor-pointer"
                          title="More options"
                        >
                          <MoreVertical className="w-3.5 h-3.5 text-purple-300" />
                        </div>
                      </div>
                    </div>
                  )}
                </button>

                {/* Context Menu */}
                {showContextMenu === conv.id && !collapsed && (
                  <div className="absolute right-2 top-10 bg-slate-800/95 border-purple-700/50 backdrop-blur-md border rounded-lg shadow-xl z-20 min-w-40 py-1">
                    <button
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-purple-700/30 transition-colors text-purple-200"
                      onClick={() => setShowContextMenu(null)}
                    >
                      <Edit3 className="w-4 h-4" />
                      Rename
                    </button>

                    <button
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-purple-700/30 transition-colors text-purple-200"
                      onClick={() => setShowContextMenu(null)}
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                    <button
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-purple-700/30 transition-colors text-purple-200"
                      onClick={() => setShowContextMenu(null)}
                    >
                      <Archive className="w-4 h-4" />
                      Archive
                    </button>
                    <button
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-purple-700/30 transition-colors text-purple-200"
                      onClick={() => setShowContextMenu(null)}
                    >
                      <Star className="w-4 h-4" />
                      Add to favourites
                    </button>
                    <hr className="my-1 border-purple-700/50" />
                    <button
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-red-900/30 transition-colors text-red-400"
                      onClick={() => setShowContextMenu(null)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                )}

                {/* Tooltip for collapsed state */}
                {collapsed && hoveredConv === conv.id && (
                  <div className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-slate-800/95 text-white border-purple-700/50 px-3 py-2 rounded-lg shadow-lg z-50 min-w-64 border pointer-events-none backdrop-blur-md">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{conv.title}</span>
                      {conv.starred && (
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      )}
                    </div>
                    <div className="text-xs text-purple-300">{conv.time}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Logout - Only show when not collapsed */}
        {!collapsed && (
          <div className="p-4 border-t border-purple-600/50 flex-shrink-0">
            <button
              onClick={() => router.push("settings")}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-800/20 transition-colors text-purple-300"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </button>
          </div>
        )}

        {/* Collapsed logout icon */}
        {collapsed && (
          <div className="py-2 flex-shrink-0">
            <button
              onClick={() => router.push("settings")}
              className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-purple-800/20 transition-colors text-purple-300 mx-auto group relative"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
              {/* Tooltip */}
              <div className="absolute left-16 bg-slate-800 text-white border-purple-700/50 px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border pointer-events-none">
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
