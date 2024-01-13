import React, { useState, useEffect } from "react";

import { GiftedChat } from "react-native-gifted-chat";
import { Dialogflow_V2 } from "react-native-dialogflow";
import { dialogflowConfig } from "./env";
import * as Speech from "expo-speech";

const botAvatar = require("./assets/images/animation3.png");

const BOT_USER = {
  _id: 2,
  name: "FAQ Bot",
  avatar: botAvatar,
};

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      _id: 2,
      text: `Type "Yes" to get started.`,
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
    pillBotResponse(text);
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

  const quickSend = (message) => {
    Dialogflow_V2.requestQuery(
      message,
      (result) => handleGoogleResponse(result),
      (error) => console.log(error)
    );
  };

  const pillBotResponse = (text) => {
    Speech.speak(text);

    let pillMsg = {
      _id: messages.length + 2,
      text: "Click and Select what you want to know.",
      createdAt: new Date(),
      user: BOT_USER,
      quickReplies: {
        type: "radio",
        keepIt: true,
        values: [
          {
            title: "What are the degree programs offered?",
            value: "What are the degree programs offered?",
          },
          {
            title: "What are the services offered?",
            value: "What are the services offered?",
          },
          {
            title: "How much is the tuition for HM?",
            value: "How much is the tuition for HM?",
          },
          {
            title: "How much is the tuition for EDUCATION MAJOR IN ENGLISH?",
            value: "How much is the tuition for EDUCATION MAJOR IN ENGLISH?",
          },
          {
            title: "How much is the tuition for EDUCATION MAJOR IN MATH?",
            value: "How much is the tuition for EDUCATION MAJOR IN MATH?",
          },
          {
            title:
              "How much is the tuition for EDUCATION MAJOR IN SOCIAL STUDIES?",
            value:
              "How much is the tuition for EDUCATION MAJOR IN SOCIAL STUDIES?",
          },
          {
            title: "How much is the tuition for EDUCATION BEED?",
            value: "How much is the tuition for EDUCATION BEED?",
          },
          {
            title: "How much is the tuition for JHS?",
            value: "How much is the tuition for JHS?",
          },
          {
            title: "How much is the tuition for SHS GAS?",
            value: "How much is the tuition for SHS GAS?",
          },
          {
            title: "How much is the tuition for SHS HUMSS?",
            value: "How much is the tuition for SHS HUMSS?",
          },
        ],
      },
    };

    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [pillMsg])
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

  const onQuickReply = (quickReply) => {
    if (quickReply[0].value === "What are the degree programs offered?") {
      const quickMessage = "What are the degree programs offered?";
      let message = quickMessage;
      quickSend(message);
    } else if (quickReply[0].value === "What are the services offered?") {
      const quickMessage = "What are the services offered?";
      let message = quickMessage;
      quickSend(message);
    } else if (quickReply[0].value === "How much is the tuition for HM?") {
      const quickMessage = "How much is the tuition for HM?";
      let message = quickMessage;
      quickSend(message);
    } else if (
      quickReply[0].value ===
      "How much is the tuition for EDUCATION MAJOR IN ENGLISH?"
    ) {
      const quickMessage =
        "How much is the tuition for EDUCATION MAJOR IN ENGLISH?";
      let message = quickMessage;
      quickSend(message);
    } else if (
      quickReply[0].value ===
      "How much is the tuition for EDUCATION MAJOR IN MATH?"
    ) {
      const quickMessage =
        "How much is the tuition for EDUCATION MAJOR IN MATH?";
      let message = quickMessage;
      quickSend(message);
    } else if (
      quickReply[0].value ===
      "How much is the tuition for EDUCATION MAJOR IN SOCIAL STUDIES?"
    ) {
      const quickMessage =
        "How much is the tuition for EDUCATION MAJOR IN SOCIAL STUDIES?";
      let message = quickMessage;
      quickSend(message);
    } else if (
      quickReply[0].value === "How much is the tuition for EDUCATION BEED?"
    ) {
      const quickMessage = "How much is the tuition for EDUCATION BEED?";
      let message = quickMessage;
      quickSend(message);
    } else if (quickReply[0].value === "How much is the tuition for JHS?") {
      const quickMessage = "How much is the tuition for JHS?";
      let message = quickMessage;
      quickSend(message);
    } else if (quickReply[0].value === "How much is the tuition for SHS GAS?") {
      const quickMessage = "How much is the tuition for SHS GAS?";
      let message = quickMessage;
      quickSend(message);
    } else if (
      quickReply[0].value === "How much is the tuition for SHS HUMSS?"
    ) {
      const quickMessage = "How much is the tuition for SHS HUMSS?";
      let message = quickMessage;
      quickSend(message);
    }
  };

  return (
    <GiftedChat
      messages={messages}
      onQuickReply={onQuickReply}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
}
