// RequestCard.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { X, Heart } from "lucide-react";

const RequestCard = ({ request, reviewRequest }) => {
  const user = request.fromuserId;
  const [currentImage, setCurrentImage] = useState(0);
  const totalPhotos = user.photoUrl.length || 1;

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setCurrentImage((prev) => (prev + 1) % totalPhotos),
    onSwipedRight: () =>
      setCurrentImage((prev) => (prev === 0 ? totalPhotos - 1 : prev - 1)),
    trackMouse: true,
  });

  const renderChips = () => {
    const fields = [
      "location","height","education","occupation","beliefs","languages",
      "lookingFor","preferredAgemin","preferredAgemax","distancePreference",
      "hobbies","favoriteMovies","favoriteMusic","sports","travelPreferences",
      "pets","drinking","smoking","diet"
    ];
    return fields.map((field) => {
      const value = user[field];
      if (!value || (Array.isArray(value) && value.length === 0)) return null;
      if (Array.isArray(value)) {
        return value.map((v,i) => v && (
          <span key={`${field}-${i}`} className="bg-purple-600/70 text-white text-xs sm:text-sm px-2 py-1 rounded-full mr-1 mb-1">{v}</span>
        ));
      }
      return <span key={field} className="bg-purple-600/70 text-white text-xs sm:text-sm px-2 py-1 rounded-full mr-1 mb-1">{value}</span>
    });
  };

  return (
    <motion.div
      key={request._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl overflow-hidden relative mb-6 bg-purple-600 max-w-md sm:max-w-lg mx-auto"
      {...swipeHandlers}
    >
      {/* Image section */}
<div className="w-full h-64 sm:h-80 md:h-96 relative overflow-hidden rounded-t-3xl">
  <img
    src={
      user.photoUrl[currentImage] ||
      `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random&size=512`
    }
    alt={user.firstName}
    className="w-full h-full object-contain transition-all duration-500"
  />
  {totalPhotos > 1 && (
    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
      {user.photoUrl.map((_, i) => (
        <span
          key={i}
          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
            i === currentImage ? "bg-white" : "bg-gray-400"
          }`}
          onClick={() => setCurrentImage(i)}
        ></span>
      ))}
    </div>
  )}
</div>



      {/* User info */}
      <div className="p-4 sm:p-6">
  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
    {user.firstName} {user.lastName}, {user.age}
  </h2>
  <p className="text-gray-500 mb-2">{user.gender}</p>

  <div className="mt-2 space-y-2  text-gray-800">
    {/* Basic info */}
    {user.location && <p><span className="font-semibold">Location:</span> {user.location}</p>}
    {user.height && <p><span className="font-semibold">Height:</span> {user.height}</p>}
    {user.education && <p><span className="font-semibold">Education:</span> {user.education}</p>}
    {user.occupation && <p><span className="font-semibold">Occupation:</span> {user.occupation}</p>}
    {user.beliefs && <p><span className="font-semibold">Beliefs:</span> {user.beliefs}</p>}
    {user.languages && <p><span className="font-semibold">Languages:</span> {user.languages.join(", ")}</p>}
    {user.lookingFor && <p><span className="font-semibold">Looking For:</span> {user.lookingFor}</p>}

    {/* Lifestyle & interests */}
    {user.hobbies && <p><span className="font-semibold">Hobbies:</span> {user.hobbies.join(", ")}</p>}
    {user.favoriteMovies && <p><span className="font-semibold">Favorite Movies:</span> {user.favoriteMovies.join(", ")}</p>}
    {user.favoriteMusic && <p><span className="font-semibold">Favorite Music:</span> {user.favoriteMusic.join(", ")}</p>}
    {user.sports && <p><span className="font-semibold">Sports:</span> {user.sports.join(", ")}</p>}
    {user.travelPreferences && <p><span className="font-semibold">Travel Preferences:</span> {user.travelPreferences.join(", ")}</p>}
    {user.pets && <p><span className="font-semibold">Pets:</span> {user.pets}</p>}
    {user.drinking && <p><span className="font-semibold">Drinking:</span> {user.drinking}</p>}
    {user.smoking && <p><span className="font-semibold">Smoking:</span> {user.smoking}</p>}
    {user.diet && <p><span className="font-semibold">Diet:</span> {user.diet}</p>}
  </div>
</div>


      {/* Action buttons */}
      <div className="flex border-t border-gray-200">
        <button
          className="flex-1 py-3 text-red-600 hover:bg-red-50 flex justify-center items-center space-x-2 sm:py-4"
          onClick={() => reviewRequest("rejected", request._id)}
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="font-semibold text-sm sm:text-base">Reject</span>
        </button>
        <div className="w-px bg-gray-200"></div>
        <button
          className="flex-1 py-3 text-green-600 hover:bg-green-50 flex justify-center items-center space-x-2 sm:py-4"
          onClick={() => reviewRequest("accepted", request._id)}
        >
          <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="font-bold text-sm sm:text-base">Accept</span>
        </button>
      </div>
    </motion.div>
  );
};

export default RequestCard;
