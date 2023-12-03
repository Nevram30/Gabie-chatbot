import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

import { Dialogflow_V2 } from "react-native-dialogflow";
import { dialogflowConfig } from "./env";

import * as Speech from 'expo-speech';

const botAvatar = require('./assets/images/animation3.png')

const BOT_USER = {
  _id: 2,
  name: "FAQ Bot",
  avatar: botAvatar,
};

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      _id: 3,
      text: 
      `What are the degree programs offered?

What are the services offered?

How much is the tuition for HM?

How much is the tuition for EDUCATION MAJOR IN ENGLISH?

How much is the tuition for EDUCATION MAJOR IN MATH?

How much is the tuition for EDUCATION MAJOR IN SOCIAL STUDIES?

How much is the tuition for EDUCATION BEED?

How much is the tuition for JHS?

How much is the tuition for SHS GAS?

How much is the tuition for SHS HUMSS?`,
      createdAt: new Date(),
      user: BOT_USER,
    },
    {
      _id: 2,
      text: `This are the possible Question Queries:`,
      createdAt: new Date(),
      user: BOT_USER,
    },
    {
      _id: 1,
      text: `Hi! I am Gabie the FAQ bot 🤖 from Gabreil Taborin College of Davao. I can help you with any questions you have.`,
      createdAt: new Date(),
      user: BOT_USER,
    },
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
    Speech.speak(text);
    sendBotResponse(text);
  };

  

  const onSend = (messages = []) => {
    
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    let message = messages[0].text;

      Dialogflow_V2.requestQuery(
        message,
        (result) => handleGoogleResponse(result),
        (error) => console.log(error)
      );
  };

 const sendBotResponse = (text) => {
  Speech.speak(text);
    let msg = {
      _id: messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER,
    };

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [msg])
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};

