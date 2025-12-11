import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const bottomRef = useRef();
  const socketRef = useRef(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch chat messages
  const fetchChatMessages = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });

      const chatMessages = data?.messages.map((msg) => ({
        firstName: msg.senderId?.firstName,
        lastName: msg.senderId?.lastName,
        text: msg.text,
        timestamp: msg.timestamp,
      }));

      setMessages(chatMessages);
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error("Failed to fetch chat messages:", error);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId) return;

    // Initialize socket connection
    socketRef.current = createSocketConnection();

    socketRef.current.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socketRef.current.on("messageReceived", ({ firstName, lastName, text, timestamp }) => {
      setMessages((prev) => [...prev, { firstName, lastName, text, timestamp }]);
      scrollToBottom();
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId]);

  // Send message
 const sendMessage = () => {
  if (!newMessage.trim()) return;

  const messageData = {
    firstName: user.firstName,
    lastName: user.lastName,
    userId,
    targetUserId,
    text: newMessage,
  };

  // Use the existing socket connection
  socketRef.current.emit("sendMessage", messageData);

  // Update local messages
  setMessages((prev) => [...prev, { ...messageData, timestamp: new Date() }]);
  setNewMessage("");
  scrollToBottom();
};


  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-[90vh] bg-white shadow-xl rounded-xl overflow-hidden">

      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-pink-500 to-orange-400 text-white text-xl font-semibold shadow">
        Chat
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-scroll px-4 py-6 space-y-4 bg-gray-100">
        {messages.map((msg, i) => {
          const isMe = msg.firstName === user.firstName;
          return (
            <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl text-white shadow 
                  ${isMe ? "bg-gradient-to-br from-orange-500 to-pink-500 rounded-br-none" 
                  : "bg-gray-700 rounded-bl-none"}`}
              >
                <p className="text-sm mb-1">{msg.text}</p>
                <p className="text-[10px] opacity-70 text-right">
                  {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef}></div>
      </div>

      {/* Input Box */}
      <div className="p-4 bg-white border-t flex gap-3 items-center">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-5 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl shadow hover:opacity-90"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
