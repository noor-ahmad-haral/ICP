// Bot image and human image chat
'use client';
import { useState, useRef, KeyboardEvent } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const ChatComponent: React.FC = () => {
  const [isChatboxOpen, setIsChatboxOpen] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatboxRef = useRef<HTMLDivElement>(null);
  const userInputRef = useRef<HTMLInputElement>(null);

  const toggleChatbox = () => {
    setIsChatboxOpen((prev) => !prev);
  };

  const addUserMessage = (message: string) => {
    if (chatboxRef.current) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('mb-2', 'flex', 'items-end', 'justify-end');
      messageElement.innerHTML = `
        <div class="bg-blue-600 text-white rounded-lg py-2 px-4 inline-block">
          <img src="/human.png" alt="User" class="w-8 h-8 inline mr-2 rounded-full" />
          ${message}
        </div>`;
      chatboxRef.current.appendChild(messageElement);
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  };

  const addBotMessage = (message: string) => {
    if (chatboxRef.current) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('mb-2', 'flex', 'items-end', 'justify-start');
      messageElement.innerHTML = `
        <div class="bg-blue-100 text-blue-800 rounded-lg py-2 px-4 inline-block">
          <img src="/bot.png" alt="Bot" class="w-8 h-8 inline mr-2 rounded-full" />
          ${message}
        </div>`;
      chatboxRef.current.appendChild(messageElement);
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  };

  const showTypingIndicator = () => {
    setIsTyping(true);
    if (chatboxRef.current) {
      const typingElement = document.createElement('div');
      typingElement.setAttribute('id', 'typing-indicator');
      typingElement.classList.add('mb-2', 'flex', 'items-end', 'justify-start');
      typingElement.innerHTML = `
        <div class="bg-blue-100 text-blue-800 rounded-lg py-2 px-4 inline-block flex items-center">
          <img src="/bot.png" alt="Bot" class="w-8 h-8 inline mr-2 rounded-full" />
          Bot is typing<span class="animate-pulse ml-2">...</span>
        </div>`;
      chatboxRef.current.appendChild(typingElement);
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  };

  const hideTypingIndicator = () => {
    setIsTyping(false);
    const typingElement = document.getElementById('typing-indicator');
    if (typingElement) {
      typingElement.remove();
    }
  };

  const respondToUser = async (userMessage: string) => {
    showTypingIndicator();
    try {
      const response = await axios.post('http://localhost:8000/ask', {
        question: userMessage,
      });
      hideTypingIndicator();
      addBotMessage(response.data.answer || 'No response from server.');
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error);
      hideTypingIndicator();
      addBotMessage('An error occurred. Please try again later.');
    }
  };

  const handleSend = () => {
    if (userInputRef.current) {
      const userMessage = userInputRef.current.value;
      if (userMessage.trim() !== '') {
        addUserMessage(userMessage);
        respondToUser(userMessage);
        userInputRef.current.value = '';
      }
    }
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && userInputRef.current) {
      const userMessage = userInputRef.current.value;
      if (userMessage.trim() !== '') {
        addUserMessage(userMessage);
        respondToUser(userMessage);
        userInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <div className="fixed bottom-0 right-0 mb-4 mr-4 z-50">
        <button
          id="open-chat"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition duration-300 flex items-center"
          onClick={toggleChatbox}
        >
          <FaComments className="w-6 h-6 mr-2" />
          Chat with team
        </button>
      </div>
      <div
        id="chat-container"
        className={`fixed bottom-16 right-2 sm:right-4 w-[340px] sm:w-96 transition-transform duration-300 z-40 ${
          isChatboxOpen ? 'translate-x-0' : 'translate-x-[500px]'
        }`}
      >
        <div className="bg-white shadow-lg rounded-lg max-w-lg w-full">
          <div className="p-4 border-b bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
            <p className="text-lg font-semibold">Chat with us</p>
            <button
              id="close-chat"
              className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
              onClick={toggleChatbox}
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>
          <div ref={chatboxRef} id="chatbox" className="p-4 h-80 overflow-y-auto"></div>
          <div className="p-4 border-t flex">
            <input
              id="user-input"
              type="text"
              placeholder="Type a message"
              className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref={userInputRef}
              onKeyUp={handleKeyUp}
            />
            <button
              id="send-button"
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-500 transition duration-300"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatComponent;