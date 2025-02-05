import { useEffect, useRef, useState } from "react";
import { connectSocket, getSocket } from "../utils/socket";
import { useNavigate, useParams } from "react-router-dom";
import ChatBubble from "../components/ChatBubble";
import Modal from "../components/Modal";
import { MessageCircle, Send, ArrowLeft } from "lucide-react";

const ChatRoom = () => {
  const navigate = useNavigate();
  let params = useParams();
  const [roomId, setRoomId] = useState(localStorage.getItem("roomId"));
  const [socket, setSocket] = useState(getSocket());
  const [username, setUsername] = useState<string>(localStorage.getItem("username") || "");
  const [messages, setMessages] = useState<{ message: string; username: string }[]>([]);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!username) {
      setShowModal(true);
    }

    if (!socket) return;

    socket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, { message: data.message, username: data.username }]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket, username]);

  const handleSend = () => {
    let chatInput = inputRef.current?.value;
    if (chatInput && socket) {
      socket.emit("message", { message: chatInput, username, roomId });
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleUsernameSubmit = (newUsername: string) => {
    localStorage.setItem("username", newUsername);
    setUsername(newUsername);
    setShowModal(false);
  };

  useEffect(() => {
    const id = params.roomId;
    const user = localStorage.getItem("username") || "Anonymous";
    setSocket(getSocket());
    setUsername(user);

    if (!id) {
      navigate("/chat");
      return;
    }
    setRoomId(id);

    if (!socket) {
      if (username && id) {
        const newSocket = connectSocket(id, username);
        setSocket(newSocket);
      }
    }
  }, [navigate, socket, username]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={handleUsernameSubmit} />

      <div className="min-h-screen bg-black text-gray-100 relative">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 animate-gradient-shift"></div>

        <div className="relative flex flex-col h-screen max-h-screen">
          {/* Header */}
          <div className="bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigate('/chat')}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-6 h-6 text-blue-500" />
                    <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                      Room: {roomId}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  Chatting as <span className="text-blue-400">{username}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
          >
            {messages?.map((data, index) => (
              <div key={index}>
                <ChatBubble message={data.message} username={data.username} isSender={data.username === username} />
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="bg-gray-900/80 backdrop-blur-lg border-t border-gray-800 p-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4">
                <input
                  ref={inputRef}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-900/50 text-white rounded-xl py-3 px-6 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
                  type="text"
                />
                <button
                  onClick={handleSend}
                  className="group p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;