"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ChatbotLayout from "../../components/layout/chatbot-layout.component";
import ChatbotManagement from "../../components/chatbot-management/chatbot-management.component";
import ChatbotConversations from "../../components/chatbot-conversations/chatbot-conversations.component";

export default function ChatbotsPage() {
  const router = useRouter();
  const [selectedChatbot, setSelectedChatbot] = useState(null);
  const [view, setView] = useState("chatbots"); // "chatbots" or "conversations"

  const handleChatbotSelect = (chatbot) => {
    setSelectedChatbot(chatbot);
    setView("conversations");
  };

  const handleBackToChatbots = () => {
    setSelectedChatbot(null);
    setView("chatbots");
  };

  const handleCreateChatbot = (newChatbot) => {
    // Handle new chatbot creation
    console.log("New chatbot created:", newChatbot);
    // You could add it to the list here
  };

  const handleNewConversation = (newConversation) => {
    // Handle new conversation creation
    console.log("New conversation created:", newConversation);
    // Navigate to the new conversation
    router.push(`/chat/${newConversation.id}`);
  };

  return (
    <ChatbotLayout
      title={view === "chatbots" ? "My Chatbots" : selectedChatbot?.name}
    >
      {view === "chatbots" ? (
        <ChatbotManagement
          onChatbotSelect={handleChatbotSelect}
          onCreateChatbot={handleCreateChatbot}
        />
      ) : (
        <ChatbotConversations
          chatbot={selectedChatbot}
          onBackToChatbots={handleBackToChatbots}
          onNewConversation={handleNewConversation}
        />
      )}
    </ChatbotLayout>
  );
}
