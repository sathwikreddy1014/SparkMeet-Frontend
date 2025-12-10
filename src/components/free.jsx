// import React, { useState } from "react";
// import Usercard from "./Usercard";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";

// const OPTIONS = {
//   education: ["High School", "Bachelor’s", "Master’s", "PhD", "Other"],
//   occupation: ["Job", "Business", "Student", "Other"],
//   beliefs: ["Spiritual", "Religious", "Agnostic", "Atheist"],
//   lookingFor: ["Long Term", "Short Term", "Go with the Flow"],
//   drinking: ["yes", "no", "sometimes"],
//   smoking: ["yes", "no", "occasionally"],
//   diet: ["veg", "non-veg", "vegan", "other"],
//   sports: ["Cricket", "Football", "Basketball", "Tennis"],
//   travelPreferences: ["Mountains", "Beaches", "Road Trips", "Adventure", "City Life"],
//   pets: ["dog", "cat", "both", "none"],
// };

// const LANGUAGES = ["English", "Hindi", "Telugu", "Tamil", "Kannada"];

// const toArray = (v) => {
//   if (!v) return [];
//   if (Array.isArray(v)) return v;
//   if (typeof v === "string") return v.split(",").map((s) => s.trim()).filter(Boolean);
//   return [];
// };

// const Editprofile = ({ user }) => {
//   const u = user?.data || {};
//   const dispatch = useDispatch();

//   // Basic Info
//   const [firstName, setFirstName] = useState(u.firstName || "");
//   const [lastName, setLastName] = useState(u.lastName || "");
//   const [photoUrl, setPhotoUrl] = useState(u.photoUrl || "");
//   const [age, setAge] = useState(u.age !== undefined ? String(u.age) : "");
//   const [gender, setGender] = useState(u.gender || "");
//   const [location, setLocation] = useState(u.location || u.Location || "");
//   const [about, setAbout] = useState(u.about || "");

//   // Height
//   const [height, setHeight] = useState(() => {
//     const h = u.height || u.Height;
//     if (!h) return { value: "", unit: "cm" };
//     if (typeof h === "string") {
//       if (h.includes("cm")) return { value: h.replace("cm", "").trim(), unit: "cm" };
//       return { value: h, unit: "ft" };
//     }
//     if (typeof h === "object") return { value: h.value !== undefined ? String(h.value) : "", unit: h.unit || "cm" };
//     return { value: "", unit: "cm" };
//   });

//   // Lifestyle & Preferences
//   const [education, setEducation] = useState(u.education || u.Education || "");
//   const [occupation, setOccupation] = useState(u.occupation || u.Occupation || "");
//   const [beliefs, setBeliefs] = useState(u.beliefs || u.Beliefs || "");
//   const [languages, setLanguages] = useState(toArray(u.languages || u.Languages));
//   const [LookingFor, setLookingFor] = useState(u.lookingFor || u.LookingFor || "");
//   const [preferredAge, setPreferredAge] = useState(() => {
//     const p = u.preferredAge || u.PreferredAge;
//     if (!p) return { min: 18, max: 30 };
//     if (Array.isArray(p) && p.length === 2) return { min: Number(p[0]) || 18, max: Number(p[1]) || 30 };
//     if (typeof p === "object" && p.min !== undefined && p.max !== undefined)
//       return { min: Number(p.min) || 18, max: Number(p.max) || 30 };
//     if (typeof p === "string") {
//       const m = p.match(/(\d{1,2})\D+(\d{1,2})/);
//       if (m) return { min: Number(m[1]), max: Number(m[2]) };
//     }
//     return { min: 18, max: 30 };
//   });
//   const [distancePreference, setDistancePreference] = useState(u.distancePreference ?? u.DistancePreference ?? 50);

//   // Interests
//   const [hobbies, setHobbies] = useState(toArray(u.hobbies || u.Hobbies));
//   const [favoriteMovies, setFavoriteMovies] = useState(toArray(u.favoriteMovies || u.Favoritemovies));
//   const [favoriteMusic, setFavoriteMusic] = useState(toArray(u.favoriteMusic || u.FavoriteMusic));
//   const [sports, setSports] = useState(toArray(u.sports || u.Sports));
//   const [travelPreferences, setTravelPreferences] = useState(toArray(u.travelPreferences || u.TravelPreferences));
//   const [pets, setPets] = useState(toArray(u.pets));
//   const [drinking, setDrinking] = useState(u.drinking || u.Drinking );
//   const [smoking, setSmoking] = useState(u.smoking || u.Smoking );
//   const [diet, setDiet] = useState(u.diet || u.Diet );

