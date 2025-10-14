  // Editprofile.jsx
  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { useDispatch } from "react-redux";
  import { addUser } from "../utils/userSlice";
  import { BASE_URL } from "../utils/constants";
  import Usercard from "./Usercard"
// import { useNavigate } from "react-router-dom";

  const Editprofile = ({ user }) => {
    (user);
    
    const dispatch = useDispatch();
    // const navigate = useNavigate()
    // State for all profile fields
    const [profileData, setProfileData] = useState({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      photoUrl: Array.isArray(user?.photoUrl) ? user?.photoUrl : [],
      age: user?.age || "",
      gender: user?.gender || "",
      location: user?.location || "",
      height: user?.height || "",
      preferredAgemin: user?.preferredAgemin || 18,
      preferredAgemax: user?.preferredAgemax || 30,
      distancePreference: user?.distancePreference || 0,
      education: user?.education || "",
      occupation: user?.occupation || "",
      belief: user?.belief || "",
      lookingFor: user?.lookingFor || "",
      drinking: user?.drinking || "",
      smoking: user?.smoking || "",
      diet: user?.diet || "",
      sports: user?.sports || [],
      travelPreferences: user?.travelPreferences || [],
      languages: user?.languages || [],
      pets: user?.pets || "",
    });

  useEffect(() => {
    if (typeof user?.photoUrl === "string") {
      setProfileData(prev => ({
        ...prev, // keep existing fields
        photoUrl: user.data.photoUrl.split(",") // only update photoUrl
      }));
    }
  }, [user.data]);

    const [stagedPhotos, setStagedPhotos] = useState([]);
    const [error, setError] = useState("");
    const [toast, setToast] = useState(false);

    // Toggle selection for multi-select fields
    const toggleSelection = (value, stateArray, setState) => {
      if (stateArray.includes(value)) setState(stateArray.filter((v) => v !== value));
      else setState([...stateArray, value]);
    };

    // Upload photo handler
    const handlePhotoUpload = async (e) => {
      const files = Array.from(e.target.files);
      if (!files.length) return;

      const totalPhotos = profileData.photoUrl.length + stagedPhotos.length + files.length;
      if (totalPhotos > 6) {
        alert("You can upload max 6 images only");
        return;
      }

      for (const file of files) {
        const tempUrl = URL.createObjectURL(file);
        setStagedPhotos((prev) => [...prev, { url: tempUrl, loading: true }]);

        const formData = new FormData();
        formData.append("images", file);

        try {
          const res = await axios.patch(`${BASE_URL}/edit`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          });

          const updatedUser = res.data.data;
          setProfileData((prev) => ({
            ...prev,
            photoUrl: Array.isArray(updatedUser.photoUrl) ? updatedUser.photoUrl : [],
          }));
          dispatch(addUser(updatedUser));
          setStagedPhotos((prev) => prev.filter((p) => p.url !== tempUrl));
        } catch (err) {
          console.error("Upload failed:", err.response?.data || err.message);
          setStagedPhotos((prev) => prev.filter((p) => p.url !== tempUrl));
          alert("Upload failed. Check console.");
        }
      }
    };

    // Remove photo
    const removePhoto = async (url, staged = false) => {
      if (staged) {
        setStagedPhotos(stagedPhotos.filter((p) => p.url !== url));
        return;
      }

      try {
        const res = await axios.delete(`${BASE_URL}/photo`, {
          data: { url },
          withCredentials: true,
        });
        const updatedUser = res.data.data;
        setProfileData((prev) => ({
          ...prev,
          photoUrl: Array.isArray(updatedUser.photoUrl) ? updatedUser.photoUrl : [],
        }));
        dispatch(addUser(updatedUser));
      } catch (err) {
        console.error("Delete failed:", err.response?.data || err.message);
        alert("Delete failed. Check console.");
      }
    };

    // Save profile
    // Save profile
