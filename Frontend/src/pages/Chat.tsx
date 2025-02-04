import { useRef } from "react";
import { io, Socket } from "socket.io-client";
import { connectSocket, getSocket } from "../utils/socket";

const Chat = () => {
  connectSocket()

  const socket:Socket | null = getSocket()
  if(!socket){
    return;
  }

  socket.on("connect" , () => {
    console.log(`Socket connection initialized with ID: ${socket.id}.`); 
  })

  socket.on(`join-notify`,(data) => {
    console.log(data.message);
  })

  const usernameRef = useRef<HTMLInputElement>(null)
  const roomRef = useRef<HTMLInputElement>(null)

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const roomId = roomRef.current?.value;
    socket.emit("create-room" , {username , roomId} );
    console.log({
      data:{
      type: "create-room",
      username,
      roomId
  }});
    
    socket.on("create-room-response", (data) => {
      console.log(data);
    })
  }

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const roomId = roomRef.current?.value;
    socket.emit("join-room" , {username , roomId} )
    console.log({
      data:{
        type: "join-room",
        username,roomId,
  }});

  socket.on("join-room-response", (data) => {
    console.log(data.message);
  })
  }

  return (
    <div className="w-screen h-screen bg-gray-950 ">
        <div className=" w-[95%]  mx-auto h-full flex flex-col justify-center items-center">
          <div className="text-white flex gap-3 flex-col items-center justify-center max-lg:w-full lg:w-[50%]  h-[50%] rounded-lg bg-gray-600/30">
            <div className="w-full flex justify-center">
              <input  ref={usernameRef} className="outline-none border border-gray-500 px-3 w-[90%] lg:w-[50%] py-2 bg-gray-700/50 rounded-lg text-md" type="text" placeholder="username" />
            </div>
          
            <div className="flex flex-col w-full flex items-center">
            <input ref={roomRef} className="outline-none border border-gray-500 px-3 w-[90%] lg:w-[50%] py-2 bg-gray-700/50 rounded-lg text-md" type="text" placeholder="Room ID" />  
            <div className="flex gap-3 mt-3">
            <button onClick={handleJoin} className="bg-blue-600 px-3 py-2 rounded-md cursor-pointer ">Join Room</button>
            <button onClick={handleCreate} className="bg-blue-600 px-3 py-2 rounded-md cursor-pointer ">Create Room</button>
            </div>
            </div>
          
          </div>

        </div>
    </div>
  )
}

export default Chat