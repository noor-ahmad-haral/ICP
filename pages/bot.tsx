// pages/bot.tsx
import React from "react";
import ChatComponent from "@/components/Chat"; // Import the Chat component

const BotPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Chatbot Test Page</h1>
      <ChatComponent />
    </div>
  );
};

export default BotPage;
