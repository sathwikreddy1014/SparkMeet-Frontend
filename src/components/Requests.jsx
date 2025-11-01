import React, { useEffect } from "react";
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

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(`${BASE_URL}/review/${status}/${requestId}`, {}, { withCredentials: true });
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 sm:px-10 lg:px-20 py-12">
      {/* Header Section */}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {requests.map((req) => {
            const { _id, firstName, lastName, age, photoUrl, occupation, location, about } = req;

            return (
              <div
                key={_id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* Photo */}
                <img
                  src={
                    photoUrl?.length
                      ? photoUrl[0]
                      : `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`
                  }
                  alt={`${firstName} ${lastName}`}
                  className="w-full h-72 object-cover"
                />

                {/* Content */}
                <div className="p-5">
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
                    <p className="text-gray-500 text-sm mt-3 line-clamp-2">
                      {about}
                    </p>
                  )}

                  {/* Buttons */}
                  <div className="flex items-center justify-between mt-5">
                    <button
                      onClick={() => reviewRequest("rejected", _id)}
                      className="w-1/2 mr-2 border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium transition"
                    >
                      ✕
                    </button>

                    <button
                      onClick={() => reviewRequest("accepted", _id)}
                      className="w-1/2 bg-gradient-to-r from-pink-500 to-orange-400 hover:opacity-90 text-white py-2 rounded-lg text-sm font-medium transition"
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
