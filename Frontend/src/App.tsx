import { useEffect, useRef, useState } from "react";

const App = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setWs(ws);
  }, []);

  if (!ws) {
    return;
  }

  ws.onopen = () => {
    console.log(`websocket connection established!`);
  };

  ws.onmessage = (event) => {
    console.log(
      `message has been recieved by server.\n server message: ${event.data}`
    );
    setMessages([...messages, event.data]);
  };

  ws.onclose = () => {
    console.log(`websocket connection terminated!!`);
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  const sendMsg = () => {
    if (inputRef.current) {
      const Usermessage = inputRef.current.value;
      ws.send(Usermessage);
      inputRef.current.value = '';
    }
  };

  return (
    <div className="w-screen h-screen bg-red-800 flex  justify-center items-center">
      <div className="w-1/2 h-1/2 bg-slate-600 rounded-xl flex flex-col justify-between ">
        <div className="bg-red-500 h-full p-5 flex flex-col gap-3">
          {messages.map((message, index) => {
            return (
              <div
                key={index}
                className="w-fit h-fit bg-gray-300 py-2 px-3 rounded-xl">
                {message}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between">
          <input
            ref={inputRef}
            className="bg-slate-500 w-[92%] h-fit py-2 px-4 outline-none text-white rounded-lg shadow-xl"
            type="text"
          />
          <button
            onClick={sendMsg}
            className="w-fit h-fit px-4 py-2 bg-blue-600 rounded-lg text-white cursor-pointer">
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
