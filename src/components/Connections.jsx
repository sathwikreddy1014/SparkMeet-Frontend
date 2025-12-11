import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/ConnectionSlice";
import { Link, useNavigate } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

const handlechat = (id) => {
  navigate(`/chat/${id}`);
};


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

  // 🔍 Filter logic
  const filteredConnections = connections.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  if (connections.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white">
        <h1 className="text-2xl font-semibold tracking-wide">
          No Connections Found
        </h1>
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-[#FDF4EE] flex justify-center px-4 md:px-8 lg:px-16">
      <div className="w-full max-w-7xl">
        
        {/* Page Header */}
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
          Connections
        </h1>

        {/* Search Box */}
        <input
          className="w-full p-3 rounded-xl border border-gray-300 bg-white mb-4"
          placeholder="Search connections..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Results */}
        <div className="space-y-6">

          {filteredConnections.length === 0 && (
            <p className="text-gray-600 text-center mt-10 text-xl">
              No results found.
            </p>
          )}

          {filteredConnections.map((user) => (
            <div
              key={user._id}
              className="bg-white p-5 rounded-2xl shadow-sm w-full
                flex flex-col sm:flex-row sm:items-center gap-6"
            >
              {/* Photo */}
              <img
                src={user.photoUrl}
                className="w-20 h-20 rounded-full object-cover border-4 border-pink-200"
                alt="user"
              />

              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-xl text-black font-semibold">
                  {user.firstName} {user.lastName}
                  <span className="text-gray-500 ml-2">{user.age}</span>
                </h2>

                <p className="text-gray-600 mt-1">
                  {user.about || "No bio available."}
                </p>

                <button className="text-orange-500 mt-3" onClick={() => handlechat(user._id)}>💬 Message</button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Connections;
