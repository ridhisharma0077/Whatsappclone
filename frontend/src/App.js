// 

import React, { useState, useEffect } from "react";
import "./App.css";
import whatsapp from './assets/whatsapp.png';
import neww from './assets/new.png';
import filter from './assets/filter.png';
import './Navbar.css';
import Navbar from "./Navbar";
import Message from "./Message";
import scan from './assets/scan.png'
import camera from './assets/camera.png'
import dots from './assets/dots.png'

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [activeChat, setActiveChat] = useState(null); // null = list view

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const chatList = [
    { id: 1, name: "Ridhi", lastMessage: "Let's meet today😀", time: "03:45 PM" },
    { id: 2, name: "Neha💗", lastMessage: "I'm good. What about you?", time: "11:17 AM" },
    { id: 3, name: "Bhavna Didi😇", lastMessage: "where are you?", time: "11:17 AM" },
    { id: 4, name: "Chandan", lastMessage: "Hey! What's up??", time: "Yesterday" }
  ];

  return (
    <div className="app-container">
      {showSplash ? (
        <div className="splash-screen">
          <img src={whatsapp} alt="WhatsApp Logo" />
        </div>
      ) : (
        <>
          {/* Top header only in list view on mobile */}
          {(!activeChat || window.innerWidth > 768) && (
            <div className="up">
              <img src={whatsapp} className="uplogo" alt="WhatsApp Logo" />
              <h3>WhatsApp</h3>
              <div className="upp">
                <img src={scan}/>
                <img src={camera}/>
                <img src={dots}/>
              </div>
            </div>
          )}

          {/* Navbar only in list view on mobile */}
          {(!activeChat || window.innerWidth > 768) && <Navbar />}

          <div className="main-ui">
            {/* Sidebar (Hide in mobile when chat open) */}
            {(!activeChat || window.innerWidth > 768) && (
              <div className="sidebar">
                <div className="sidebar-header">
                  <div>
                    <h2>Chats</h2>
                  </div>
                  <div className="icons">
                    <img src={neww} alt="new chat" />
                    <img src={filter} alt="filter" />
                  </div>
                </div>
                <input
                  className="search-box"
                  placeholder="Search and start a new chat"
                />

                <div className="chat-list">
                  {chatList.map(chat => (
                    <div
                      key={chat.id}
                      className="chat-item"
                      onClick={() => setActiveChat(chat)}
                    >
                      <div className="chat-avatar">{chat.name.charAt(0)}</div>
                      <div className="chat-info">
                        <div className="chat-name my">
                          <div className="name">{chat.name}</div>
                          <div className="clockk"><p>{chat.time}</p></div>
                        </div>
                        <div className="first">
                          <p>{chat.lastMessage}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Window */}
            {activeChat && (
              <Message
                chat={activeChat}
                onBack={() => setActiveChat(null)}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default App;