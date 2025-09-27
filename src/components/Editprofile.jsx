import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import Usercard from "./Usercard";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  // User info states
  const [firstName, setFirstName] = useState(user.data?.firstName || "");
  const [lastName, setLastName] = useState(user.data?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(
    Array.isArray(user.data?.photoUrl) ? user.data.photoUrl : []
  );
  const [age, setAge] = useState(user.data?.age || "");
  const [gender, setGender] = useState(user.data?.gender || "");
  const [location, setLocation] = useState(user.data?.location || "");
  const [height, setHeight] = useState(Number(user.data?.height) || "");
  const [distancePreference, setDistancePreference] = useState(
    Number(user.data?.distancePreference) || 0
  );
  const [education, setEducation] = useState(user.data?.education || "");
  const [occupation, setOccupation] = useState(user.data?.occupation || "");
  const [belief, setBelief] = useState(user.data?.belief || "");
  const [lookingFor, setLookingFor] = useState(user.data?.lookingFor || "");
  const [drinking, setDrinking] = useState(user.data?.drinking || "");
  const [smoking, setSmoking] = useState(user.data?.smoking || "");
  const [diet, setDiet] = useState(user.data?.diet || "");
  const [sports, setSports] = useState(user.data?.sports || []);
  const [travelPreferences, setTravelPreferences] = useState(
    user.data?.travelPreferences || []
  );
  const [languages, setLanguages] = useState(user.data?.languages || []);
  const [pets, setPets] = useState(user.data?.pets || "");
  const [preferredAgemin, setPreferredAgemin] = useState(
    user.data?.preferredAgemin || 18
  );
  const [preferredAgemax, setPreferredAgemax] = useState(
    user.data?.preferredAgemax || 30
  );
  const [toast, setToast] = useState(false);
  const [error, setError] = useState("");
  const [stagedPhotos, setStagedPhotos] = useState([]); // for uploading images with loader

  // Multi-select toggle helper
  const toggleSelection = (value, state, setState) => {
    if (state.includes(value)) setState(state.filter((v) => v !== value));
    else setState([...state, value]);
  };

  // Upload photo handler
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Generate temporary local URL for preview
    const tempUrl = URL.createObjectURL(file);
    setStagedPhotos((prev) => [...prev, { url: tempUrl, loading: true }]);

    const formData = new FormData();
    formData.append("images", file);

    try {
      const res = await axios.post(`${BASE_URL}/profile/upload-photos`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      const updatedUser = res.data.data;

      // Replace staged photo with uploaded Cloudinary URL
      setStagedPhotos((prev) =>
        prev.map((p) =>
          p.url === tempUrl
            ? { url: updatedUser.photoUrl[updatedUser.photoUrl.length - 1], loading: false }
            : p
        )
      );

      // Update saved photos
      setPhotoUrl(Array.isArray(updatedUser.photoUrl) ? updatedUser.photoUrl : []);
      dispatch(addUser(updatedUser));
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      setStagedPhotos((prev) => prev.filter((p) => p.url !== tempUrl));
      alert("Upload failed. Check console.");
    }
  };

  // Remove photo (saved or staged)
  const removePhoto = async (url, staged = false) => {
    const confirmRemove = window.confirm("Are you sure you want to delete this photo?");
    if (!confirmRemove) return;

    if (staged) {
      setStagedPhotos(stagedPhotos.filter((p) => p.url !== url));
      return;
    }

    try {
      const res = await axios.delete(`${BASE_URL}/profile/remove-photo`, {
        data: { url },
        withCredentials: true,
      });
      const updatedUser = res.data.data;
      setPhotoUrl(Array.isArray(updatedUser.photoUrl) ? updatedUser.photoUrl : []);
      dispatch(addUser(updatedUser));
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Delete failed. Check console.");
    }
  };

  // Save profile
  const saveProfile = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          age,
          gender,
          location,
          height,
          preferredAgemin,
          preferredAgemax,
          distancePreference,
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

      const updatedUser = res.data.data;
      dispatch(addUser(updatedUser));
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 md:p-10 gap-6 lg:gap-8">
        {/* Left: Form */}
        <div className="flex-1 w-full lg:w-2/3">
          <section className="bg-white dark:bg-gray-800 p-6 sm:p-8 md:p-10 rounded-lg shadow-md">
            <form onSubmit={saveProfile} className="space-y-4">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                Edit Profile
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Photos */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {/* Saved photos */}
                {photoUrl.map((url, idx) => (
                  url && (
                    <div key={`saved-${idx}`} className="relative w-full h-32">
                      <img
                        src={url}
                        alt={`photo-${idx}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(url)}
                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  )
                ))}

                {/* Staged photos */}
                {stagedPhotos.map((p, idx) => (
                  <div key={`staged-${idx}`} className="relative w-full h-32">
                    {p.loading ? (
                      <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
                        <div className="loader"></div>
                      </div>
                    ) : (
                      <img
                        src={p.url}
                        alt={`staged-${idx}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                    {!p.loading && (
                      <button
                        type="button"
                        onClick={() => removePhoto(p.url, true)}
                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}

                {/* Add new */}
                {(photoUrl.length + stagedPhotos.length) < 6 && (
                  <label className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600">
                    <span className="text-gray-500 dark:text-gray-300">+ Add</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </label>
                )}
              </div>
                                            {/* Age */}
                <div>
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    value={age}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
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
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">
                    Height
                  </label>
                  <input
                    type="number"
                    value={height}
                    placeholder="cm or feet"
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>

                {/* Location */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="City Name"
                    value={location}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                {/* Age Preference */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">
                    Age Preference:{" "}
                    <span className="font-semibold">
                      {preferredAgemin} - {preferredAgemax} years
                    </span>
                  </label>

                  <div className="flex gap-4 items-center">
                    {/* Min Age */}
                    <div className="flex flex-col items-center">
                      <input
                        type="range"
                        min="18"
                        max="60"
                        step="1"
                        value={preferredAgemin}
                        onChange={(e) =>
                          setPreferredAgemin(Number(e.target.value))
                        }
                        className="w-32"
                      />
                      <span className="text-sm text-gray-500">
                        {preferredAgemin}
                      </span>
                    </div>

                    {/* Max Age */}
                    <div className="flex flex-col items-center">
                      <input
                        type="range"
                        min="18"
                        max="60"
                        step="1"
                        value={preferredAgemax}
                        onChange={(e) =>
                          setPreferredAgemax(Number(e.target.value))
                        }
                        className="w-32"
                      />
                      <span className="text-sm text-gray-500">
                        {preferredAgemax}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Distance Preference */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">
                    Distance Preference:{" "}
                    <span className="font-semibold">
                      {distancePreference} km
                    </span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={distancePreference}
                    className="w-full"
                    onChange={(e) => setDistancePreference(e.target.value)}
                  />
                </div>

                {/* Education */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">
                    Education
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {["High School", "Bachelor’s", "Master’s", "PhD", "Other"].map(
                      (edu) => (
                        <label key={edu} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value={edu}
                            checked={education === edu}
                            onChange={(e) => setEducation(e.target.value)}
                          />
                          <span className="text-gray-700 dark:text-gray-300">
                            {edu}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* Occupation */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">
                    Occupation
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {["Job", "Business", "Student", "Other"].map((occ) => (
                      <label key={occ} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value={occ}
                          checked={occupation === occ}
                          onChange={(e) => setOccupation(e.target.value)}
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          {occ}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Belief */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">
                    Belief
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {["Spiritual", "Religious", "Agnostic", "Atheist"].map(
                      (bel) => (
                        <label key={bel} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value={bel}
                            checked={belief === bel}
                            onChange={(e) => setBelief(e.target.value)}
                          />
                          <span className="text-gray-700 dark:text-gray-300">
                            {bel}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* Looking For */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">
                    Looking For
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "Long Term RelationShip",
                      "Short Term RelationShip",
                      "Go with the Flow",
                    ].map((lof) => (
                      <label key={lof} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value={lof}
                          checked={lookingFor === lof}
                          onChange={(e) => setLookingFor(e.target.value)}
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          {lof}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Drinking */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">
                    Drinking
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {[
                      "Never",
                      "Occasionally (socially)",
                      "Frequently",
                      "Trying to quit",
                    ].map((dri) => (
                      <label key={dri} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value={dri}
                          checked={drinking === dri}
                          onChange={(e) => setDrinking(e.target.value)}
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          {dri}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Smoking */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">
                    Smoking
                  </label>
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
                          onChange={(e) => setSmoking(e.target.value)}
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          {smo}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Diet */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">
                    Diet
                  </label>
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
                          onChange={(e) => setDiet(e.target.value)}
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          {dt}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sports */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">
                    Sports
                  </label>
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
                          onChange={() => toggleSelection(spo, sports, setSports)}
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
                          onChange={() => toggleSelection(tp, travelPreferences, setTravelPreferences)}
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
                          onChange={() => toggleSelection(lg, languages, setLanguages)}
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
                            onChange={(e) => setPets(e.target.value)}
                            className="radio radio-primary"
                          />
                          <span className="text-gray-700 dark:text-gray-300">{pt}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition mt-6"
              >
                Save Changes
              </button>
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

      {/* Toast */}
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

export default EditProfile;
