import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!oldPassword) return "Please enter your current password.";
    if (!newPassword) return "Please enter a new password.";
    if (newPassword.length < 8) return "New password must be at least 8 characters.";
    if (newPassword === oldPassword)
      return "New password must be different from old password.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.patch(
        `${BASE_URL}/password-edit`,
        {
          password: oldPassword,
          newPassword: newPassword,
        },
        { withCredentials: true }
      );

      setSuccess(res.data.message || "Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Something went wrong while changing password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="max-w-md w-full mx-auto rounded-2xl shadow-lg p-6 
      bg-gradient-to-b from-[#ffb4b4] to-[#f8a8a8] backdrop-blur-sm"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* OLD PASSWORD */}
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Old Password</span>
          <div className="relative mt-1">
            <input
              type={showOld ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="block w-full rounded-lg border border-[#f2aaaa] 
              px-3 py-2 bg-white/80 focus:ring-2 focus:ring-pink-300 
              focus:border-pink-400 outline-none text-gray-800"
              placeholder="Enter current password"
            />
            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute inset-y-0 right-3 text-sm text-pink-700 font-medium"
            >
              {showOld ? "Hide" : "Show"}
            </button>
          </div>
        </label>

        {/* NEW PASSWORD */}
        <label className="block">
          <span className="text-sm font-medium text-gray-700">New Password</span>
          <div className="relative mt-1">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="block w-full rounded-lg border border-[#f2aaaa] 
              px-3 py-2 bg-white/80 focus:ring-2 focus:ring-pink-300 
              focus:border-pink-400 outline-none text-gray-800"
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute inset-y-0 right-3 text-sm text-pink-700 font-medium"
            >
              {showNew ? "Hide" : "Show"}
            </button>
          </div>
        </label>

        {/* ERROR */}
        {error && (
          <p className="text-red-700 text-sm font-medium bg-red-100/70 p-2 rounded-lg">
            {error}
          </p>
        )}

        {/* SUCCESS */}
        {success && (
          <p className="text-green-700 text-sm font-medium bg-green-100/70 p-2 rounded-lg">
            {success}
          </p>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg bg-pink-600 text-white font-medium 
          hover:bg-pink-700 transition disabled:opacity-60"
        >
          {loading ? "Saving..." : "Submit"}
        </button>
      </form>

      {/* HOME BUTTON — moved OUTSIDE the form */}
      <Link
        to="/"
        className="block mt-4 w-full text-center py-2 rounded-lg bg-pink-600 
        text-white font-medium hover:bg-pink-700 transition"
      >
        Home
      </Link>
    </div>
  );
}
