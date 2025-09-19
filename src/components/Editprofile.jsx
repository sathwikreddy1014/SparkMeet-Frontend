import React, { useState } from "react";
import Usercard from "./Usercard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Editprofile = ({ user }) => {
  const dispatch = useDispatch();

  const [firstName, setfirstname] = useState(user.data?.firstName || "");
  const [lastName, setlastName] = useState(user.data?.lastName || "");
  const [photoUrl, setphotoUrl] = useState(user.data?.photoUrl || "");
  const [age, setage] = useState(user.data?.age || "");
  const [gender, setgender] = useState(user.data?.gender || "");
  const [location, setloaction] = useState(user.data?.about || "");
  const [height, setheight] = useState(Number(user.data?.height) || "");
  const [education, seteducation] = useState(user.data?.education || "");
  const [occupation, setoccupation] = useState(user.data?.occupation || "");
  const [belief, setbelief] = useState(user.data?.belief || "");
  const [lookingFor, setlookingFor] = useState(user.data?.lookingFor || "");
  const [drinking, setdrinking] = useState(user.data?.drinking || "");
  const [smoking, setsmoking] = useState(user.data?.smoking || "");
  const [diet, setdiet] = useState(user.data?.diet || "");
  const [sports, setsports] = useState(user.data?.sports || []);
  const [travelPreferences, settravelPreferences] = useState(user.data?.travelPreferences || []);
  const [languages, setlanguages] = useState(user.data?.languages || []);
  const [pets, setpets] = useState(user.data?.pets || "");
  const [toast, settoast] = useState(false);
  const [error, seterror] = useState("");

  // Multi-select toggle function
  const toggleSelection = (value, state, setState) => {
    if (state.includes(value)) {
      setState(state.filter((v) => v !== value));
    } else {
      setState([...state, value]);
    }
  };

  const saveProfile = async (e) => {
    e.preventDefault(); // prevent refresh
    seterror("");

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          location,
          height,
          photoUrl,
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
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      settoast(true);
      setTimeout(() => settoast(false), 3000);
    } catch (error) {
      seterror(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 md:p-10 gap-6 lg:gap-8">
        {/* Left: Form */}
        <div className="flex-1 w-full lg:w-2/3">
          <section className="bg-white dark:bg-gray-800 p-6 sm:p-8 md:p-10 rounded-lg shadow-md">
            <form
              className="w-full bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-md"
              onSubmit={saveProfile}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                Edit Profile
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
                    onChange={(e) => setfirstname(e.target.value)}
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </div>

                {/* Photo URL */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">Photo URL</label>
                  <input
                    type="url"
                    value={photoUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSYbP-248zDkKcJG_swsx0pK2Hhe8hwE0fHQ&s"}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
                    onChange={(e) => setphotoUrl(e.target.value)}
                  />
                </div>

                {/* Age */}
                <div>
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">Age</label>
                  <input
                    type="number"
                    value={age}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
                    onChange={(e) => setage(e.target.value)}
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setgender(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Height */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">Height</label>
                  <input
                    type="number"
                    value={height}
                    placeholder="cm or feets"
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
                    onChange={(e) => setheight(e.target.value)}
                  />
                </div>

                {/* Location */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="City Name"
                    value={location}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
                    onChange={(e) => setloaction(e.target.value)}
                  />
                </div>

                {/* Education */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">Education</label>
                  <div className="flex flex-wrap gap-3">
                    {["High School", "Bachelor’s", "Master’s", "PhD", "Other"].map((edu) => (
                      <label key={edu} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value={edu}
                          checked={education === edu}
                          onChange={(e) => seteducation(e.target.value)}
                          className="radio radio-primary"
                        />
                        <span className="text-gray-700 dark:text-gray-300">{edu}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Occupation */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">Occupation</label>
                  <div className="flex flex-wrap gap-3">
                    {["Job", "Business", "Student", "Other"].map((occ) => (
                      <label key={occ} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value={occ}
                          checked={occupation === occ}
                          onChange={(e) => setoccupation(e.target.value)}
                          className="radio radio-primary"
                        />
                        <span className="text-gray-700 dark:text-gray-300">{occ}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Belief */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">Belief</label>
                  <div className="flex flex-wrap gap-3">
                    {["Spiritual", "Religious", "Agnostic", "Atheist"].map((bel) => (
                      <label key={bel} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value={bel}
                          checked={belief === bel}
                          onChange={(e) => setbelief(e.target.value)}
                          className="radio radio-primary"
                        />
                        <span className="text-gray-700 dark:text-gray-300">{bel}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Looking For */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">Looking For</label>
                  <div className="flex flex-wrap gap-3">
                    {["Long Term RelationShip", "Short Term RelationShip", "Go with the Flow"].map(
                      (lof) => (
                        <label key={lof} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value={lof}
                            checked={lookingFor === lof}
                            onChange={(e) => setlookingFor(e.target.value)}
                            className="radio radio-primary"
                          />
                          <span className="text-gray-700 dark:text-gray-300">{lof}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* Drinking */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">Drinking</label>
                  <div className="flex flex-wrap gap-3">
                    {["Never", "Occasionally (socially)", "Frequently", "Trying to quit"].map(
                      (dri) => (
                        <label key={dri} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value={dri}
                            checked={drinking === dri}
                            onChange={(e) => setdrinking(e.target.value)}
                            className="radio radio-primary"
                          />
                          <span className="text-gray-700 dark:text-gray-300">{dri}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* Smoking */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">Smoking</label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "Non-smoker",
                      "Occasional smoker (social / light)",
                      "Regular smoker",
                      "Trying to quit",
                    ].map((smo) => (
                      <label key={smo} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value={smo}
                          checked={smoking === smo}
                          onChange={(e) => setsmoking(e.target.value)}
                          className="radio radio-primary"
                        />
                        <span className="text-gray-700 dark:text-gray-300">{smo}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Diet */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">Diet</label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "Vegetarian",
                      "Vegan",
                      "Non-vegetarian",
                      "Eggetarian (vegetarian + eggs)",
                      "Pescatarian (fish only + vegetarian)",
                      "Other / Flexible",
                    ].map((dt) => (
                      <label key={dt} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value={dt}
                          checked={diet === dt}
                          onChange={(e) => setdiet(e.target.value)}
                          className="radio radio-primary"
                        />
                        <span className="text-gray-700 dark:text-gray-300">{dt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sports - MULTISELECT */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">Sports</label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "Football",
                      "Basketball",
                      "Tennis",
                      "Cricket",
                      "Running",
                      "Yoga",
                      "Gym",
                      "Cycling",
                      "Hiking",
                      "Golf",
                      "Other",
                    ].map((spo) => (
                      <label key={spo} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={spo}
                          checked={sports.includes(spo)}
                          onChange={() => toggleSelection(spo, sports, setsports)}
                          className="checkbox checkbox-primary"
                        />
                        <span className="text-gray-700 dark:text-gray-300">{spo}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Travel Preferences - MULTISELECT */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">Travel Preferences</label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "Beach",
                      "Mountains",
                      "Culture",
                      "Adventure",
                      "Road Trips",
                      "Luxury",
                      "City Tours",
                      "Backpacking",
                      "Foodie Trips",
                      "Other",
                    ].map((tp) => (
                      <label key={tp} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={tp}
                          checked={travelPreferences.includes(tp)}
                          onChange={() => toggleSelection(tp, travelPreferences, settravelPreferences)}
                          className="checkbox checkbox-primary"
                        />
                        <span className="text-gray-700 dark:text-gray-300">{tp}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Languages - MULTISELECT */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">Languages</label>
                  <div className="flex flex-wrap gap-3">
                    {["English", "Hindi", "Telugu", "Tamil", "Kannada"].map((lg) => (
                      <label key={lg} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={lg}
                          checked={languages.includes(lg)}
                          onChange={() => toggleSelection(lg, languages, setlanguages)}
                          className="checkbox checkbox-primary"
                        />
                        <span className="text-gray-700 dark:text-gray-300">{lg}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Pets */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">Pets</label>
                  <div className="flex flex-wrap gap-3">
                    {["Dogs", "Cats", "Birds", "Small Mammals", "Reptiles", "No Pets", "Open to Pets", "Other"].map(
                      (pt) => (
                        <label key={pt} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value={pt}
                            checked={pets === pt}
                            onChange={(e) => setpets(e.target.value)}
                            className="radio radio-primary"
                          />
                          <span className="text-gray-700 dark:text-gray-300">{pt}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition mt-6"
              >
                Save Changes
              </button>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
            </form>
          </section>
        </div>

        {/* Right: Live Preview */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-gray-800 dark:text-white text-center">
              Live Preview
            </h3>
            <Usercard
              user={{
                firstName,
                lastName,
                age,
                gender,
                location,
                height,
                photoUrl,
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
              }}
            />
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="toast toast-top toast-center py-20">
          <div className="alert alert-success">
            <span>Profile Updated Successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Editprofile;
