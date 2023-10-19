// Chatbot.js
import React, { useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = (newMessages) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));

    const messageText = newMessages[0].text;
    const botResponse = getBotResponse(messageText);

    const botMessage = {
      _id: Math.round(Math.random() * 1000000),
      text: botResponse,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Bot',
      },
    };

    setMessages((previousMessages) => GiftedChat.append(previousMessages, [botMessage]));
  };

  const getBotResponse = (userMessage) => {
    // Replace this with your logic to fetch responses from a server, API, or other sources
    // For simplicity, using a predefined set of responses from a JSON file
    const responses = require('./response.json');
    
    // Example: If the user's message contains "hello", respond with a random greeting
    if (userMessage.toLowerCase().includes('hello')) {
      const greetingResponses = responses.greetings;
      return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
    }

    if (userMessage.toLowerCase().includes('hi')) {
      const greetingResponses = responses.greetings;
      return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
    }

    if (userMessage.toLowerCase().includes('how are you?')) {
      const greetingResponses = responses.greetings;
      return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
    }

    if (userMessage.toLowerCase().includes('what are you doing know?')) {
      const greetingResponses = responses.answers;
      return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
    }


    // Example: If the user's message contains "bye", respond with a random farewell
    if (userMessage.toLowerCase().includes('bye')) {
      const farewellResponses = responses.farewells;
      return farewellResponses[Math.floor(Math.random() * farewellResponses.length)];
    }

    // Add more conditions and response categories as needed

    // Default response if no specific condition is met
    return "I'm sorry, I didn't understand that.";
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => handleSend(newMessages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default Chatbot;
