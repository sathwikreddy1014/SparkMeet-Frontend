import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../../utils/constants'
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
    return <h1 className='text-center m-5 text-2xl'>No Requests Found</h1>
  }

  return (
    <div className="flex flex-col items-center gap-6 min-h-screen bg-base-200 py-10">
  {requests.map((request) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about } =
      request.fromuserId

    return (
      <div
        key={_id}
        className="card card-side bg-base-100 shadow-xl w-[650px] p-4"
      >
        {/* Profile Photo */}
        <figure className="flex-shrink-0 p-4">
          <img
            src={photoUrl || "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="}
            alt={`${firstName} ${lastName}`}
            className="rounded-xl w-40 h-40 object-contain"
          />
        </figure>

        {/* User Info + Actions */}
        <div className="card-body flex flex-col justify-between">
          <div>
            <h2 className="card-title">
              {firstName} {lastName}
            </h2>
            <p className="text-sm text-gray-600">
              {age} years old • {gender}
            </p>
            <p className="mt-2">{about}</p>
          </div>

          {/* Buttons */}
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-error"
            onClick={() => reviewRequest("rejected", request._id)}
            >Reject</button>
            <button
              className="btn btn-success"
              onClick={() => reviewRequest("accepted", request._id)}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    )
  })}
</div>

  )
}

export default Requests
