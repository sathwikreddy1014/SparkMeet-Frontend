import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../../utils/feedSlice'
import Usercard from './Usercard'

const Feed = () => {
  const dispatch = useDispatch()
  const feed = useSelector((store) => store.feed) // check your slice structure

  const getFeed = async () => {
    if (feed && feed.length > 0) return // ✅ prevents duplicate fetch
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true
      })
      dispatch(addFeed(res.data))
    } catch (error) {
      console.error("Failed to fetch feed:", error)
    }
  }

  useEffect(() => {
    getFeed()
  }, [])

  return (
    <div className="flex justify-center my-10">
      {feed && feed.length > 0 ? (
        <Usercard user={feed?.data[0]} />  // ✅ pass actual user
      ) : (
        <p className="text-gray-500">No feed available</p>
      )}
    </div>
  )
}

export default Feed
