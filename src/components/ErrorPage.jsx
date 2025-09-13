// src/components/ErrorPage.jsx
import { useNavigate } from "react-router-dom";
import { HeartCrack, Home } from "lucide-react"; 

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-red-100 text-center px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <div className="flex justify-center mb-4">
          <HeartCrack className="w-16 h-16 text-pink-500 animate-bounce" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Oops! Something went wrong 💔
        </h1>
        <p className="text-gray-600 mb-6">
          Looks like we lost our connection. Don’t worry, love always finds a way back.  
        </p>

        <div className="flex justify-center gap-4">
          <button 
            className="px-6 py-2 rounded-xl shadow-md bg-pink-500 hover:bg-pink-600 text-white font-semibold transition"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>

          <button 
            className="px-6 py-2 rounded-xl shadow-md bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            <Home className="w-4 h-4" /> Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
