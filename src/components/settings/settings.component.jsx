"use client";

import {
  ArrowLeft,
  Settings,
  Sparkles,
  ChevronRight,
  Brain,
  Zap,
  Palette,
  Shield,
  Bell,
  CreditCard,
  Code,
  Database,
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
      className={`relative w-12 h-6 rounded-full transition-all duration-200 ${
        enabled
          ? "bg-gradient-to-r from-cyan-500 to-purple-600 shadow-lg"
          : "bg-white/20"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:shadow-md"}`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200 shadow-md ${
          enabled ? "translate-x-7" : "translate-x-1"
        }`}
      />
    </button>
  );

  const renderGeneralSettings = () => (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h3 className="text-2xl font-bold mb-2 text-white">
          General Preferences
        </h3>
        <p className="text-sm text-gray-400 mb-8">
          Configure your basic app settings and preferences
        </p>

        <div className="space-y-6">
          {/* Auto-save conversations */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 group hover:bg-white/15 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-semibold text-lg text-white mb-2">
                  Auto-save conversations
                </div>
                <div className="text-sm text-gray-400">
                  Automatically save your chat history to prevent data loss
                </div>
              </div>
              <ToggleSwitch enabled={autoSave} onChange={setAutoSave} />
            </div>
          </div>

          {/* Voice responses */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 group hover:bg-white/15 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-semibold text-lg text-white mb-2">
                  Voice responses
                </div>
                <div className="text-sm text-gray-400">
                  Enable text-to-speech for AI responses
                </div>
              </div>
              <ToggleSwitch enabled={voiceEnabled} onChange={setVoiceEnabled} />
            </div>
          </div>

          {/* Push notifications */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 group hover:bg-white/15 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-semibold text-lg text-white mb-2">
                  Push notifications
                </div>
                <div className="text-sm text-gray-400">
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
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 group hover:bg-white/15 transition-all duration-200">
            <div className="mb-4">
              <div className="font-semibold text-lg text-white mb-2">
                Default Language
              </div>
              <div className="text-sm text-gray-400">
                Choose your preferred language for the interface
              </div>
            </div>
            <div className="relative w-full">
              {/* Custom down arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <svg
                  className="w-4 h-4 text-white"
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
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full appearance-none bg-transparent text-white placeholder-gray-400 resize-none outline-none p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm pr-10"
              >
                {languages.map((lang) => (
                  <option
                    key={lang}
                    value={lang}
                    className="bg-gray-900 text-white"
                  >
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message Input Behavior */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 group hover:bg-white/15 transition-all duration-200">
            <div className="mb-4">
              <div className="font-semibold text-lg text-white mb-2">
                Message send behavior
              </div>
              <div className="text-sm text-gray-400 mb-4">
                Choose how to send messages
              </div>
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="sendBehavior"
                  value="enter"
                  className="w-4 h-4 text-purple-600 bg-transparent border-white/20 focus:ring-purple-500"
                  defaultChecked
                />
                <span className="text-white">
                  Enter to send, Shift+Enter for new line
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="sendBehavior"
                  value="ctrl-enter"
                  className="w-4 h-4 text-purple-600 bg-transparent border-white/20 focus:ring-purple-500"
                />
                <span className="text-white">
                  Ctrl+Enter to send, Enter for new line
                </span>
              </label>
            </div>
          </div>

          {/* Conversation History */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 group hover:bg-white/15 transition-all duration-200">
            <div className="mb-4">
              <div className="font-semibold text-lg text-white mb-2">
                Conversation history limit
              </div>
              <div className="text-sm text-gray-400 mb-4">
                Maximum number of conversations to keep
              </div>
            </div>
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <svg
                  className="w-4 h-4 text-white"
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
                defaultValue="100"
                className="w-full appearance-none bg-transparent text-white placeholder-gray-400 resize-none outline-none p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm pr-10"
              >
                <option value="50" className="bg-gray-900 text-white">
                  50 conversations
                </option>
                <option value="100" className="bg-gray-900 text-white">
                  100 conversations
                </option>
                <option value="200" className="bg-gray-900 text-white">
                  200 conversations
                </option>
                <option value="500" className="bg-gray-900 text-white">
                  500 conversations
                </option>
                <option value="unlimited" className="bg-gray-900 text-white">
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
    <div className="h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background Pattern - exactly like ChatArea */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/40 to-slate-900/90" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header - same as ChatArea input area style */}
        <div className="p-6 bg-black/20 backdrop-blur-xl border-b border-white/10">
          <div className="">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center">
                    <Sparkles className="w-2 h-2 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Settings</h1>
                  <p className="text-sm text-gray-400">
                    Customize your NeuralFlow experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar - same style as ChatArea cards */}
          <div className="w-80 p-6 bg-black/20 backdrop-blur-xl border-r border-white/10">
            <nav className="space-y-3">
              {settingSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-left transition-all ${
                    activeSection === section.id
                      ? "bg-white/20 backdrop-blur-sm border border-white/30 text-white shadow-lg"
                      : "hover:bg-white/10 border border-transparent text-gray-300"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      activeSection === section.id
                        ? "bg-white/20 text-white"
                        : "bg-white/10 text-gray-400"
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div
                      className={`font-semibold text-sm ${
                        activeSection === section.id
                          ? "text-white"
                          : "text-gray-300"
                      }`}
                    >
                      {section.name}
                    </div>
                    <div
                      className={`text-xs ${
                        activeSection === section.id
                          ? "text-gray-300"
                          : "text-gray-400"
                      }`}
                    >
                      {section.description}
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      activeSection === section.id
                        ? "rotate-90 text-white"
                        : "text-gray-500"
                    }`}
                  />
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-6 py-8">
              {activeSection === "general" && renderGeneralSettings()}

              {/* Placeholder for other sections */}
              {activeSection !== "general" && (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-12 text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mx-auto">
                      <Settings className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    Coming Soon
                  </h3>
                  <p className="text-gray-400">
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
