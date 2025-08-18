"use client";

import {
  ArrowLeft,
  Bell,
  Brain,
  ChevronRight,
  Code,
  CreditCard,
  Database,
  Palette,
  Settings,
  Shield,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("general");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const settingSections = [
    {
      id: "general",
      name: "General",
      icon: Settings,
      description: "Basic app preferences",
    },
    {
      id: "ai-models",
      name: "AI Models",
      icon: Brain,
      description: "Configure AI assistants",
    },
    {
      id: "plugins",
      name: "Plugins",
      icon: Zap,
      description: "Extend functionality",
    },
    {
      id: "appearance",
      name: "Appearance",
      icon: Palette,
      description: "Themes and display",
    },
    {
      id: "privacy",
      name: "Privacy & Security",
      icon: Shield,
      description: "Data protection",
    },
    {
      id: "notifications",
      name: "Notifications",
      icon: Bell,
      description: "Alert preferences",
    },
    {
      id: "billing",
      name: "Billing & Usage",
      icon: CreditCard,
      description: "Subscription and costs",
    },
    {
      id: "advanced",
      name: "Advanced",
      icon: Code,
      description: "Power user features",
    },
    {
      id: "data",
      name: "Data Management",
      icon: Database,
      description: "Import, export, backup",
    },
  ];

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Russian",
    "Chinese (Simplified)",
    "Chinese (Traditional)",
    "Japanese",
    "Korean",
    "Arabic",
    "Hindi",
    "Dutch",
    "Swedish",
    "Norwegian",
    "Danish",
    "Finnish",
    "Polish",
    "Turkish",
    "Hebrew",
  ];

  const ToggleSwitch = ({ enabled, onChange, disabled = false }) => (
    <button
      onClick={() => !disabled && onChange(!enabled)}
      className={`relative w-10 h-5 rounded-full transition-all duration-200 ${
        enabled
          ? "bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg shadow-purple-500/25"
          : "bg-slate-600/50 border border-slate-500/30"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:shadow-md"}`}
    >
      <div
        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-200 shadow-md ${
          enabled ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );

  const renderGeneralSettings = () => (
    <div className="space-y-4 animate-fade-in">
      <div>
        <h3 className="text-xl font-bold mb-2 text-white">
          General Preferences
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Configure your basic app settings and preferences
        </p>

        <div className="space-y-3">
          {/* Auto-save conversations */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-3 group hover:bg-white/20 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-semibold text-sm text-white mb-1">
                  Auto-save conversations
                </div>
                <div className="text-xs text-purple-300">
                  Automatically save your chat history to prevent data loss
                </div>
              </div>
              <ToggleSwitch enabled={autoSave} onChange={setAutoSave} />
            </div>
          </div>

          {/* Voice responses */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-3 group hover:bg-white/20 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-semibold text-sm text-white mb-1">
                  Voice responses
                </div>
                <div className="text-xs text-purple-300">
                  Enable text-to-speech for AI responses
                </div>
              </div>
              <ToggleSwitch enabled={voiceEnabled} onChange={setVoiceEnabled} />
            </div>
          </div>

          {/* Push notifications */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-3 group hover:bg-white/20 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-semibold text-sm text-white mb-1">
                  Push notifications
                </div>
                <div className="text-xs text-purple-300">
                  Get notified of important updates and messages
                </div>
              </div>
              <ToggleSwitch
                enabled={notifications}
                onChange={setNotifications}
              />
            </div>
          </div>

          {/* Default Language */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-3 group hover:bg-white/20 transition-all duration-200">
            <div className="mb-3">
              <div className="font-semibold text-sm text-white mb-1">
                Default Language
              </div>
              <div className="text-xs text-purple-300">
                Choose your preferred language for the interface
              </div>
            </div>
            <div className="relative w-full">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full appearance-none bg-slate-700/50 text-white text-xs p-2 rounded-lg border border-purple-700/30 focus:border-purple-500/50 focus:outline-none transition-colors"
              >
                {languages.map((lang) => (
                  <option
                    key={lang}
                    value={lang}
                    className="bg-slate-800 text-white"
                  >
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message Input Behavior */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-3 group hover:bg-white/20 transition-all duration-200">
            <div className="mb-3">
              <div className="font-semibold text-sm text-white mb-1">
                Message send behavior
              </div>
              <div className="text-xs text-purple-300 mb-3">
                Choose how to send messages
              </div>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sendBehavior"
                  value="enter"
                  className="w-3 h-3 text-purple-600 bg-transparent border-purple-500 focus:ring-purple-500"
                  defaultChecked
                />
                <span className="text-xs text-white">
                  Enter to send, Shift+Enter for new line
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sendBehavior"
                  value="ctrl-enter"
                  className="w-3 h-3 text-purple-600 bg-transparent border-purple-500 focus:ring-purple-500"
                />
                <span className="text-xs text-white">
                  Ctrl+Enter to send, Enter for new line
                </span>
              </label>
            </div>
          </div>

          {/* Conversation History */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-3 group hover:bg-white/20 transition-all duration-200">
            <div className="mb-3">
              <div className="font-semibold text-sm text-white mb-1">
                Conversation history limit
              </div>
              <div className="text-xs text-purple-300 mb-3">
                Maximum number of conversations to keep
              </div>
            </div>
            <div className="relative w-full">
              <select
                defaultValue="100"
                className="w-full appearance-none bg-slate-700/50 text-white text-xs p-2 rounded-lg border border-purple-700/30 focus:border-purple-500/50 focus:outline-none transition-colors"
              >
                <option value="50" className="bg-slate-800 text-white">
                  50 conversations
                </option>
                <option value="100" className="bg-slate-800 text-white">
                  100 conversations
                </option>
                <option value="200" className="bg-slate-800 text-white">
                  200 conversations
                </option>
                <option value="500" className="bg-slate-800 text-white">
                  500 conversations
                </option>
                <option value="unlimited" className="bg-slate-800 text-white">
                  Unlimited
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900/90 via-purple-900/40 to-slate-900/90 text-white relative overflow-hidden">
      {/* Animated Background Pattern - Same theme as sidebar */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/40 to-slate-900/90" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header - Compact design */}
        <div className="p-4 bg-gradient-to-br from-slate-900/90 via-purple-900/40 to-slate-900/90 backdrop-blur-sm border-b border-white/20">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1.5 rounded hover:bg-white/10 transition-colors text-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-slate-700 via-purple-600 to-slate-700 rounded flex items-center justify-center">
                <Settings className="w-3 h-3 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white">Settings</h1>
                <p className="text-xs text-purple-300">
                  Customize your NeuralFlow experience
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar - Compact design */}
          <div className="w-64 p-4 bg-gradient-to-br from-slate-900/90 via-purple-900/40 to-slate-900/90 border-r border-purple-800/30">
            <nav className="space-y-2">
              {settingSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all ${
                    activeSection === section.id
                      ? "bg-purple-800/30 border border-purple-700/50 text-white shadow-md"
                      : "hover:bg-purple-800/20 border border-transparent text-purple-300"
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-md ${
                      activeSection === section.id
                        ? "bg-purple-700/40 text-white"
                        : "bg-slate-700/50 text-purple-400"
                    }`}
                  >
                    <section.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div
                      className={`font-semibold text-xs ${
                        activeSection === section.id
                          ? "text-white"
                          : "text-purple-300"
                      }`}
                    >
                      {section.name}
                    </div>
                    <div
                      className={`text-xs ${
                        activeSection === section.id
                          ? "text-purple-200"
                          : "text-purple-400"
                      }`}
                    >
                      {section.description}
                    </div>
                  </div>
                  <div
                    className={`w-3 h-3 transition-transform ${
                      activeSection === section.id ? "rotate-90" : ""
                    }`}
                  >
                    <ChevronRight className="w-3 h-3 text-purple-400" />
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="px-6 py-6">
              {activeSection === "general" && renderGeneralSettings()}

              {/* Placeholder for other sections */}
              {activeSection !== "general" && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8 text-center">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center mx-auto">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    Coming Soon
                  </h3>
                  <p className="text-white text-sm">
                    This section will be implemented soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
