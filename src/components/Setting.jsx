import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {logoutUser} from "./Logout"


export default function Settings() {

  const user = useSelector((store => (store.user) || []))
  // Profile / account
  const [name] = useState(user?.firstName);
  const [age] = useState(user?.age);
  const [location] = useState(user.location || "India");
  const [email] = useState(user.emailId);
  const [phone] = useState(" +91 8000000000");
  const [connected] = useState("Instagram, Spotify");

  // Discovery
  const [showMe] = useState(user.gender); // could be a select in the future
  const [globalMode, setGlobalMode] = useState(false);

  // Notifications
  const [notifMatches, setNotifMatches] = useState(true);
  const [notifMessages, setNotifMessages] = useState(true);
  const [notifLikes, setNotifLikes] = useState(true);
  const [notifSuperLikes, setNotifSuperLikes] = useState(true);
  const [notifEmail, setNotifEmail] = useState(false);

  // Privacy
  const [showOnline, setShowOnline] = useState(true);
  const [showDistance, setShowDistance] = useState(true);
  const [showAge, setShowAge] = useState(true);
  const [incognito, setIncognito] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleProfile =  () => {
    navigate('/edit')
  }
  const handleLogout = () => {
     logoutUser(dispatch, navigate);
  }

  return (
<div className="min-h-screen w-full bg-gradient-to-b from-white to-amber-50 py-6 px-4 sm:px-6 lg:px-8 ">
  <div className="max-w-4xl mx-auto space-y-6 w-full">


        {/* Header */}
        <header className="flex items-center gap-3">
          <button
            aria-label="Back"
            className="p-2 rounded-full hover:bg-gray-100"
            title="Back"
          >
            <svg className="h-6 w-6 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-semibold text-rose-700">Settings</h1>
        </header>

        {/* Profile Card */}
        <section className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4">
          <div className="relative">
            <img
         src={
          user?.photoUrl?.length
            ? user?.photoUrl[0]
            : `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=random`
        }
        alt={`${user?.firstName} ${user?.lastName}`}
              className="h-20 w-20 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <button
              aria-label="Edit profile photo"
              className="absolute -bottom-1 -right-1 bg-rose-500 hover:bg-rose-600 text-white p-2 rounded-full shadow-md"
              title="Edit photo"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v4a2 2 0 002 2h4" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6" />
              </svg>
            </button>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-rose-700">{name}, {age}</h2>
              <span className="ml-auto px-2 py-1 text-xs rounded-full bg-gradient-to-r from-rose-300 to-rose-500 text-white">Premium</span>
            </div>
            <p className="text-sm text-gray-500">{location}</p>
            <button className="mt-3 text-rose-500 text-sm flex items-center gap-2" onClick={handleProfile}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20h9" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4v4" />
              </svg>
              Edit Profile
            </button>
          </div>
        </section>

        {/* Discovery Card */}
        <section className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 bg-rose-100 p-3 rounded-full">
              {/* compass icon */}
              <svg className="w-6 h-6 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                <circle cx="12" cy="12" r="3" strokeWidth="2"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-rose-700">Discovery</h3>
              <p className="text-sm text-gray-500">Control who you see and who sees you</p>
            </div>
          </div>

          {/* Show Me */}
          <div className="pt-2 text-black">
            <div className="flex items-center justify-between pb-3">
              <div>
                <p className="font-medium">Show Me</p>
                <p className="text-sm text-gray-400 mt-1">{showMe}</p>
              </div>
              <button className="text-gray-400">›</button>
            </div>
            <hr className="border-t border-gray-100" />
          </div>

          {/* Age Range - dual sliders */}
          <div className="pt-3 text-black">
            <div className="flex items-center justify-between">
              <p className="font-medium">Age  </p>
              </div>
          </div>

          {/* Distance */}
          <div>
            <div className="flex items-center justify-between text-black">
              <p className="font-medium">Maximum Distance</p>
              <p className="text-sm text-rose-600"> km</p>
            </div>

            <hr className="my-4 border-t border-gray-100" />
          </div>

          {/* Global Mode */}
          <div className="flex items-center justify-between text-black">
            <div>
              <p className="font-medium">Global Mode</p>
              <p className="text-sm text-gray-400">Match with people around the world</p>
            </div>
            <Toggle checked={globalMode} onChange={() => setGlobalMode(!globalMode)} />
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-red-300 rounded-2xl shadow-sm p-5 space-y-4 text-black">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 bg-rose-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h11z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-rose-700">Notifications</h3>
              <p className="text-sm text-gray-500">Manage how you receive alerts</p>
            </div>
          </div>

          <ToggleRow label="New Matches" hint="When someone likes you back" checked={notifMatches} onChange={() => setNotifMatches(!notifMatches)} />
          <ToggleRow label="Messages" hint="When you receive a new message" checked={notifMessages} onChange={() => setNotifMessages(!notifMessages)} />
          <ToggleRow label="Likes" hint="When someone likes your profile" checked={notifLikes} onChange={() => setNotifLikes(!notifLikes)} />
          <ToggleRow label="Super Likes" hint="When you receive a super like" checked={notifSuperLikes} onChange={() => setNotifSuperLikes(!notifSuperLikes)} />
          <ToggleRow label="Email Updates" hint="Receive notifications via email" checked={notifEmail} onChange={() => setNotifEmail(!notifEmail)} />
        </section>

        {/* Privacy & Safety */}
        <section className="bg-red-300 rounded-2xl shadow-sm p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 bg-rose-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-2 .667-4 2-5l1 1 2-2" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-rose-700">Privacy & Safety</h3>
              <p className="text-sm text-gray-500">Control your visibility and data</p>
            </div>
          </div>

          <ToggleRow label="Show Online Status" hint="Let others see when you're active" checked={showOnline} onChange={() => setShowOnline(!showOnline)} />
          <ToggleRow label="Show Distance" hint="Display distance on your profile" checked={showDistance} onChange={() => setShowDistance(!showDistance)} />
          <ToggleRow label="Show Age" hint="Display your age on your profile" checked={showAge} onChange={() => setShowAge(!showAge)} />

          {/* Incognito emphasized */}
          <div className="mt-3 bg-red-300 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">Incognito Mode</p>
              <p className="text-sm text-rose-400">Browse profiles invisibly</p>
            </div>
            <Toggle checked={incognito} onChange={() => setIncognito(!incognito)} />
          </div>

          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Blocked Users</p>
                <p className="text-sm text-gray-400">3 users</p>
              </div>
              <button className="text-gray-400">›</button>
            </div>
          </div>
        </section>

        {/* Account */}
        <section className="bg-red-300 rounded-2xl shadow-sm p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 bg-rose-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11h14v10H5z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-rose-700">Account</h3>
              <p className="text-sm text-gray-500">Manage your account settings</p>
            </div>
          </div>

          <ListRow label="Email Address" value={email} />
          <ListRow label="Phone Number" value={phone} />
          <ListRow label="Change Password" />
          <ListRow label="Connected Accounts" value={connected} />
        </section>

        {/* Logout & Delete */}
        <div className="space-y-3">
          <button className="w-full rounded-xl border border-rose-100 py-3 flex items-center justify-center gap-2 text-rose-700 font-medium hover:bg-rose-50" onClick={handleLogout}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8v8" />
            </svg>
            Log Out
          </button>

          <button className="w-full rounded-xl border border-rose-200 py-3 flex items-center justify-center gap-2 text-rose-600 font-semibold bg-white hover:bg-rose-50">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7L5 7" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11v6" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 11v6" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7V5h6v2" />
            </svg>
            Delete Account
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 py-6">Version 2.4.1 • Made with ♥ by Spark</p>
      </div>
    </div>
  );
}

/* ------------------ Small reusable components ------------------ */

function Toggle({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`w-12 h-7 rounded-full p-1 transition-colors ${checked ? "bg-rose-500" : "bg-gray-200"}`}
    >
      <span
        className={`block bg-white w-5 h-5 rounded-full transform transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  );
}

function ToggleRow({ label, hint, checked, onChange }) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-none">
      <div>
        <p className="font-medium">{label}</p>
        {hint && <p className="text-sm text-gray-400 mt-1">{hint}</p>}
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

function ListRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-none">
      <div>
        <p className="font-medium">{label}</p>
      </div>
      <div className="text-sm text-gray-500">{value || <span className="text-gray-300">›</span>}</div>
    </div>
  );
}
