import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/ConnectionSlice";
import { motion } from "framer-motion";
import { MessageCircle, MapPin, Users, ArrowLeft} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const navigate = useNavigate();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

const handleChatClick = (id ) => {
  // console.log(firstName);
  navigate(`/room/${id}`); // ✅ correct URL
};


  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <Users className="w-16 h-16 text-pink-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          No connections yet
        </h2>
        <p className="text-gray-600">
          When you match with someone, they'll appear here
        </p>
      </div>
    );
  }

  return (
    <div className="  gap-6 bg-base-200 py-3 px-4 sm:p-5   md:px-10 ">
       <button
        onClick={() => navigate("/")}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <ArrowLeft className="w-5 h-5 text-gray-600" />
      </button>
      {connections.map((connection, index) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          isOnline,
          lastMessage,
          lastMessageTime,
        } = connection;

        return (
          <motion.div
  key={_id}
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: index * 0.1 }}
  onClick={() => handleChatClick(_id)}
  className="bg-white rounded-xl lg:rounded-2xl p-3  sm:p-4 lg:p-6 flex items-center space-x-3 sm:space-x-4 
             hover:bg-gray-500 cursor-pointer transition-colors
             w-full max-w-full md:max-w-md lg:max-w-lg m-10
             ml-0 md:ml-auto " // ml-auto pushes it to right on larger screens
>
  {/* Profile Image + Online Badge */}
  <div className="relative">
    <img
      src={photoUrl ||  `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&size=512`}
      alt={`${firstName} ${lastName}`}
      className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full object-cover"
    />
    {isOnline && (
      <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-green-500 border-2 border-white rounded-full"></div>
    )}
  </div>

  {/* User Info */}
  <div className="flex-1 min-w-0">
    <div className="flex items-center justify-between mb-1 sm:mb-2">
      <h3 className="font-semibold text-gray-800 truncate text-sm sm:text-base lg:text-lg">
        {firstName} {lastName}, {age}
      </h3>
      {lastMessageTime && (
        <span className="text-xs sm:text-sm text-gray-500 ml-2">
          {lastMessageTime}
        </span>
      )}
    </div>

    <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-1">
      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
      <span className="truncate">{gender}</span>
    </div>

    {lastMessage && (
      <p className="text-xs sm:text-sm lg:text-base text-gray-600 truncate">
        {lastMessage}
      </p>
    )}
  </div>

  {/* Chat Icon */}
  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-pink-500 ml-2" />
</motion.div>

        );
      })}
    </div>
  );
};

export default Connections;
