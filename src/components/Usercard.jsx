import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeoneFeed } from "../utils/feedSlice";
import { useSwipeable } from "react-swipeable";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { Heart, X, MapPin, Star } from "lucide-react";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const {
    _id,
    firstName,
    lastName,
    age,
    photoUrl = [],
    location,
    height,
    education,
    occupation,
    belief,
    lookingFor,
    drinking,
    smoking,
    diet,
    languages,
    sports,
    travelPreferences,
    pets,
    matchScore,
  } = user;

  const [currentImage, setCurrentImage] = useState(0);

  // Swipe actions
  const handlers = useSwipeable({
    onSwipedLeft: () => reviewMatch("pass", _id),
    onSwipedRight: () => reviewMatch("like", _id),
    trackMouse: true,
  });

  const reviewMatch = async (status, userId) => {
    try {
      await axios.post(`${BASE_URL}/send/${status}/${userId}`, {}, { withCredentials: true });
      dispatch(removeoneFeed(_id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const chip = (text, color, key) => (
    <span
      key={key}
      className={`text-xs sm:text-sm text-white px-3 py-1 rounded-full ${color} backdrop-blur-md`}
    >
      {text}
    </span>
  );

  return (
    <div
      className="relative w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto mt-4 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-all duration-500"
      {...handlers}
    >
      {/* Main Image */}
      <div className="relative">
        {photoUrl.length > 0 ? (
          <img
            src={photoUrl[currentImage]}
            alt="profile"
            className="w-full h-[75vh] object-cover"
          />
        ) : (
          <img
            src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&size=512`}
            alt="default-avatar"
            className="w-full h-[75vh] object-cover"
          />
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

        {/* Top Info */}
        <div className="absolute top-0 left-0 right-0 p-5 flex justify-between items-start">
          {matchScore !== undefined && (
            <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-xl">
              <p className="text-pink-400 text-lg font-semibold">
                {Math.round((matchScore / 10) * 100)}% Match
              </p>
            </div>
          )}
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentImage((prev) => (prev > 0 ? prev - 1 : 0))}
              className="text-white/80 hover:text-white text-2xl"
            >
              ◀
            </button>
            <button
              onClick={() =>
                setCurrentImage((prev) =>
                  prev < photoUrl.length - 1 ? prev + 1 : prev
                )
              }
              className="text-white/80 hover:text-white text-2xl"
            >
              ▶
            </button>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 w-full px-5 pb-6 text-white">
          <h2 className="text-3xl font-bold mb-1">
            {firstName} {lastName && lastName.charAt(0) + "."}, {age}
          </h2>
          {location && (
            <div className="flex items-center gap-1 text-gray-200 text-sm mb-2">
              <MapPin size={14} /> {location}
            </div>
          )}

          {/* Chips */}
          <div className="flex flex-wrap gap-2 mt-3">
            {education && chip(education, "bg-purple-600/70", "edu")}
            {occupation && chip(occupation, "bg-pink-600/70", "occ")}
            {height && chip(height, "bg-indigo-600/70", "height")}
            {lookingFor && chip(lookingFor, "bg-blue-600/70", "relation")}
            {belief && chip(belief, "bg-rose-600/70", "belief")}
            {diet && chip(diet, "bg-green-600/70", "diet")}
            {drinking && chip(`Drinks: ${drinking}`, "bg-green-600/70", "drink")}
            {smoking && chip(`Smokes: ${smoking}`, "bg-green-600/70", "smoke")}
            {pets && chip(pets, "bg-yellow-600/70", "pets")}
            {sports?.map((s, i) => chip(s, "bg-orange-600/70", `sport-${i}`))}
            {travelPreferences?.map((t, i) =>
              chip(t, "bg-teal-600/70", `travel-${i}`)
            )}
            {languages?.map((l, i) => chip(l, "bg-sky-600/70", `lang-${i}`))}
          </div>
        </div>
      </div>

      {/* Like / Pass Buttons */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-10">
        <button
          onClick={() => reviewMatch("pass", _id)}
          className="bg-white/20 hover:bg-white/30 text-red-400 backdrop-blur-md rounded-full p-5 transition-all shadow-lg"
        >
          <X size={28} />
        </button>
        <button
          onClick={() => reviewMatch("like", _id)}
          className="bg-gradient-to-br from-pink-500 to-red-500 hover:opacity-90 text-white rounded-full p-5 transition-all shadow-lg"
        >
          <Heart size={28} />
        </button>
      </div>
    </div>
  );
};

export default UserCard;
