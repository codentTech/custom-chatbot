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
      icon: Sparkles,
    },
    {
      label: "Turbo",
      value: "gpt-4-turbo",
      icon: Zap,
    },
    {
      label: "Classic",
      value: "gpt-4",
      icon: Brain,
    },
    {
      label: "Swift",
      value: "gpt-3.5-turbo",
      icon: Zap,
    },
    {
      label: "Sonnet",
      value: "claude-3.5-sonnet",
      icon: Brain,
    },
    {
      label: "Opus",
      value: "claude-3-opus",
      icon: Brain,
    },
    {
      label: "Harmony",
      value: "claude-3-sonnet",
      icon: Brain,
    },
    {
      label: "Haiku",
      value: "claude-3-haiku",
      icon: Zap,
    },
    {
      label: "Pro",
      value: "gemini-1.5-pro",
      icon: Sparkles,
    },
    {
      label: "Flash",
      value: "gemini-1.5-flash",
      icon: Zap,
    },
    {
      label: "Gemini",
      value: "gemini-pro",
      icon: Brain,
    },
    {
      label: "Large",
      value: "mistral-large",
      icon: Brain,
    },
    {
      label: "Medium",
      value: "mistral-medium",
      icon: Zap,
    },
    {
      label: "Small",
      value: "mistral-small",
      icon: Zap,
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
      <div className="relative px-2 sm:px-4 py-1.5 sm:py-2 flex items-center overflow-visible z-20 border-b border-purple-600/30">
        {/* Animated Background Pattern - Same theme as ChatArea */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/40 to-slate-900/90" />
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute top-1/2 right-1/4 w-64 h-64 bg-slate-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* Header Content with proper z-index */}
        <div className="relative z-10 flex items-center w-full">
          {/* Left Section */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-1">
            {/* Model Dropdown - Left on desktop, hidden on mobile */}
            <div className="relative w-full max-w-[200px] sm:max-w-[240px] lg:max-w-[280px] hidden md:block">
              <button
                onClick={handleModelDropdownToggle}
                className={`w-full flex items-center justify-between px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg border shadow-sm transition-all duration-200 text-xs font-medium group hover:shadow-md bg-gray-900 border-purple-900 text-purple-200 hover:border-purple-700 hover:bg-gray-800`}
              >
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <selectedModelData.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400" />
                  <div className="text-left">
                    <div className="font-semibold text-xs">
                      {selectedModelData.label}
                    </div>
                  </div>
                </div>
                <ChevronDown
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 ${
                    showModelDropdown ? "rotate-180" : ""
                  } text-purple-400`}
                />
              </button>
            </div>
          </div>

          {/* Center Section - Model Dropdown (Mobile) */}
          <div className="flex items-center justify-center flex-1">
            {/* Model Dropdown - Center on mobile, hidden on md+ */}
            <div className="relative w-full max-w-[200px] sm:max-w-[240px] md:hidden">
              <button
                onClick={handleModelDropdownToggle}
                className={`w-full flex items-center justify-between px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg border shadow-sm transition-all duration-200 text-xs font-medium group hover:shadow-md bg-gray-900 border-purple-900 text-purple-200 hover:border-purple-700 hover:bg-gray-800`}
              >
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <selectedModelData.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400" />
                  <div className="text-left">
                    <div className="font-semibold text-xs">
                      {selectedModelData.label}
                    </div>
                  </div>
                </div>
                <ChevronDown
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 ${
                    showModelDropdown ? "rotate-180" : ""
                  } text-purple-400`}
                />
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1 sm:gap-1.5 flex-1 justify-end">
            <button className="p-1.5 sm:p-1.5 rounded-lg hover:bg-gray-800/50 transition-colors text-gray-400 backdrop-blur-sm">
              <Share2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={handleDropdownToggle}
                className="flex items-center gap-1.5 sm:gap-1.5 p-1.5 sm:p-1.5 rounded-lg hover:bg-gray-800/50 transition-colors text-gray-400 backdrop-blur-sm"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <User className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </div>
                <span className="text-xs sm:text-xs font-medium text-white hidden sm:block">
                  John Doe
                </span>
                <ChevronDown
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 transition-transform ${showUserDropdown ? "rotate-180" : ""}`}
                />
              </button>
            </div>
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
          <div className="rounded-lg shadow-2xl border max-h-72 sm:max-h-80 overflow-hidden bg-gray-900 border-gray-700 shadow-gray-900/50">
            {/* Scrollable container */}
            <div
              className="max-h-56 sm:max-h-72 overflow-y-auto"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#6b7280 #374151",
              }}
            >
              <style jsx>{`
                .overflow-y-auto::-webkit-scrollbar {
                  width: 4px;
                }
                .overflow-y-auto::-webkit-scrollbar-track {
                  background: #374151;
                  border-radius: 2px;
                }
                .overflow-y-auto::-webkit-scrollbar-thumb {
                  background: #6b7280;
                  border-radius: 2px;
                }
                .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                  background: #9ca3af;
                }
              `}</style>
              {models.map((model) => (
                <button
                  key={model.value}
                  onClick={() => handleModelSelect(model.value)}
                  className={`w-full flex items-center gap-2 px-2.5 py-2 text-left hover:transition-colors ${
                    model.value === selectedModel
                      ? "bg-purple-900/20 text-purple-200 border-l-2 border-purple-500"
                      : "hover:bg-gray-800 text-gray-300"
                  }`}
                >
                  <model.icon
                    className={`w-3 h-3 ${
                      model.value === selectedModel
                        ? "text-purple-400"
                        : "text-gray-400"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="font-medium text-xs">{model.label}</div>
                  </div>
                  {model.value === selectedModel && (
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
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
          className="w-48 rounded-lg shadow-xl border bg-gray-900 border-gray-700"
        >
          <div className="py-1">
            {userMenuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  setShowUserDropdown(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-800 transition-colors text-gray-300"
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
