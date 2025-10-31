import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/ConnectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;
  if (connections.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white">
        <h1 className="text-2xl font-semibold">No Connections Found</h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="container mx-auto px-4 pt-24 pb-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">Your Connections</h1>
            <p className="text-gray-400">People you’ve matched with</p>
          </div>

          {/* Grid Layout for responsiveness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {connections.map((connection, index) => {
              const { _id, firstName, lastName, photoUrl, age, gender, about } =
                connection;

              return (
                <div
                  key={_id}
                  className="bg-base-300 rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Profile Image */}
                  <div className="relative">
                    <img
                      src={photoUrl}
                      alt={firstName}
                      className="w-full h-48 object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="p-4 text-left">
                    <h2 className="text-xl font-bold truncate">
                      {firstName + " " + lastName}
                    </h2>
                    {age && gender && (
                      <p className="text-gray-400 text-sm">
                        {age}, {gender}
                      </p>
                    )}
                    <p className="text-gray-300 text-sm mt-2 line-clamp-2">
                      {about || "No bio available."}
                    </p>

                    <div className="mt-4">
                      <Link to={`/chat/${_id}`}>
                        <button className="w-full btn btn-primary hover:opacity-90 transition-all duration-200">
                          Chat
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;
