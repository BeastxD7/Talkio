import { getSocket } from "../utils/socket"

const ChatRoom = () => {

    const socket = getSocket()

    if(!socket){
        return;
    }

    socket.on("message", (data) => {
        console.log(data);
        
    })

  return (
    <div>ChatRoom</div>
  )
}

export default ChatRoom