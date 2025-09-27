import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import Usercard from "./Usercard";


const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed); // feed list
  const currentUser = useSelector((store) => store.user); // logged-in user

  // Fetch feed from backend (only once)
  useEffect(() => {
    const getFeed = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/feed`, {
          withCredentials: true,
        });
        dispatch(addFeed(res.data?.data));
      } catch (err) {
        console.error("Failed to fetch feed:", err?.response?.data?.message)
      }
    };

    if (!feed || feed.length === 0) {
      getFeed();
    }
  }, []);

  if (!feed) return null;

  if (!currentUser || !feed || feed.length === 0) {
  return (<div className="text-center font-bold text-3xl p-16">
    Reached the profiles limit
  </div>); // or a placeholder
}

const firstFeedUser = feed[0];
const userToShow =
  firstFeedUser._id === currentUser._id ? currentUser : firstFeedUser;



  return (
    <div className="h-screen w-screen">
      <Usercard user={userToShow} />
    </div>
  );
};

export default Feed;
