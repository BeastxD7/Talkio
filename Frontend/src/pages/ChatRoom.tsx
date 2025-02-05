import { useEffect, useRef, useState } from "react";
import { connectSocket, getSocket } from "../utils/socket";
import { useNavigate, useParams } from "react-router-dom";
import ChatBubble from "../components/ChatBubble";
import Modal from "../components/Modal"; 

const ChatRoom = () => {
  const navigate = useNavigate();
  let params = useParams();
  const [roomId, setRoomId] = useState(localStorage.getItem("roomId"));
  const [socket, setSocket] = useState(getSocket());
  const [username, setUsername] = useState<string>(localStorage.getItem("username") || "");
  const [messages, setMessages] = useState<{ message: string, username: string }[]>([]);
  const [showModal, setShowModal] = useState(false); 
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!username) {
      setShowModal(true); 
    }

    if (!socket) return;

    socket.on("message", (data) => {
      console.log("Received message:", data);
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
    console.log("Room ID:", id);
    console.log("Room dw:", user);
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
      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onSubmit={handleUsernameSubmit} 
      />

      <div className="w-screen h-screen bg-gray-950 text-white overflow-hidden pt-3">
        <div className="flex flex-col justify-center items-center gap-3 w-full h-[95%]">
          <div className="flex w-[50%] max-md:w-[90%] bg-gray-900 h-20 justify-between rounded-lg items-center px-4 py-2">
            <h1>Username: {username}</h1>
            <h1>Room ID: {roomId}</h1>
          </div>
          <div className="h-[80vh] w-[50%] max-md:w-[90%] p-3 bg-gray-900 rounded-lg mb-3 flex flex-col gap-3 overflow-y-auto" ref={chatRef}>
            {messages?.map((data, index) => (
              <div key={index}>
                <ChatBubble message={data.message} username={data.username} isSender={data.username === username} />
              </div>
            ))}
          </div>
          <div className="w-[100%] max-md:w-[100%] flex justify-center gap-2 px-8">
            <input
              ref={inputRef}
              placeholder="Enter your Message Here!"
              className="outline-none w-[45%] max-md:w-[90%] bg-gray-800 border border-slate-500 px-4 rounded-lg"
              type="text"
            />
            <button onClick={handleSend} className="bg-blue-500 w-fit py-3 px-6 rounded-lg cursor-pointer">Send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
