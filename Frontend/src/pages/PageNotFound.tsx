import { useNavigate } from 'react-router-dom';
import { MessageCircle, Home } from 'lucide-react';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-gray-100 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 animate-gradient-shift"></div>

      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <MessageCircle className="w-12 h-12 text-blue-500" />
            <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Talkio
            </span>
          </div>
          
          <h1 className="text-6xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            404
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400">
            Oops! The page you're looking for doesn't exist.
          </p>
          
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-6 py-3 mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 group"
          >
            <Home className="w-5 h-5 mr-2" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;