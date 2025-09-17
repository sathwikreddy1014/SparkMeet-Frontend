import React, { useState } from "react";
import Usercard from "./Usercard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Editprofile = ({ user }) => {

  const [firstName, setfirstname] = useState(user.data?.firstName || "");
  const [lastName, setlastName] = useState(user.data?.lastName || "");
  const [photoUrl, setphotoUrl] = useState(user.data?.photoUrl || "");
  const [age, setage] = useState(user.data?.age || "");
  const [skills, setskills] = useState(user.data?.skills || "");
  const [gender, setgender] = useState(user.data?.gender || "");
  const [about, setabout] = useState(user.data?.about || "");
  const [toast, settoast] = useState(false);
  const [error, seterror] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    e.preventDefault(); // ✅ prevent form refresh
    seterror("");

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          skills,
          photoUrl,
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

          {/* Form Fields */}
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
                value={photoUrl || "https://via.placeholder.com/150"}
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
                <option value="">{gender ? gender : "Select Gender"}</option>
                {["Male", "Female", "Other"]
                  .filter((g) => g !== gender)
                  .map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
              </select>
            </div>

            {/* Skills */}
            <div className="sm:col-span-2">
              <label className="block text-gray-600 dark:text-gray-300 mb-2">Skills</label>
              <input
                type="text"
                value={skills}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
                onChange={(e) => setskills(e.target.value.split(",").map(s => s.trim()))}
              />
            </div>

            {/* About */}
            <div className="sm:col-span-2">
              <label className="block text-gray-600 dark:text-gray-300 mb-2">About</label>
              <input
                type="text"
                value={about}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
                onChange={(e) => setabout(e.target.value)}
              />
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
          {error && (
            <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
          )}
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
            about,
            skills,
            photoUrl,
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