// Inside saveProfile
const saveProfile = async (e) => {
  e.preventDefault();
  setError("");
  try {
    const res = await axios.patch(`${BASE_URL}/edit`, profileData, {
      withCredentials: true,
    });

    let updatedUser = res.data.data;

    // ✅ Normalize photoUrl to always be an array
    updatedUser = {
      ...updatedUser,
      photoUrl: Array.isArray(updatedUser.photoUrl)
        ? updatedUser.photoUrl
        : typeof updatedUser.photoUrl === "string"
        ? updatedUser.photoUrl.split(",").filter(Boolean)
        : [],
    };

    setProfileData(updatedUser);
    dispatch(addUser(updatedUser)); // now safe for Navbar
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  } catch (err) {
    setError(err.message);
  }
};


    return (
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 md:p-10 gap-6 lg:gap-8">
        {/* Left: Form */}
        <div className="flex-1 w-full lg:w-2/3">
          <section className="bg-white dark:bg-gray-800 p-6 sm:p-8 md:p-10 rounded-lg shadow-md">
            <form onSubmit={saveProfile} className="space-y-4">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                Edit Profile
              </h2>

              {/* Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">First Name</label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 dark:text-gray-300 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Photos */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {/* Saved photos */}
                {Array.isArray(profileData.photoUrl) &&
                  profileData.photoUrl.map((url, idx) => (
                    <div key={idx} className="relative w-full h-32">
                      <img
                        src={url}
                        alt={`photo-${idx}`}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => (e.target.src = "/placeholder.jpg")}
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(url)}
                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                {/* Staged photos */}
                {stagedPhotos.map((p, idx) => (
                  <div key={`staged-${idx}`} className="relative w-full h-32">
                    {p.loading ? (
                      <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
                        <div className="loader"></div>
                      </div>
                    ) : (
                      <img src={p.url} alt={`staged-${idx}`} className="w-full h-full object-cover rounded-lg" />
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

                {/* Add new photo */}
                {profileData.photoUrl.length + stagedPhotos.length < 6 && (
                  <label className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600">
                    <span className="text-gray-500 dark:text-gray-300">+ Add</span>
                    <input type="file" accept="image/*" className="hidden" multiple onChange={handlePhotoUpload} />
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
                value={profileData.age}
                onChange={(e) =>
                  setProfileData({ ...profileData, age: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-gray-600 dark:text-gray-300 mb-2">
                Gender
              </label>
              <select
                value={profileData.gender}
                onChange={(e) =>
                  setProfileData({ ...profileData, gender: e.target.value })
                }
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
                placeholder="cm or feet"
                value={profileData.height}
                onChange={(e) =>
                  setProfileData({ ...profileData, height: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
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
                value={profileData.location}
                onChange={(e) =>
                  setProfileData({ ...profileData, location: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Age Preference */}
            <div className="sm:col-span-2">
              <label className="block text-gray-600 dark:text-gray-300 mb-2">
                Age Preference:{" "}
                <span className="font-semibold">
                  {profileData.preferredAgemin} - {profileData.preferredAgemax}{" "}
                  years
                </span>
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="range"
                  min="18"
                  max="60"
                  value={profileData.preferredAgemin}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      preferredAgemin: Number(e.target.value),
                    })
                  }
                  className="w-32"
                />
                <input
                  type="range"
                  min="18"
                  max="60"
                  value={profileData.preferredAgemax}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      preferredAgemax: Number(e.target.value),
                    })
                  }
                  className="w-32"
                />
              </div>
            </div>

            {/* Distance Preference */}
            <div className="sm:col-span-2">
              <label className="block text-gray-600 dark:text-gray-300 mb-2">
                Distance Preference:{" "}
                <span className="font-semibold">{profileData.distancePreference} km</span>
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={profileData.distancePreference}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    distancePreference: Number(e.target.value),
                  })
                }
                className="w-full"
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
                        checked={profileData.education === edu}
                        onChange={(e) =>
                          setProfileData({ ...profileData, education: e.target.value })
                        }
                      />
                      <span className="text-gray-700 dark:text-gray-300">{edu}</span>
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
                      checked={profileData.occupation === occ}
                      onChange={(e) =>
                        setProfileData({ ...profileData, occupation: e.target.value })
                      }
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
                      checked={profileData.belief === bel}
                      onChange={(e) =>
                        setProfileData({ ...profileData, belief: e.target.value })
                      }
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
                        checked={profileData.lookingFor === lof}
                        onChange={(e) =>
                          setProfileData({ ...profileData, lookingFor: e.target.value })
                        }
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
                {["Never","Occasionally (socially)","Frequently","Trying to quit"].map(
                  (dri) => (
                    <label key={dri} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value={dri}
                        checked={profileData.drinking === dri}
                        onChange={(e) =>
                          setProfileData({ ...profileData, drinking: e.target.value })
                        }
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
                {["Non-smoker","Occasional smoker (social / light)","Regular smoker","Trying to quit"].map(
                  (smo) => (
                    <label key={smo} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value={smo}
                        checked={profileData.smoking === smo}
                        onChange={(e) =>
                          setProfileData({ ...profileData, smoking: e.target.value })
                        }
                      />
                      <span className="text-gray-700 dark:text-gray-300">{smo}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Diet */}
            <div className="sm:col-span-2">
              <label className="block text-gray-600 dark:text-gray-300 mb-2">Diet</label>
              <div className="flex flex-wrap gap-3">
                {["Vegetarian","Vegan","Non-vegetarian","Eggetarian (vegetarian + eggs)","Pescatarian (fish only + vegetarian)","Other / Flexible"].map(
                  (dt) => (
                    <label key={dt} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value={dt}
                        checked={profileData.diet === dt}
                        onChange={(e) =>
                          setProfileData({ ...profileData, diet: e.target.value })
                        }
                      />
                      <span className="text-gray-700 dark:text-gray-300">{dt}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Sports */}
            <div className="sm:col-span-2">
              <label className="block text-gray-600 dark:text-gray-300 mb-2">Sports</label>
              <div className="flex flex-wrap gap-3">
                {["Football","Basketball","Tennis","Cricket","Running","Yoga","Gym","Cycling","Hiking","Golf","Other"].map(
                  (spo) => (
                    <label key={spo} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={spo}
                        checked={profileData.sports.includes(spo)}
                        onChange={() =>
                          toggleSelection(spo, profileData.sports, (val) =>
                            setProfileData({ ...profileData, sports: val })
                          )
                        }
                      />
                      <span className="text-gray-700 dark:text-gray-300">{spo}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Travel Preferences */}
            <div className="sm:col-span-2">
              <label className="block text-gray-600 dark:text-gray-300 mb-2">Travel Preferences</label>
              <div className="flex flex-wrap gap-3">
                {["Beach","Mountains","Culture","Adventure","Road Trips","Luxury","City Tours","Backpacking","Foodie Trips","Other"].map(
                  (tp) => (
                    <label key={tp} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={tp}
                        checked={profileData.travelPreferences.includes(tp)}
                        onChange={() =>
                          toggleSelection(tp, profileData.travelPreferences, (val) =>
                            setProfileData({ ...profileData, travelPreferences: val })
                          )
                        }
                      />
                      <span className="text-gray-700 dark:text-gray-300">{tp}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Languages */}
            <div className="sm:col-span-2">
              <label className="block text-gray-600 dark:text-gray-300 mb-2">Languages</label>
              <div className="flex flex-wrap gap-3">
                {["English","Hindi","Telugu","Tamil","Kannada"].map(
                  (lg) => (
                    <label key={lg} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={lg}
                        checked={profileData.languages.includes(lg)}
                        onChange={() =>
                          toggleSelection(lg, profileData.languages, (val) =>
                            setProfileData({ ...profileData, languages: val })
                          )
                        }
                      />
                      <span className="text-gray-700 dark:text-gray-300">{lg}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Pets */}
            <div className="sm:col-span-2">
              <label className="block text-gray-600 dark:text-gray-300 mb-2">Pets</label>
              <div className="flex flex-wrap gap-3">
                {["Dogs","Cats","Birds","Small Mammals","Reptiles","No Pets","Open to Pets","Other"].map(
                  (pt) => (
                    <label key={pt} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value={pt}
                        checked={profileData.pets === pt}
                        onChange={(e) =>
                          setProfileData({ ...profileData, pets: e.target.value })
                        }
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
        {/* Right: Live Preview */}
  <div className="w-full lg:w-1/3">
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-md">
      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-gray-800 dark:text-white text-center">
        Live Preview
      </h3>
      <Usercard
        user={{
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          age: profileData.age,
          gender: profileData.gender,
          location: profileData.location,
          height: profileData.height,
          photoUrl: profileData.photoUrl,
          education: profileData.education,
          occupation: profileData.occupation,
          belief: profileData.belief,
          lookingFor: profileData.lookingFor,
          drinking: profileData.drinking,
          smoking: profileData.smoking,
          diet: profileData.diet,
          languages: profileData.languages,
          sports: profileData.sports,
          travelPreferences: profileData.travelPreferences,
          pets: profileData.pets,
        }}
      />
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
      </div>
    );
  };

  export default Editprofile;
