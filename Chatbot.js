// Chatbot.js
import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

const responses = require('./response.json');

const Chatbot = () => {
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    // Start the conversation with a welcome message
    sendBotMessage("Hello! How can I assist you today?");
  }, []);

  const sendBotMessage = (text) => {
    const newMessage = {
      _id: Math.round(Math.random() * 1000000),
      text: text,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Bot',
      },
    };
    setMessages((previousMessages) => GiftedChat.append(previousMessages, [newMessage]));
  };

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
    const categories = Object.keys(responses.responses);

    // Loop through categories to check if the user's message matches any
    for (const category of categories) {
      const categoryResponses = responses.responses[category];
      const userMessageLower = userMessage.toLowerCase();

      for (const [question, answers] of Object.entries(categoryResponses)) {
        if (userMessageLower.includes(question.toLowerCase())) {
          return answers;
        }
      }
    }

    // Default response if no match is found
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
