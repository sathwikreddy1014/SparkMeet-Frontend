import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeoneFeed } from "../utils/feedSlice";

const Usercard = ({user}) => {

  const dispatch = useDispatch() 

  const { _id, firstName, lastName, age, gender, photoUrl, about, skills } = user

  const reviewMatch = async (status , userId) => {
    try {
      await axios.post(BASE_URL + "/request/send/"+ status + "/" + userId, {}, {withCredentials:true})
      dispatch(removeoneFeed(_id))
    } catch (error) {
      console.error("error", error.message)
    }
  }

  return (
<div className=" shadow-lg rounded-2xl overflow-hidden max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto transition-transform hover:scale-105 duration-300">
  {/* Image Section */}
  <figure className="h-56 sm:h-64 md:h-72 w-full flex items-center justify-center">
    <img
      src={photoUrl ? photoUrl : "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="}
      alt="userPhoto"
      className="object-contain max-h-full max-w-full rounded-t-2xl"
    />
  </figure>

  {/* Body Section */}
  <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-4 md:gap-5">
    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-center">
      {firstName + " " + lastName}
    </h2>

    {/* Info */}
    <div className="flex flex-col gap-1 sm:gap-2 text-sm sm:text-base md:text-lg text-center">
      {about && <p className="text-gray-700">{about}</p>}
      {age && <p className="text-gray-500">{age} years old</p>}
      {gender && <p className="text-gray-500 capitalize">{gender}</p>}
      {skills && <p className="text-gray-600">{skills}</p>}
    </div>

    {/* Actions */}
    <div className="flex justify-center gap-4 mt-4 sm:mt-6">
      <button
        className="btn btn-outline btn-error rounded-lg px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base flex-1"
        onClick={() => reviewMatch("pass", _id)}
      >
        Pass
      </button>
      <button
        className="btn btn-primary rounded-lg px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base flex-1"
        onClick={() => reviewMatch("like", _id)}
      >
        Like
      </button>
    </div>
  </div>
</div>

  );
};

export default Usercard;
