import { useRef, useEffect } from "react";
import { Socket } from "socket.io-client";
import { connectSocket, getSocket } from "../utils/socket";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Chat = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const roomRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    connectSocket(); 

    const socket: Socket | null = getSocket();
    if (!socket) {
      return;
    }

    
    socket.on("create-room-response", (data) => {
      console.log(data.message);
      if (data.message === "Already Room Exists!") {
        toast.info("Already Room Exists!", {
          position: 'bottom-right',
        });
        return;
      }
      navigate(`/chat/${roomRef.current?.value}`);
    });

    socket.on("join-room-response", (data) => {
      if (data.message === "Room Doesn't Exists!") {
        toast.info("Room Doesn't Exist!", {
          position: 'bottom-right',
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
      console.log({ data: { type: "create-room", username, roomId } });

      if (roomId) {
        localStorage.setItem("roomId", roomId);
      }
    }
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const roomId = roomRef.current?.value;
    const socket = getSocket();

    if (socket && roomId && username) {
      socket.emit("join-room", { username, roomId });
      console.log({ data: { type: "join-room", username, roomId } });

      localStorage.setItem("roomId", roomId);
      localStorage.setItem("username", username);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-950 text-white">
      <ToastContainer />
      <div className="w-[95%] mx-auto h-full flex flex-col justify-center items-center">
        <div className="text-white flex gap-3 flex-col items-center justify-center max-lg:w-full lg:w-[50%] h-[50%] rounded-lg bg-gray-600/30">
          <div className="w-full flex justify-center">
            <input
              ref={usernameRef}
              className="outline-none border border-gray-500 px-3 w-[90%] lg:w-[50%] py-2 bg-gray-700/50 rounded-lg text-md"
              type="text"
              placeholder="username"
            />
          </div>

          <div className="flex flex-col w-full items-center">
            <input
              ref={roomRef}
              className="outline-none border border-gray-500 px-3 w-[90%] lg:w-[50%] py-2 bg-gray-700/50 rounded-lg text-md"
              type="text"
              placeholder="Room ID"
            />
            <div className="flex gap-3 mt-3">
              <button onClick={handleJoin} className="bg-blue-600 px-3 py-2 rounded-md cursor-pointer">
                Join Room
              </button>
              <button onClick={handleCreate} className="bg-blue-600 px-3 py-2 rounded-md cursor-pointer">
                Create Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
