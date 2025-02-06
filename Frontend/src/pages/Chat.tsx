import { useRef, useEffect } from "react";
import { Socket } from "socket.io-client";
import { connectSocket, getSocket } from "../utils/socket";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { MessageCircle, Users, ArrowRight } from "lucide-react";

const Chat = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const roomRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    connectSocket();

    const socket: Socket | null = getSocket();
    if (!socket) return;

    socket.on("create-room-response", (data) => {
      if (data.message === "Already Room Exists!") {
        toast.info("Already Room Exists!", {
          position: 'bottom-right',
          theme: 'dark',
        });
        return;
      }
      navigate(`/chat/${roomRef.current?.value}`);
    });

    socket.on("join-room-response", (data) => {
      if (data.message === "Room Doesn't Exists!") {
        toast.info("Room Doesn't Exist!", {
          position: 'bottom-right',
          theme: 'dark',
        });
        return;
      }
      navigate(`/chat/${roomRef.current?.value}`);
    });

    return () => {
      socket.off("create-room-response");
      socket.off("join-room-response");
    };
  }, [navigate]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const roomId = roomRef.current?.value;
    const socket = getSocket();

    if (socket && roomId) {
      socket.emit("create-room", { username, roomId });
      localStorage.setItem("roomId", roomId);
    }
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const roomId = roomRef.current?.value;
    const socket = getSocket();

    if (socket && roomId && username) {
      socket.emit("join-room", { username, roomId });
      localStorage.setItem("roomId", roomId);
      localStorage.setItem("username", username);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 relative overflow-hidden">
      <ToastContainer />
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 animate-gradient-shift"></div>
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <Link to={"/"} className="flex items-center space-x-2">
            <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500" />
            <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Talkio
            </span>
          </Link>
        </div>
      </nav>

      <div className="relative w-full min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-900/50 backdrop-blur-xl p-8 rounded-2xl border border-gray-800 shadow-xl">
            <div className="flex items-center justify-center mb-8">
              <Users className="w-12 h-12 text-blue-500 mr-3" />
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Join a Chat
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <input
                  ref={usernameRef}
                  className="w-full bg-gray-900/50 text-white rounded-xl py-3 px-6 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 transition-all duration-300"
                  type="text"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <input
                  ref={roomRef}
                  className="w-full bg-gray-900/50 text-white rounded-xl py-3 px-6 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 transition-all duration-300"
                  type="text"
                  placeholder="Enter room ID"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleJoin}
                  className="flex-1 group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
                >
                  <span>Join Room</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={handleCreate}
                  className="flex-1 px-6 py-3 bg-gray-800 rounded-xl text-gray-300 font-semibold hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-gray-600"
                >
                  Create Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;