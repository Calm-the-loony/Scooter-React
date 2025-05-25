import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  FaRobot,
  FaUserAlt,
  FaPaperPlane,
  FaMicrophone,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
  FaQuestionCircle,
} from "react-icons/fa";
import "../../style/ChatBot.scss";

const quickQuestions = [
  { text: "Как оформить заказ?", emoji: "🛒" },
  { text: "Какие способы оплаты?", emoji: "💳" },
  { text: "Сколько длится доставка?", emoji: "🚚" },
  { text: "Можно ли вернуть товар?", emoji: "🔄" },
  { text: "Какой график работы?", emoji: "⏰" },
  { text: "Где находится магазин?", emoji: "📍" },
  { text: "Как подобрать патрубки?", emoji: "🔧" },
  { text: "Как с вами связаться?", emoji: "📞" },
];

const ChatWidgetBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Здравствуйте! Я виртуальный помощник магазина запчастей для скутеров. Чем могу помочь?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isQuickActionsVisible, setIsQuickActionsVisible] = useState(true);

  const chatContainerRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "ru-RU";
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsRecording(false);
      };

      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);

      recognitionRef.current = recognition;
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setIsLoading(true);

    try {
      const { data } = await axios.post("/api/chat", { message: text });
      const reply = data.reply || "Извините, не могу ответить сейчас.";
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Ошибка сервера. Попробуйте позже.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Голосовой ввод не поддерживается");
      return;
    }

    isRecording ? recognitionRef.current.stop() : recognitionRef.current.start();
    setIsRecording(!isRecording);
  };

  const handleSend = () => sendMessage(input);

  const toggleQuickActions = () => setIsQuickActionsVisible((prev) => !prev);

  const renderMessages = () =>
    messages.map((msg, idx) => (
      <div key={idx} className={`message ${msg.sender}`}>
        <div className="avatar">
          {msg.sender === "user" ? <FaUserAlt /> : <FaRobot />}
        </div>
        <div className="message-content">
          <div className="message-text">{msg.text}</div>
        </div>
      </div>
    ));

  const renderQuickActions = () => (
    <div className="quick-actions-scroll">
      {quickQuestions.map((item, i) => (
        <button
          key={i}
          onClick={() => sendMessage(item.text)}
          className="quick-btn"
        >
          <span className="emoji">{item.emoji}</span>
          <span className="quick-text">{item.text}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="chatbot-wrapper">
      <button
        onClick={toggleChat}
        className={`chatbot-toggle ${isOpen ? "active" : ""}`}
        aria-label={isOpen ? "Закрыть чат" : "Открыть чат"}
      >
        {isOpen ? <FaTimes /> : (
          <div className="chat-icon-wrapper">
            <FaRobot className="main-icon" />
            <div className="notification-dot"></div>
          </div>
        )}
      </button>

      {isOpen && (
        <div className="chatbot-modal-overlay" onClick={toggleChat}>
          <div className="chatbot-modal" onClick={(e) => e.stopPropagation()}>
            <div className="chatbot-header">
              <div className="header-content">
                <div className="avatar">
                  <FaRobot />
                </div>
                <div className="header-text">
                  <h3>Скутер-Ассистент</h3>
                  <span className="status online">Online</span>
                </div>
                <button
                  className="close-btn"
                  onClick={toggleChat}
                  aria-label="Закрыть чат"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            <div className="chatbot-messages" ref={chatContainerRef}>
              {renderMessages()}
              {isLoading && (
                <div className="message bot">
                  <div className="avatar">
                    <FaRobot />
                  </div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="quick-section">
              <div
                className="quick-actions-toggle"
                onClick={toggleQuickActions}
                role="button"
                tabIndex={0}
                aria-expanded={isQuickActionsVisible}
              >
                Быстрые вопросы
                {isQuickActionsVisible ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {isQuickActionsVisible && renderQuickActions()}
            </div>

            <div className="chatbot-input">
              <button
                onClick={toggleRecording}
                className={`mic-btn ${isRecording ? "recording" : ""}`}
                aria-label="Голосовой ввод"
              >
                <FaMicrophone />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Напишите сообщение..."
                aria-label="Текстовое сообщение"
              />
              <button
                onClick={handleSend}
                className="send-btn"
                aria-label="Отправить сообщение"
                disabled={!input.trim()}
              >
                <FaPaperPlane className="send-icon" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidgetBot;
