// 
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Message.css";
import video from './assets/video.png';
import phone from './assets/telephone.png';
import dots from './assets/dots.png';
import smile from './assets/smile.png';
import attach from './assets/attachment.png';
import send from './assets/send.png';
import back from './assets/back.png';

const Message = ({ chat, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const API_URL = "http://localhost:5000/messages";

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(API_URL);
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };

    fetchMessages();
  }, []);

  // Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMsg = {
      wa_id: "919876543210",
      name: chat.name,
      text: input,
      fromMe: true,
      timestamp: new Date(),
      status: "sent"
    };

    try {
      await axios.post(API_URL, newMsg);
      setInput("");

      // message send hone ke baad turant refresh
      const res = await axios.get(API_URL);
      setMessages(res.data);
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <>
    <div className="app">
      {/* Chat Header */}
      <div className="chat-header">
        {window.innerWidth <= 768 && (
          <button className="back-btn" onClick={onBack}>
            <img src={back} alt="back" />
          </button>
        )}
        <div className="naam">
          <div className="chat-avatar1">{chat.name.charAt(0)}</div>
          <div style={{ alignContent: "center" }}>{chat.name}</div>
        </div>
        <div className="topicon">
          <div><img src={video} alt="video" /></div>
          <div><img src={phone} alt="phone" /></div>
          <div><img src={dots} alt="search" /></div>
        </div>
      </div>

      {/* Chat Body */}
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.fromMe ? "sent" : "received"}`}
          >
            <span className="name">{msg.name}</span>
            <p>{msg.text}</p>
            <span className="time">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>

      {/* Chat Footer */}
      <div className="chat-footer">
        <img src={smile} className="chat" alt="smile" />
        <img src={attach} className="chat" alt="attach" />
        <input
          style={{ backgroundColor: "white" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} style={{ backgroundColor: "white" }}>
          <img src={send} style={{ height: "15px", width: "15px" }} alt="send" />
        </button>
      </div>
    </div>
    </>
  );
};

export default Message;