"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Sidebar from "../../../components/sidebar/sidebar.component";
import Header from "../../../components/header/header.component";
import ChatArea from "../../../components/chat-area/chat-area.component";
import { conversations } from "../../../data/conversations";

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const chatId = params.id;

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(chatId);
  const [selectedModel, setSelectedModel] = useState("gpt-4o");

  // Sample chat messages for demonstration
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "user",
      content:
        "Hey! I'm working on a new mobile app and need some advice on user experience design. What are the current best practices?",
      timestamp: "2:34 PM",
    },
    {
      id: 2,
      type: "ai",
      content:
        "Great question! Here are the key UX best practices for mobile apps in 2024:\n\n**1. Thumb-Friendly Design**\n• Keep primary actions within easy thumb reach\n• Use bottom navigation for main features\n• Make touch targets at least 44px\n\n**2. Progressive Disclosure**\n• Don't overwhelm users with too many options\n• Reveal complexity gradually as needed\n• Use clear visual hierarchy\n\n**3. Performance & Accessibility**\n• Ensure fast loading times (under 3 seconds)\n• Support dark mode from launch\n• Include proper contrast ratios\n• Test with screen readers\n\nWould you like me to dive deeper into any of these areas, or do you have specific questions about your app's user flow?",
      timestamp: "2:34 PM",
    },
    {
      id: 3,
      type: "user",
      content:
        "This is really helpful! Can you tell me more about onboarding best practices? I want to make sure users don't drop off.",
      timestamp: "2:36 PM",
    },
    {
      id: 4,
      type: "ai",
      content:
        'Absolutely! User onboarding is critical for retention. Here\'s what works:\n\n**The 3-30-3 Rule:**\n• 3 seconds to grab attention\n• 30 seconds to show core value\n• 3 minutes to complete first meaningful action\n\n**Effective Onboarding Strategies:**\n\n**1. Value-First Approach**\n• Show, don\'t just tell\n• Let users experience the "aha moment" quickly\n• Use progressive onboarding throughout the app\n\n**2. Contextual Guidance**\n• Tooltips appear when relevant\n• Interactive tutorials over static screens\n• Just-in-time help when users need it\n\n**3. Personalization**\n• Ask 1-2 key questions to customize experience\n• Tailor content based on user goals\n• Remember preferences across sessions\n\n**4. Easy Exit Strategy**\n• Always provide "Skip" or "Later" options\n• Don\'t force completion of non-essential steps\n• Allow users to return to onboarding anytime\n\nThe goal is to get users to their first success moment as quickly as possible. What type of app are you building? I can give more specific advice based on your use case.',
      timestamp: "2:37 PM",
    },
    {
      id: 5,
      type: "user",
      content:
        "I'm building a fitness tracking app. How should I approach the onboarding for that?",
      timestamp: "2:39 PM",
    },
    {
      id: 6,
      type: "ai",
      content:
        "Perfect! Fitness apps have unique onboarding challenges. Here's a proven approach:\n\n**Fitness App Onboarding Strategy:**\n\n**1. Quick Goal Setting (30 seconds)**\n• Weight loss, muscle gain, or maintenance?\n• Current fitness level (beginner/intermediate/advanced)\n• Preferred workout types (strength, cardio, yoga, etc.)\n\n**2. Immediate Value Demo (1 minute)**\n• Show a sample workout plan\n• Preview the tracking interface\n• Demonstrate progress visualization\n\n**3. First Workout Experience (2-3 minutes)**\n• Guide through one simple exercise\n• Show how to log it\n• Celebrate the first completion!\n\n**4. Personalization Touch**\n• Ask about available equipment\n• Preferred workout duration\n• Best time of day for workouts\n\n**5. Success Celebration**\n• Congratulate on first workout\n• Show what's next\n• Set up first reminder\n\n**Key Tips:**\n• Start with bodyweight exercises (no equipment needed)\n• Use encouraging, motivational language\n• Show progress immediately\n• Make the first workout achievable\n\nWould you like me to help you design specific onboarding screens or user flows?",
      timestamp: "2:40 PM",
    },
    {
      id: 7,
      type: "user",
      content:
        "That's exactly what I needed! One more question - how do I handle user data privacy in a fitness app?",
      timestamp: "2:42 PM",
    },
    {
      id: 8,
      type: "ai",
      content:
        "Excellent question! Data privacy is crucial for fitness apps. Here's a comprehensive approach:\n\n**Privacy-First Design Principles:**\n\n**1. Data Minimization**\n• Only collect what you absolutely need\n• Don't ask for unnecessary personal info\n• Use anonymous tracking when possible\n\n**2. Clear Consent & Transparency**\n• Explain exactly what data you collect\n• Show how it improves user experience\n• Allow granular control over data sharing\n\n**3. Secure Data Storage**\n• Encrypt all user data (both at rest and in transit)\n• Use secure authentication (2FA, biometrics)\n• Regular security audits and updates\n\n**4. User Control**\n• Easy data export functionality\n• Simple account deletion process\n• Clear privacy settings dashboard\n\n**5. Compliance Requirements**\n• GDPR compliance for EU users\n• CCPA for California users\n• HIPAA considerations for health data\n• Regular privacy policy updates\n\n**6. Best Practices**\n• Anonymize data for analytics\n• Get explicit consent for sensitive data\n• Provide clear opt-out mechanisms\n• Regular privacy impact assessments\n\n**Implementation Tips:**\n• Start with a simple privacy dashboard\n• Use clear, simple language in privacy notices\n• Test privacy flows with real users\n• Have a data breach response plan\n\nRemember: Trust is everything in fitness apps. Users need to feel safe sharing their health and fitness data.",
      timestamp: "2:43 PM",
    },
  ]);

  const handleNewChat = () => {
    // Navigate to landing page for new chat
    router.push("/");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
        conversations={conversations}
        isNewChat={false}
        handleNewChat={handleNewChat}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header Component */}
        <Header
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Chat Area Component */}
        <ChatArea
          isDarkMode={isDarkMode}
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          message={message}
          setMessage={setMessage}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>

      {/* Mobile Overlay - Fixed z-index to be below sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
