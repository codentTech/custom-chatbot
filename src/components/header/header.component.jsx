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
  Sparkles,
  Brain,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Header({
  isDarkMode,
  sidebarOpen,
  setSidebarOpen,
  title,
  selectedModel = "gpt-4o", // Keep this as the default value for backward compatibility
  setSelectedModel = () => {},
}) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });
  const [modelDropdownPosition, setModelDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  // Close dropdowns when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (showModelDropdown || showUserDropdown) {
        setShowModelDropdown(false);
        setShowUserDropdown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showModelDropdown, showUserDropdown]);

  // Close dropdowns when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (showModelDropdown || showUserDropdown) {
        setShowModelDropdown(false);
        setShowUserDropdown(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showModelDropdown, showUserDropdown]);

  const models = [
    {
      label: "Omni",
      value: "gpt-4o",
      description: "Most capable GPT model",
      icon: Sparkles,
      category: "OpenAI",
    },
    {
      label: "Turbo",
      value: "gpt-4-turbo",
      description: "Latest GPT-4 model",
      icon: Zap,
      category: "OpenAI",
    },
    {
      label: "Classic",
      value: "gpt-4",
      description: "GPT-4 base model",
      icon: Brain,
      category: "OpenAI",
    },
    {
      label: "Swift",
      value: "gpt-3.5-turbo",
      description: "Fast and efficient",
      icon: Zap,
      category: "OpenAI",
    },
    {
      label: "Sonnet",
      value: "claude-3.5-sonnet",
      description: "Most capable Claude model",
      icon: Brain,
      category: "Anthropic",
    },
    {
      label: "Opus",
      value: "claude-3-opus",
      description: "Claude 3 Opus model",
      icon: Brain,
      category: "Anthropic",
    },
    {
      label: "Harmony",
      value: "claude-3-sonnet",
      description: "Claude 3 Sonnet model",
      icon: Brain,
      category: "Anthropic",
    },
    {
      label: "Haiku",
      value: "claude-3-haiku",
      description: "Fastest Claude model",
      icon: Zap,
      category: "Anthropic",
    },
    {
      label: "Pro",
      value: "gemini-1.5-pro",
      description: "Most capable Gemini model",
      icon: Sparkles,
      category: "Google",
    },
    {
      label: "Flash",
      value: "gemini-1.5-flash",
      description: "Fast and efficient Gemini",
      icon: Zap,
      category: "Google",
    },
    {
      label: "Gemini",
      value: "gemini-pro",
      description: "Gemini Pro model",
      icon: Brain,
      category: "Google",
    },
    {
      label: "Large",
      value: "mistral-large",
      description: "Mistral's largest model",
      icon: Brain,
      category: "Mistral",
    },
    {
      label: "Medium",
      value: "mistral-medium",
      description: "Balanced performance",
      icon: Zap,
      category: "Mistral",
    },
    {
      label: "Small",
      value: "mistral-small",
      description: "Fast and efficient",
      icon: Zap,
      category: "Mistral",
    },
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

  const handleModelDropdownToggle = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    setModelDropdownPosition({
      top: rect.bottom + 8,
      left: rect.left,
      width: rect.width,
    });
    setShowModelDropdown(!showModelDropdown);
  };

  const handleModelSelect = (modelValue) => {
    if (typeof setSelectedModel === "function") {
      setSelectedModel(modelValue); // This calls the parent's setSelectedModel function
    } else {
      console.error("setSelectedModel is not a function:", setSelectedModel);
    }

    setShowModelDropdown(false);
  };

  const getSelectedModel = () => {
    const selected =
      models.find((model) => model.value === selectedModel) || models[0];
    return selected;
  };

  const selectedModelData = getSelectedModel();

  return (
    <>
      <div
        className={`${isDarkMode ? "glass-dark border-gray-700/30" : "glass border-gray-200/30"} border-b border-b-purple-950 px-3 sm:px-6 py-2 sm:py-[7.5px] flex items-center backdrop-blur-md relative overflow-visible`}
      >
        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`lg:hidden p-2 rounded-xl hover:${isDarkMode ? "bg-gray-800/50" : "bg-white/50"} transition-colors backdrop-blur-sm`}
          >
            {sidebarOpen ? (
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
          <div className="items-center gap-2 sm:gap-3 hidden md:flex">
            <h1
              className={`text-base sm:text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              {title}
            </h1>
          </div>
        </div>

        {/* Center Section - Model Dropdown */}
        <div className="flex items-center justify-center flex-1">
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[370px]">
            <button
              onClick={handleModelDropdownToggle}
              className={`w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border shadow-sm transition-all duration-200 text-sm font-medium group hover:shadow-md
                ${
                  isDarkMode
                    ? "bg-gray-900 border-purple-900 text-purple-200 hover:border-purple-700 hover:bg-gray-800"
                    : "bg-white border-purple-300 text-purple-700 hover:border-purple-500 hover:bg-purple-50"
                }
              `}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <selectedModelData.icon
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}
                />
                <div className="text-left">
                  <div className="font-semibold text-xs sm:text-sm">
                    {selectedModelData.label}
                  </div>
                  <div
                    className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"} hidden sm:block`}
                  >
                    {selectedModelData.category}
                  </div>
                </div>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${
                  showModelDropdown ? "rotate-180" : ""
                } ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}
              />
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1 sm:gap-2 flex-1 justify-end">
          <button
            className={`p-1.5 sm:p-2 rounded-xl hover:${isDarkMode ? "bg-gray-800/50" : "bg-white/50"} transition-colors ${isDarkMode ? "text-gray-400" : "text-gray-500"} backdrop-blur-sm`}
          >
            <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={handleDropdownToggle}
              className={`flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl hover:${isDarkMode ? "bg-gray-800/50" : "bg-white/50"} transition-colors ${isDarkMode ? "text-gray-400" : "text-gray-500"} backdrop-blur-sm`}
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <span
                className={`text-xs sm:text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"} hidden sm:block`}
              >
                John Doe
              </span>
              <ChevronDown
                className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${showUserDropdown ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Model Dropdown Menu - Rendered at body level */}
      {showModelDropdown && (
        <div
          style={{
            position: "fixed",
            top: modelDropdownPosition.top,
            left: modelDropdownPosition.left,
            width: modelDropdownPosition.width,
            zIndex: 999999,
          }}
          className="pointer-events-auto"
        >
          <div
            className={`rounded-lg shadow-2xl border max-h-80 sm:max-h-96 overflow-hidden ${
              isDarkMode
                ? "bg-gray-900 border-gray-700 shadow-gray-900/50"
                : "bg-white border-gray-200 shadow-gray-200/50"
            }`}
          >
            {/* Scrollable container */}
            <div
              className="max-h-64 sm:max-h-80 overflow-y-auto"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: isDarkMode
                  ? "#6b7280 #374151"
                  : "#d1d5db #f3f4f6",
              }}
            >
              <style jsx>{`
                .overflow-y-auto::-webkit-scrollbar {
                  width: 6px;
                }
                .overflow-y-auto::-webkit-scrollbar-track {
                  background: ${isDarkMode ? "#374151" : "#f3f4f6"};
                  border-radius: 3px;
                }
                .overflow-y-auto::-webkit-scrollbar-thumb {
                  background: ${isDarkMode ? "#6b7280" : "#d1d5db"};
                  border-radius: 3px;
                }
                .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                  background: ${isDarkMode ? "#9ca3af" : "#9ca3af"};
                }
              `}</style>
              {models.map((model) => (
                <button
                  key={model.value}
                  onClick={() => handleModelSelect(model.value)}
                  className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-left hover:transition-colors ${
                    model.value === selectedModel
                      ? isDarkMode
                        ? "bg-purple-900/20 text-purple-200 border-l-2 border-purple-500"
                        : "bg-purple-100 text-purple-700 border-l-2 border-purple-500"
                      : isDarkMode
                        ? "hover:bg-gray-800 text-gray-300"
                        : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <model.icon
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                      model.value === selectedModel
                        ? isDarkMode
                          ? "text-purple-400"
                          : "text-purple-600"
                        : isDarkMode
                          ? "text-gray-400"
                          : "text-gray-500"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="font-medium text-xs sm:text-sm">
                      {model.label}
                    </div>
                    <div
                      className={`text-xs ${
                        model.value === selectedModel
                          ? isDarkMode
                            ? "text-purple-300"
                            : "text-purple-500"
                          : isDarkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                      } hidden sm:block`}
                    >
                      {model.description}
                    </div>
                  </div>
                  {model.value === selectedModel && (
                    <div
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                        isDarkMode ? "bg-purple-400" : "bg-purple-600"
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* User Dropdown Menu - Rendered at body level */}
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

      {/* Click outside to close dropdowns */}
      {(showUserDropdown || showModelDropdown) && (
        <div
          className="fixed inset-0 z-[999998]"
          onClick={() => {
            setShowUserDropdown(false);
            setShowModelDropdown(false);
          }}
        />
      )}
    </>
  );
}