//   const [toast, setToast] = useState(false);
//   const [error, setError] = useState("");

//   // Utilities
//   const toggleMultiSelect = (state, setState, value, max = 5) => {
//     if (state.includes(value)) setState(state.filter((v) => v !== value));
//     else if (state.length < max) setState([...state, value]);
//   };
//   const setPrefMin = (val) => {
//     const n = Number(val);
//     setPreferredAge((p) => ({ min: Math.min(n, p.max), max: p.max }));
//   };
//   const setPrefMax = (val) => {
//     const n = Number(val);
//     setPreferredAge((p) => ({ min: p.min, max: Math.max(n, p.min) }));
//   };
//   const inputBase =
//     "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white";

//   const saveProfile = async (e) => {
//     e.preventDefault();
//     setError("");

//     const payload = {
//       firstName: firstName?.trim() || "",
//       lastName: lastName?.trim() || "",
//       age: age ? Number(age) : null,
//       gender: gender?.toLowerCase() || "other",
//       photoUrl: photoUrl || "",
//       about: about || "",
//       location: location || "",
//       height: height?.value ? { value: Number(height.value), unit: height.unit || "cm" } : { value: null, unit: "cm" },
//       education: education || "",
//       occupation: occupation || "",
//       beliefs: beliefs || "",
//       languages: Array.isArray(languages) ? languages : [],
//       lookingFor: lookingFor || "",
//       preferredAge: { min: preferredAge?.min || 18, max: preferredAge?.max || 30 },
//       distancePreference: Number(distancePreference) || 0,
//       hobbies: Array.isArray(hobbies) ? hobbies : [],
//       favoriteMovies: Array.isArray(favoriteMovies) ? favoriteMovies : [],
//       favoriteMusic: Array.isArray(favoriteMusic) ? favoriteMusic : [],
//       sports: Array.isArray(sports) ? sports : [],
//       travelPreferences: Array.isArray(travelPreferences) ? travelPreferences : [],
//       pets: pets || "",
//       drinking: drinking || "",
//       smoking: smoking || "",
//       diet: diet || "",
//     };

//     const cleanPayload = Object.fromEntries(
//       Object.entries(payload).filter(([key, v]) => {
//         if (v === null) return false;
//         if (typeof v === "string" && v.trim() === "") return false;
//         if (Array.isArray(v) && v.length === 0) return false;
//         if (typeof v === "object" && Object.keys(v).length === 0) return false;
//         if (key === "height" && (!v.value || v.value === null)) return false;
//         return true;
//       })
//     );

//     if (cleanPayload.gender) {
//       cleanPayload.gender = cleanPayload.gender.charAt(0).toUpperCase() + cleanPayload.gender.slice(1).toLowerCase();
//     }

//     try {
//       console.log("Payload being sent:", cleanPayload);
//       const res = await axios.patch(`${BASE_URL}/profile/edit`, cleanPayload, { withCredentials: true });
//       dispatch(addUser(res.data));
//       setToast(true);
//       setTimeout(() => setToast(false), 3000);
//     } catch (err) {
//       setError(err?.response?.data?.message || err.message || "Failed to save profile");
//     }
//   };

//   // Reusable chip component
// const ChipGroup = ({ options, value, setValue, max = 5 }) => {
//   const safeValue = Array.isArray(value) ? value : value ? [value] : [];

//   return (
//     <div className="flex gap-2 flex-wrap">
//       {options.map((o) => (
//         <button
//           key={o}
//           type="button"
//           onClick={() => toggleMultiSelect(safeValue, setValue, o, max)}
//           className={`px-3 py-1 rounded-full text-sm border ${
//             safeValue.includes(o) ? "bg-blue-600 text-white border-transparent" : "bg-gray-200 text-gray-800"
//           }`}
//         >
//           {o}
//         </button>
//       ))}
//     </div>
//   );
// };


