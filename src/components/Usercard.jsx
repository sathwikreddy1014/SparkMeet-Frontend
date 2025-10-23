import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeoneFeed } from "../utils/feedSlice";
import { useSwipeable } from "react-swipeable";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Usercard = ({ user }) => {
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

  // Swipe handlers
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
    <span key={key} className={`text-white text-xs sm:text-sm px-3 py-1 rounded-full ${color}`}>
      {text}
    </span>
  );

  return (
    <div className="relative w-full max-w-md md:max-w-lg mx-auto rounded-xl shadow-2xl overflow-hidden">
      <figure
        className="w-full h-[calc(100vh-4rem)] relative rounded-xl cursor-grab"
        {...handlers}
      >
        {/* Photos */}
        {photoUrl.length > 0 ? (
          <img
            src={photoUrl[currentImage]}
            alt={`userPhoto-${currentImage}`}
            className="w-full h-full object-cover transition-transform duration-500"
          />
        ) : (
          <img
            src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&size=512`}
            alt="default-avatar"
            className="w-full h-full object-cover"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

        {/* Top Info */}
        <div className="absolute top-0 left-0 w-full p-5 flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-white">
              {firstName} {lastName && lastName.charAt(0) + "."}, {age}
            </h2>
            {location && <p className="text-gray-200 text-sm">{location}</p>}
          </div>

          {matchScore !== undefined && matchScore >= 6 && (
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg">
              <p className="text-red-400 text-2xl font-semibold">
                {Math.round((matchScore / 10) * 100)}%
              </p>
            </div>
          )}
        </div>

        {/* Bottom Info Chips */}
        <div className="absolute bottom-20 left-0 w-full px-5 flex flex-wrap gap-2">
          {education && chip(education, "bg-purple-600/70", "edu")}
          {occupation && chip(occupation, "bg-purple-600/70", "occ")}
          {height && chip(height, "bg-blue-600/70", "height")}
          {lookingFor && chip(lookingFor, "bg-blue-600/70", "relation")}
          {belief && chip(belief, "bg-pink-600/70", "belief")}
          {diet && chip(diet, "bg-green-600/70", "diet")}
          {drinking && chip(`Drinks: ${drinking}`, "bg-green-600/70", "drink")}
          {smoking && chip(`Smokes: ${smoking}`, "bg-green-600/70", "smoke")}
          {pets && chip(pets, "bg-green-600/70", "pets")}
          {sports?.map((s, i) => chip(s, "bg-orange-600/70", `sport-${i}`))}
          {travelPreferences?.map((t, i) => chip(t, "bg-yellow-600/70", `travel-${i}`))}
          {languages?.map((l, i) => chip(l, "bg-teal-600/70", `lang-${i}`))}
        </div>
      </figure>
    </div>
  );
};

export default Usercard;
