import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../../utils/ConnectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);


  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });   
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return ;

  if (connections.length === 0) {
    return <div>No connections Found</div>;
  }

  return (
    <div className="flex flex-col items-center gap-6 min-h-screen bg-base-200 py-10">
      {connections.map((connection, ) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about  } = connection;

        return (
          <div
            key={_id}
            className="card card-side bg-base-100 shadow-xl w-[600px]"
          >
            <figure className="p-6">
              <img
                src={
                  photoUrl ||
                  "https://via.placeholder.com/150" // fallback if no photo
                }
                alt={`${firstName} ${lastName}`}
                className="rounded-xl w-32 h-32 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {firstName} {lastName}
              </h2>
              <p>
                {age} years old • {gender}
              </p>
              <p>
                {about}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;