//   return (
//     <>
//       <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-10 gap-8">
//         {/* Form */}
//         <div className="flex-1 w-full lg:w-2/3">
//           <form onSubmit={saveProfile} className="bg-white dark:bg-gray-800 p-6 md:p-10 rounded-2xl shadow-lg space-y-10">
//             <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white">Edit Profile</h2>

//             {/* Basic Info */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               {[
//                 { label: "First Name", value: firstName, setter: setFirstName, placeholder: "First Name" },
//                 { label: "Last Name", value: lastName, setter: setLastName, placeholder: "Last Name" },
//                 { label: "Photo URL", value: photoUrl, setter: setPhotoUrl, placeholder: "https://..." },
//                 { label: "Age", value: age, setter: setAge, placeholder: "Age", type: "number" },
//               ].map((f, i) => (
//                 <div key={i}>
//                   <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">{f.label}</label>
//                   <input
//                     type={f.type || "text"}
//                     className={inputBase}
//                     value={f.value}
//                     onChange={(e) => f.setter(e.target.value)}
//                     placeholder={f.placeholder}
//                   />
//                 </div>
//               ))}

//               <div>
//                 <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Gender</label>
//                 <select className={inputBase} value={gender || ""} onChange={(e) => setGender(e.target.value)}>
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               <div className="sm:col-span-2">
//                 <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">About</label>
//                 <textarea className={inputBase} rows="3" value={about} onChange={(e) => setAbout(e.target.value)} placeholder="Short bio" />
//               </div>
//             </div>

//             {/* Lifestyle & Background */}
//             <div className="space-y-6">
//               <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white">📍 Lifestyle & Background</h2>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Location / City</label>
//                   <input className={inputBase} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City name" />
//                 </div>

//                 <div>
//                   <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Height</label>
//                   <div className="flex gap-2">
//                     <input className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white" value={height.value} onChange={(e) => setHeight({ ...height, value: e.target.value })} placeholder="e.g. 175 or 5'9&quot;" />
//                     <select className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white" value={height.unit} onChange={(e) => setHeight({ ...height, unit: e.target.value })}>
//                       <option value="cm">cm</option>
//                       <option value="ft">ft</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Highest Education</label>
//                   <select
//                     className={inputBase}
//                     value={typeof education === "string" ? education : (education?.[0] || "")}
//                     onChange={(e) => setEducation(e.target.value)}
//                   >
//                     <option value="">Select Education</option>
//                     {OPTIONS.education.map((o) => <option key={o} value={o}>{o}</option>)}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Occupation</label>
//                   <ChipGroup options={OPTIONS.occupation} value={[occupation]} setValue={(v) => setOccupation(v[0] || "")} max={1} />
//                 </div>

//                 <div className="sm:col-span-2">
//                   <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Beliefs</label>
//                   <ChipGroup options={OPTIONS.beliefs} value={[beliefs]} setValue={(v) => setBeliefs(v[0] || "")} max={1} />
//                 </div>

//                 <div className="sm:col-span-2">
//                   <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Languages (max 5)</label>
//                   <ChipGroup options={LANGUAGES} value={languages} setValue={setLanguages} max={5} />
//                   <p className="text-xs text-gray-500 mt-1">Selected: {languages.join(", ") || "—"}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Preferences */}
//             <div className="space-y-6">
//               <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white">❤️ Preferences</h2>

//               <div>
//                 <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Looking For</label>
//                 <ChipGroup options={OPTIONS.lookingFor} value={[LookingFor]} setValue={ setLookingFor} max={1} />
//               </div>

//               <div>
//                 <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Preferred Age: {preferredAge.min} - {preferredAge.max}</label>
//                 <div className="flex gap-3 items-center">
//                   <input type="range" min="18" max="60" value={preferredAge.min} onChange={(e) => setPrefMin(e.target.value)} className="w-full" />
//                   <input type="range" min="18" max="60" value={preferredAge.max} onChange={(e) => setPrefMax(e.target.value)} className="w-full" />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Distance Preference: {distancePreference} km</label>
//                 <input type="range" min="0" max="120" value={distancePreference} onChange={(e) => setDistancePreference(Number(e.target.value))} className="w-full" />
//               </div>
//             </div>

