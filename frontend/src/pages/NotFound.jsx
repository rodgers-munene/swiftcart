import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      {/* Animated 404 text */}
      <div className="relative">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          404
        </h1>
      </div>

      {/* Main message */}
      <h2 className="mt-6 text-3xl font-bold text-gray-800 dark:text-white">
        Oops! Lost in Space?
      </h2>

      {/* Submessage */}
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-md">
        The page you're looking for doesn't exist or has been moved. Let's get
        you back home!
      </p>

      {/* Interactive button */}
      <div className="mt-8 group">
        <button
          onClick={() => navigate("/")}
          className="relative px-6 py-3 font-medium text-white transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 group-hover:from-purple-600 group-hover:to-pink-600"
        >
          <span className="relative z-10">Take Me Home</span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
