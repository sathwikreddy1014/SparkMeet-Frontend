import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, MoreVertical, Phone, Video } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";


const Chat = () => {
  const { id } = useParams(); // other user’s ID from /chat/:id
  
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user); 
  // current user from redux

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Fetch or create chat room
  useEffect(() => {
    const initChat = async () => {
      try {
        setIsLoading(true);

        // Step 1: Create or get chat room
        const roomRes = await axios.post(
  `${BASE_URL}/api/chat/room`,
  { userId: id },
  { withCredentials: true }
);

        setRoomId(roomRes?.data?._id);
        
        

        // Step 2: Fetch chat messages
        const msgRes = await axios.get(
  `${BASE_URL}/api/chat/messages/${roomRes.data._id}`,
  { withCredentials: true }
);


        setMessages(msgRes.data);
      } catch (error) {
        console.error( "Error initializing chat:", error)
      } finally {
        setIsLoading(false);
      }
    };

    if (id && currentUser) initChat();
  }, [id, currentUser]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !roomId) return;

    try {
      const res = await axios.post(
        `${BASE_URL}/api/chat/message`,
        { roomId, text: newMessage },
        { withCredentials: true }
      );


      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error )
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
   <div className="flex flex-col h-screen  w-full md:w-3/5 lg:w-1/3 ml-auto  bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600">
  {/* Chat Header */}
  <div className="bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
    <div className="flex items-center space-x-3">
      <button
        onClick={() => navigate("/api/user/connections")}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <ArrowLeft className="w-5 h-5 text-gray-600" />
      </button>
      <div>
        <h2 className="font-semibold text-gray-800">
          Chat with 
        </h2>
      </div>
    </div>

    <div className="flex items-center space-x-2">
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <Phone className="w-5 h-5 text-gray-600" />
      </button>
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <Video className="w-5 h-5 text-gray-600" />
      </button>
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <MoreVertical className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  </div>

  {/* Messages */}
  <div className="flex-1 overflow-y-auto p-4 space-y-4">
    {messages.map((msg) => (
      <div
        key={msg._id}
        className={`flex ${msg.sender._id === currentUser._id ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`max-w-xs px-4 py-2 rounded-2xl ${
            msg.sender._id === currentUser._id
              ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
              : "bg-white text-gray-800 shadow-sm"
          }`}
        >
          <p className="text-sm">{msg.text}</p>
          <p
            className={`text-xs mt-1 ${
              msg.sender._id === currentUser._id ? "text-white/70" : "text-gray-500"
            }`}
          >
            {formatTime(msg.createdAt)}
          </p>
        </div>
      </div>
    ))}
    <div ref={messagesEndRef} />
  </div>

  {/* Message Input */}
  <div className="bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 border-t border-gray-200 p-4">
    <div className="flex items-center space-x-3">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
      <button
        onClick={handleSendMessage}
        disabled={!newMessage.trim()}
        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 rounded-full hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  </div>
</div>

  );
};

export default Chat;
