import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/RequestSlice";
import RequestCard from "./RequestCard";
import { ArrowLeft, Clock } from "lucide-react"; // import Clock
import { formatDistanceToNow } from "date-fns"; // import date-fns function

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector(store => store.requests) || [];
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/requests/received`, { withCredentials: true });
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

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <button
          onClick={() => navigate("/")}
          className="p-2 hover:bg-gray-100 rounded-full absolute top-5 left-5"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No requests yet</h2>
        <p className="text-gray-600">When someone likes your profile, they'll appear here</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600">
      <button
        onClick={() => navigate("/")}
        className="p-2 hover:bg-gray-100 rounded-full mb-4"
      >
        <ArrowLeft className="w-5 h-5 text-gray-600" />
      </button>

{requests.map(request => {
  const { createdAt } = request;
  const relativeTime = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <div key={request._id} className="mb-4 relative">
      {/* Timestamp at top-right */}
      <div className="absolute top-2 right-2 flex items-center text-black text-xs sm:text-sm">
        <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
        <span>{relativeTime}</span>
      </div>

      {/* Request card */}
      <RequestCard request={request} reviewRequest={reviewRequest} />
    </div>
  );
})}

    </div>
  );
};

export default Requests;