//             {/* Interests */}
//             <div className="space-y-6">
//               <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white">🎯 Personality & Interests</h2>

//               {[
//                 { label: "Hobbies (comma separated)", value: hobbies, setter: setHobbies },
//                 { label: "Favorite Movies (comma separated)", value: favoriteMovies, setter: setFavoriteMovies },
//                 { label: "Favorite Music / Songs (comma separated)", value: favoriteMusic, setter: setFavoriteMusic },
//               ].map((f, i) => (
//                 <div key={i}>
//                   <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">{f.label}</label>
//                   <input className={inputBase} value={f.value.join(", ")} onChange={(e) => f.setter(e.target.value.split(",").map(s => s.trim()).filter(Boolean))} placeholder="Type and separate with commas" />
//                 </div>
//               ))}

//               <div>
//                 <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Sports</label>
//                 <ChipGroup options={OPTIONS.sports} value={sports} setValue={setSports} max={10} />
//               </div>

//               <div>
//                 <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Travel Preferences</label>
//                 <ChipGroup options={OPTIONS.travelPreferences} value={travelPreferences} setValue={setTravelPreferences} max={10} />
//               </div>
//             </div>

//             {/* Lifestyle Choices */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Pets</label>
//                 <ChipGroup options={OPTIONS.pets} value={pets} setValue={setPets} max={1} />
//               </div>

//               <div>
//                 <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Drinking</label>
//                 <ChipGroup options={OPTIONS.drinking} value={drinking} setValue={setDrinking} max={10} />
//               </div>

//               <div>
//                 <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Smoking</label>
//                 <ChipGroup options={OPTIONS.smoking} value={smoking} setValue={setSmoking} max={1} />
//               </div>

//               <div>
//                 <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Diet</label>
//                 <ChipGroup options={OPTIONS.diet} value={diet} setValue={setDiet} max={1} />
//               </div>
//             </div>

//             {/* Submit */}
//             <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
//               Save Profile
//             </button>
//             {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
//             {toast && <p className="text-green-500 mt-2 text-center">Profile updated successfully!</p>}
//           </form>
//         </div>

//         {/* Live Preview */}
//         <div className="flex-1 lg:w-1/3">
//           <Usercard user={{ firstName, lastName, photoUrl, age, gender, about, location, hobbies, favoriteMovies, favoriteMusic, sports, travelPreferences, pets, drinking, smoking, diet}} />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Editprofile;
















// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useDispatch } from "react-redux";
// import { removeoneFeed } from "../utils/feedSlice";

// const Usercard = ({ user }) => {
//   const dispatch = useDispatch();

//   const {
//     _id,
//     firstName,
//     lastName,
//     age,
//     gender,
//     photoUrl,
//     about,
//     location,
//     height,
//     education,
//     occupation,
//     beliefs,
//     languages,
//     lookingFor,
//     preferredAge,
//     distancePreference,
//     hobbies,
//     favoriteMovies,
//     favoriteMusic,
//     sports,
//     travelPreferences,
//     pets,
//     drinking,
//     smoking,
//     diet,
//   } = user || {};

//   const reviewMatch = async (status, userId) => {
//     try {
//       await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, { withCredentials: true });
//       dispatch(removeoneFeed(_id));
//     } catch (error) {
//       console.error("error", error.message);
//     }
//   };

//   // Format preferred age for display (supports [min,max] or {min,max} or single value)
//   const preferredAgeDisplay = (() => {
//     if (!preferredAge) return null;
//     if (Array.isArray(preferredAge) && preferredAge.length === 2) return `${preferredAge[0]} - ${preferredAge[1]} yrs`;
//     if (typeof preferredAge === "object" && preferredAge.min !== undefined && preferredAge.max !== undefined)
//       return `${preferredAge.min} - ${preferredAge.max} yrs`;
//     return String(preferredAge);
//   })();

//   const distanceDisplay = distancePreference !== undefined && distancePreference !== null ? `${distancePreference} km` : null;

