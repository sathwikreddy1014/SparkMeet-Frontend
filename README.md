import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../../utils/constants'
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../../utils/RequestSlice'

const Requests = () => {
  const dispatch = useDispatch()
  const requests = useSelector((store) => store.requests)

    const reviewRequest = async (status , _id) => {
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
    <div className="h-full overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
      {requests.map((request , _id) => (
        const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromuserId;
        <motion.div
          key={_id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: _id * 0.1 }}
          className="bg-white rounded-2xl lg:rounded-3xl shadow-lg overflow-hidden"
        >
          <div className="flex">
            <div className="w-24 h-32 sm:w-32 sm:h-40 lg:w-40 lg:h-48">
              <img
                src={requests.photoUrl}
                alt={request.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 p-3 sm:p-4 lg:p-6">
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                    {request.name}, {request.age}
                  </h3>
                  <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                    
                    <span>{request.location}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-400 text-xs sm:text-sm">
                 
                  <span>{request.timestamp}</span>
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm lg:text-base mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                {request.bio}
              </p>
            </div>
          </div>
          
          <div className="flex border-t border-gray-100">
            <button
              onClick={() => reviewRequest(request.id, 'pass')}
              className="flex-1 py-3 sm:py-4 px-4 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center justify-center space-x-2"
            >
              
              <span className="font-semibold text-sm sm:text-base">Pass</span>
            </button>
            <div className="w-px bg-gray-100"></div>
            <button
              onClick={() => reviewRequest(request.id, 'like')}
              className="flex-1 py-3 sm:py-4 px-4 text-pink-600 hover:bg-pink-50 transition-colors flex items-center justify-center space-x-2"
            >
              
              <span className="font-semibold text-sm sm:text-base">Like</span>
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Requests
