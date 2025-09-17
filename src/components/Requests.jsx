import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/RequestSlice'
import { Heart, X, MapPin, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const Requests = () => {
  const dispatch = useDispatch()
  const requests = useSelector((store) => store.requests)

    const reviewRequest = async (status , _id) => {
      console.log(_id);
      
    try {
      await axios.post(BASE_URL + "/request/review/"+ status + "/"+ _id , {}, {withCredentials: true })
      dispatch(removeRequest(_id))
    } catch (error) {
      console.error("Error  requests:", error)
    }
    
  } 

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      })

      // ✅ Only dispatch the "data" array, not the whole response
      dispatch(addRequests(res.data.data))
    } catch (err) {
      console.error("Error fetching requests:", err)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  if (!requests) return null

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
         <Heart className="w-16 h-16 text-pink-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No requests yet</h2>
        <p className="text-gray-600">When someone likes your profile, they'll appear here</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 ">
  {requests.map((request, _id) => {
    const { firstName, lastName, photoUrl, age, gender, about } = request.fromuserId;
    const {createdAt} = request
    // format the relative time
    const relativeTime = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

    return (
      <motion.div
        key={_id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: _id * 0.1 }}
        className="rounded-2xl lg:rounded-3xl shadow-lg overflow-hidden border border-black"
      >
        <div className="flex">
          <div className="w-24 h-32 sm:w-32 sm:h-40 lg:w-40 lg:h-48">
            <img
              src={photoUrl}
              alt={firstName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-3 sm:p-4 lg:p-6">
            <div className="flex items-start justify-between mb-2 sm:mb-3">
              <div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                  {firstName + " " + lastName}, {age}
                </h3>
                <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span>{gender}</span>
                </div>
              </div>
              <div className="flex items-center text-gray-400 text-xs sm:text-sm">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                <span>{relativeTime}</span>
              </div>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm lg:text-base mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
              {about}
            </p>
          </div>
        </div>

        <div className="flex border-t border-gray-100">
          <button
            onClick={() => reviewRequest("rejected", request._id)}
            className="flex-1 py-3 sm:py-4 px-4 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center justify-center space-x-2"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold text-sm sm:text-base">Pass</span>
          </button>
          <div className="w-px bg-gray-100"></div>
          <button
            onClick={() => reviewRequest("accepted", request._id)}
            className="flex-1 py-3 sm:py-4 px-4 text-pink-600 hover:bg-pink-50 transition-colors flex items-center justify-center space-x-2"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold text-sm sm:text-base">Like</span>
          </button>
        </div>
      </motion.div>
    );
  })}
</div>
  )
}

export default Requests
