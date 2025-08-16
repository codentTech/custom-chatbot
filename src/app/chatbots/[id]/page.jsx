"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ChatbotLayout from "../../../components/layout/chatbot-layout.component";
import ChatbotConversations from "../../../components/chatbot-conversations/chatbot-conversations.component";

export default function ChatbotPage() {
  const params = useParams();
  const router = useRouter();
  const [chatbot, setChatbot] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample chatbots data - this would come from your backend
  const chatbots = [
    {
      id: 1,
      name: "Mobile App Development",
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
      name: "Content Writing Assistant",
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
      name: "Code Review & Debugging",
      description: "Code analysis, bug fixing, and performance optimization",
      category: "development",
      conversationCount: 15,
      lastActive: "3 hours ago",
      isFavorite: true,
      color: "from-orange-500 to-red-600",
    },
    {
      id: 4,
      name: "Business Strategy",
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
      name: "Learning & Education",
      description: "Study help, concept explanations, and educational content",
      category: "education",
      conversationCount: 9,
      lastActive: "5 hours ago",
      isFavorite: true,
      color: "from-yellow-500 to-orange-600",
    },
  ];

  useEffect(() => {
    const chatbotId = parseInt(params.id);
    const foundChatbot = chatbots.find((c) => c.id === chatbotId);

    if (foundChatbot) {
      setChatbot(foundChatbot);
    } else {
      // Chatbot not found, redirect to chatbots list
      router.push("/chatbots");
    }

    setLoading(false);
  }, [params.id, router]);

  const handleBackToChatbots = () => {
    router.push("/chatbots");
  };

  const handleNewConversation = (newConversation) => {
    // Handle new conversation creation
    console.log("New conversation created:", newConversation);
    // Navigate to the new conversation
    router.push(`/chat/${newConversation.id}`);
  };

  if (loading) {
    return (
      <ChatbotLayout title="Loading...">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-purple-300">Loading chatbot...</p>
          </div>
        </div>
      </ChatbotLayout>
    );
  }

  if (!chatbot) {
    return null;
  }

  return (
    <ChatbotLayout title={chatbot.name}>
      <ChatbotConversations
        chatbot={chatbot}
        onBackToChatbots={handleBackToChatbots}
        onNewConversation={handleNewConversation}
      />
    </ChatbotLayout>
  );
}
