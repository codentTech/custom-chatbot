import SimpleSelect from "@/common/components/dropdowns/simple-select/simple-select";
import {
  ChevronDown,
  LogOut,
  Menu,
  MessageCircle,
  Settings,
  Share2,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Header({
  isDarkMode,
  sidebarOpen,
  setSidebarOpen,
  title,
  selectedModel = "GPT-4o",
  setSelectedModel = () => {},
}) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });

  const models = [
    { label: "GPT-4o", value: "gpt-4o" },
    { label: "GPT-4", value: "gpt-4" },
    { label: "Claude 3", value: "claude-3" },
    { label: "Gemini 1.5", value: "gemini-1.5" },
  ];

  const userMenuItems = [
    {
      label: "Settings",
      icon: Settings,
      action: () => console.log("Settings clicked"),
    },
    {
      label: "Logout",
      icon: LogOut,
      action: () => console.log("Logout clicked"),
    },
  ];

  // Update dropdown position when button is clicked
  const handleDropdownToggle = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right,
    });
    setShowUserDropdown(!showUserDropdown);
  };

  return (
    <>
      <div
        className={`${isDarkMode ? "glass-dark border-gray-700/30" : "glass border-gray-200/30"} border-b border-b-purple-950 px-6 py-[7.5px] flex items-center backdrop-blur-md`}
      >
        {/* Left Section */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`lg:hidden p-2 rounded-xl hover:${isDarkMode ? "bg-gray-800/50" : "bg-white/50"} transition-colors backdrop-blur-sm`}
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
          <div className="flex items-center gap-3">
            <h1
              className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              {title}
            </h1>
          </div>
        </div>

        {/* Center Section - Model Dropdown */}
        <div className="flex items-center justify-center flex-1">
          <div className="relative w-full max-w-[230px]">
            {/* Custom arrow on the left */}
            <div className="absolute inset-y-0 right-3 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-purple-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className={`w-full pl-3 py-2 rounded-lg border outline-none shadow-sm transition-colors text-sm font-medium appearance-none
        ${
          isDarkMode
            ? "bg-gray-900 border-purple-700 text-purple-200"
            : "bg-white border-purple-300 text-purple-700"
        }`}
            >
              {models.map((model) => (
                <option
                  key={model.value}
                  value={model.value}
                  className={
                    isDarkMode
                      ? "bg-gray-900 text-purple-200"
                      : "bg-white text-purple-700"
                  }
                >
                  {model.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            className={`p-2 rounded-xl hover:${isDarkMode ? "bg-gray-800/50" : "bg-white/50"} transition-colors ${isDarkMode ? "text-gray-400" : "text-gray-500"} backdrop-blur-sm`}
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={handleDropdownToggle}
              className={`flex items-center gap-2 p-2 rounded-xl hover:${isDarkMode ? "bg-gray-800/50" : "bg-white/50"} transition-colors ${isDarkMode ? "text-gray-400" : "text-gray-500"} backdrop-blur-sm`}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span
                className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                John Doe
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${showUserDropdown ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown Menu - Rendered at body level */}
      {showUserDropdown && (
        <div
          style={{
            position: "fixed",
            top: dropdownPosition.top,
            right: dropdownPosition.right,
            zIndex: 999999,
          }}
          className={`w-48 rounded-lg shadow-xl border ${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}
        >
          <div className="py-1">
            {userMenuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  setShowUserDropdown(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:${isDarkMode ? "bg-gray-800" : "bg-gray-50"} transition-colors ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {showUserDropdown && (
        <div
          className="fixed inset-0 z-[999998]"
          onClick={() => setShowUserDropdown(false)}
        />
      )}
    </>
  );
}
