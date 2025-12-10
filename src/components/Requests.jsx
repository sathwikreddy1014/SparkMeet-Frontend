import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/RequestSlice";
import { Briefcase, MapPin } from "lucide-react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests) || [];
  const navigate = useNavigate();

  // Toast State
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  // Show Toast
  const showToast = (type, msg) => {
    setToast({ show: true, type, message: msg });

    setTimeout(() => {
      setToast({ show: false, type: "", message: "" });
    }, 3000);
  };

  // Fetch Requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data?.data || []));
    } catch (err) {
      console.error(err);
    }
  };

  // Accept / Reject Handler
const reviewRequest = async (status, requestId, firstName) => {
  try {
    await axios.post(
      `${BASE_URL}/review/${status}/${requestId}`,
      {},
      { withCredentials: true }
    );

    dispatch(removeRequest(requestId));

    if (status === "accepted") {
      showToast("success", `Request accepted! You are now connected with ${firstName}.`);
    } else {
      showToast("error", `Request declined. You declined ${firstName}.`);
    }
  } catch (err) {
    console.error(err);
  }
};

const handlePreview = () => {
  
}


  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen w-full bg-white px-4 sm:px-8 lg:px-16 xl:px-24 py-10">

      {/* Toast Popup */}
      {toast.show && (
        <div
          className={`
            fixed right-5 top-5 z-50 px-5 py-3 rounded-xl shadow-lg text-white
            transition-all duration-500 transform
            ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}
            animate-slide-in
          `}
        >
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Match Requests</h1>
        <p className="text-gray-500">People who liked your profile</p>
      </div>

      {/* No Requests */}
      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <p className="text-gray-500">No requests yet</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-pink-500 hover:underline font-medium"
          >
            Go back
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 w-full">
          {requests.map((req) => {
  const { _id, fromuserId } = req;
  const {
    firstName,
    lastName,
    age,
    photoUrl,
    occupation,
    location,
    about,
  } = fromuserId || {}; // fallback in case fromuserId is undefined

  return (
    <div key={_id} className="..." onClick={handlePreview}>
      <img
        src={
          photoUrl?.length
            ? photoUrl[0]
            : `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`
        }
        alt={`${firstName} ${lastName}`}
        className="w-full h-64 object-cover"
      />
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-900">
          {firstName} {lastName}, {age}
        </h2>
        <div className="flex items-center text-gray-500 text-sm mt-1">
          <Briefcase size={14} className="mr-2" />
          {occupation || "Not specified"}
        </div>
        <div className="flex items-center text-gray-500 text-sm mt-1">
          <MapPin size={14} className="mr-2" />
          {location || "Unknown"}
        </div>
        {about && (
          <p className="text-gray-500 text-sm mt-3 line-clamp-2">{about}</p>
        )}
        <div className="flex items-center justify-between mt-5">
          <button
            onClick={() => reviewRequest("rejected", _id, firstName)}
            className="w-1/2 mr-2 border border-red-400 hover:bg-red-50 text-red-500 py-2 rounded-lg text-sm font-medium transition"
          >
            ✕ Decline
          </button>
          <button
            onClick={() => reviewRequest("accepted", _id, firstName)}
            className="w-1/2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-medium transition"
          >
            ❤️ Accept
          </button>
        </div>
      </div>
    </div>
  );
})}

        </div>
      )}
    </div>
  );
};

export default Requests;