//   return (
//     <div className="shadow-lg rounded-2xl overflow-hidden max-w-sm sm:max-w-md mx-auto transition-transform hover:scale-105 duration-300 bg-white">
//       {/* Image Section */}
//       <figure className="h-60 w-full flex items-center justify-center bg-gray-100">
//         <img
//           src={
//             photoUrl
//               ? photoUrl
//               : "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg"
//           }
//           alt="userPhoto"
//           className="object-cover h-full w-full"
//         />
//       </figure>

//       {/* Body Section */}
//       <div className="p-4 flex flex-col gap-3">
//         <h2 className="text-xl font-semibold text-center">
//           {firstName || "Unknown"} {lastName || ""}{" "}
//           {age ? <span className="text-gray-500">, {age}</span> : null}
//            {gender ? <span className="text-gray-500">, {gender}</span> : null}
//         </h2>

//         {about && <p className="text-center text-gray-600">{about}</p>}

//         {/* Quick Info */}
//         <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
//           {location && <p className="truncate">📍 {location}</p>}
//           {education && <p className="truncate">🎓 {education}</p>}
//           {occupation && <p className="truncate">💼 {occupation}</p>}
//           {beliefs && <p className="truncate">🙏 {beliefs}</p>}
//           {diet && <p className="truncate">🥗 {diet}</p>}
//           {drinking && <p className="truncate">🍷 {drinking}</p>}
//           {smoking && <p className="truncate">🚬 {smoking}</p>}
//           {pets && <p className="truncate">🐾 {pets}</p>}
//           {height && height.value !== undefined && (
//             <p className="truncate">📏 {height.value} {height.unit}</p>
//           )}
//           {preferredAgeDisplay && <p className="truncate">🎂 Pref: {preferredAgeDisplay}</p>}
//           {distanceDisplay && <p className="truncate">📍 Dist: {distanceDisplay}</p>}
//         </div>

//         {/* Languages */}
//         {languages?.length > 0 && (
//           <div>
//             <h3 className="font-medium text-sm">🗣️ Languages</h3>
//             <p className="text-gray-600 text-sm truncate">{languages.join(", ")}</p>
//           </div>
//         )}

//         {/* Looking For */}
//         {lookingFor && (
//           <div>
//             <h3 className="font-medium text-sm">❤️ Looking For</h3>
//             <p className="text-gray-600 text-sm">{lookingFor}</p>
//           </div>
//         )}

//         {/* Hobbies */}
//         {hobbies?.length > 0 && (
//           <div>
//             <h3 className="font-medium text-sm">🎨 Hobbies</h3>
//             <div className="flex flex-wrap gap-2">
//               {hobbies.map((hobby, i) => (
//                 <span key={i} className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">
//                   {hobby}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Favorites (show only first few) */}
//         {favoriteMovies?.length > 0 && (
//           <div>
//             <h3 className="font-medium text-sm">🎬 Favorite Movies</h3>
//             <p className="text-gray-600 text-sm">{favoriteMovies.slice(0, 3).join(", ")}</p>
//           </div>
//         )}

//         {favoriteMusic?.length > 0 && (
//           <div>
//             <h3 className="font-medium text-sm">🎶 Favorite Music</h3>
//             <p className="text-gray-600 text-sm">{favoriteMusic.slice(0, 3).join(", ")}</p>
//           </div>
//         )}

//         {sports?.length > 0 && (
//           <div>
//             <h3 className="font-medium text-sm">🏀 Sports</h3>
//             <p className="text-gray-600 text-sm">{sports.join(", ")}</p>
//           </div>
//         )}

//         {travelPreferences?.length > 0 && (
//           <div>
//             <h3 className="font-medium text-sm">✈️ Travel</h3>
//             <p className="text-gray-600 text-sm">{travelPreferences.join(", ")}</p>
//           </div>
//         )}

//         {/* Actions */}
//         <div className="flex justify-center gap-4 mt-4">
//           <button
//             className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6 py-2 text-sm flex-1"
//             onClick={() => reviewMatch("pass", _id)}
//           >
//             Pass
//           </button>
//           <button
//             className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-6 py-2 text-sm flex-1"
//             onClick={() => reviewMatch("like", _id)}
//           >
//             Like
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Usercard;
