import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';

import {dialogflowConfig} from './env';

const BOT_USER = {
  _id: 2,
  name: 'FAQ Bot',
  avatar: 'https://i.imgur.com/7k12EPD.png'
};

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: `Hi! I am the FAQ bot 🤖 from Aume. I can help you with any questions you have.`,
      createdAt: new Date(),
      user: BOT_USER
    }
  ]);

  useEffect(() => {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }, []);

  const handleGoogleResponse = (result) => {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    sendBotResponse(text);
  };

  const onSend = (messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));

    let message = messages[0].text;

    Dialogflow_V2.requestQuery(
      message,
      (result) => handleGoogleResponse(result),
      (error) => console.log(error)
    );
  };

  const sendBotResponse = (text) => {
    let msg = {
      _id: messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER
    };

    setMessages((previousMessages) => GiftedChat.append(previousMessages, [msg]));
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1
      }}
    />
  );
}

// const responses = require('./response.json');

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     // Start the conversation with a welcome message
//     sendBotMessage("Hello! How can I assist you today?");
//   }, []);

//   const sendBotMessage = (text) => {
//     const newMessage = {
//       _id: Math.round(Math.random() * 1000000),
//       text: text,
//       createdAt: new Date(),
//       user: {
//         _id: 2,
//         name: 'Bot',
//       },
//     };
//     setMessages((previousMessages) => GiftedChat.append(previousMessages, [newMessage]));
//   };

//   const handleSend = (newMessages) => {
//     setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));

//     const messageText = newMessages[0].text;
//     const botResponse = getBotResponse(messageText);

//     const botMessage = {
//       _id: Math.round(Math.random() * 1000000),
//       text: botResponse,
//       createdAt: new Date(),
//       user: {
//         _id: 2,
//         name: 'Bot',
//       },
//     };

//     setMessages((previousMessages) => GiftedChat.append(previousMessages, [botMessage]));
//   };



//   const getBotResponse = (userMessage) => {
//     const categories = Object.keys(responses.responses);

//     // Loop through categories to check if the user's message matches any
//     for (const category of categories) {
//       const categoryResponses = responses.responses[category];
//       const userMessageLower = userMessage.toLowerCase();

//       for (const [question, answers] of Object.entries(categoryResponses)) {
//         if (userMessageLower.includes(question.toLowerCase())) {
//           return answers;
//         }
//       }
//     }

//     // Default response if no match is found
//     return "I'm sorry, I didn't understand that.";
//   };

//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={(newMessages) => handleSend(newMessages)}
//       user={{
//         _id: 1,
//       }}
//     />
//   );
// };

export default Chatbot;
