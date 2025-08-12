"use client";

import { useState } from "react";
import {
  Copy,
  Edit,
  Mic,
  Paperclip,
  RefreshCcw,
  Send,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Header from "../header/header.component";
import MessageRenderer from "./messagee-renderer";

function ChatArea({
  isDarkMode,
  chatMessages,
  message,
  setMessage,
  isRecording,
  setIsRecording,
}) {
  const [selectedModel, setSelectedModel] = useState("gpt-4o");

  return (
    <div className="flex-1 flex flex-col relative">
      {/* Enhanced Header */}
      <Header
        isDarkMode={isDarkMode}
        title="NeuralFlow Chat"
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />

      {/* Enhanced Chat Messages */}
      <div
        className={`flex-1 overflow-y-scroll overflow-x-visible relative ${isDarkMode ? "bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950" : "bg-gradient-to-b from-slate-50 via-purple-50/50 to-slate-50"}`}
      >
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <div
                className={`max-w-2xl relative ${
                  msg.type === "user"
                    ? isDarkMode
                      ? "bg-gradient-to-r from-purple-800/40 via-purple-700/50 to-purple-800/40 text-white border border-purple-600/30"
                      : "bg-gradient-to-r from-purple-100 via-purple-200 to-purple-100 text-slate-800 border border-purple-200"
                    : isDarkMode
                      ? "text-white"
                      : "bg-gradient-to-r from-white via-slate-50 to-white text-slate-800 border border-slate-200"
                } rounded-2xl p-6 ${msg.type === "user" ? "rounded-br-md" : "rounded-bl-md"} group`}
              >
                <div
                  className={`text-sm leading-relaxed whitespace-pre-wrap !text-white`}
                >
                  <MessageRenderer content={msg.content} isDarkMode={true} />
                </div>

                <div
                  className={`flex items-center justify-between mt-4 pt-4 border-t ${isDarkMode ? "border-purple-700/20" : "border-purple-200/50"}`}
                >
                  <div
                    className={`text-xs ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}
                  >
                    {msg.timestamp}
                  </div>

                  {msg.type === "ai" ? (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className={`p-2 rounded-lg hover:${isDarkMode ? "bg-slate-700/40" : "bg-slate-100"} transition-colors ${isDarkMode ? "text-purple-300" : "text-purple-600"}`}
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <button
                        className={`p-2 rounded-lg hover:${isDarkMode ? "bg-slate-700/40" : "bg-slate-100"} transition-colors ${isDarkMode ? "text-purple-300" : "text-purple-600"}`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </button>
                      <button
                        className={`p-2 rounded-lg hover:${isDarkMode ? "bg-slate-700/40" : "bg-slate-100"} transition-colors ${isDarkMode ? "text-purple-300" : "text-purple-600"}`}
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className={`p-2 rounded-lg hover:${isDarkMode ? "bg-slate-700/40" : "bg-slate-100"} transition-colors ${isDarkMode ? "text-purple-300" : "text-purple-600"}`}
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <button
                        className={`p-2 rounded-lg hover:${isDarkMode ? "bg-slate-700/40" : "bg-slate-100"} transition-colors ${isDarkMode ? "text-purple-300" : "text-purple-600"}`}
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button
                        className={`p-2 rounded-lg hover:${isDarkMode ? "bg-slate-700/40" : "bg-slate-100"} transition-colors ${isDarkMode ? "text-purple-300" : "text-purple-600"}`}
                      >
                        <RefreshCcw className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-black/20 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-4">
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything... I'm here to help!"
                  className="w-full bg-transparent text-white placeholder-gray-400 resize-none outline-none max-h-32 focus:outline-none"
                  rows="1"
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              {/* Quick Actions */}
              <div className="flex gap-2 mt-3">
                <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs transition-colors">
                  ✨ Explain this code
                </button>
                <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs transition-colors">
                  🎨 Design ideas
                </button>
                <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs transition-colors">
                  📝 Write content
                </button>
                <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs transition-colors">
                  🔍 Research topic
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-2 rounded-lg transition-colors ${isRecording ? "bg-red-500 hover:bg-red-600" : "hover:bg-white/10"}`}
                >
                  <Mic className="w-5 h-5" />
                </button>

                <button
                  disabled={!message.trim()}
                  className="p-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
