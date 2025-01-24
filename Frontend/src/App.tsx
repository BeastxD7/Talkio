import { useEffect, useRef, useState } from "react";

interface MessageType {
  text: string;
  type: string;
}

const App = () => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<MessageType[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    setWs(ws);

    ws.onopen = () => {
      console.log(`websocket connection established!`);
    };
  
    ws.onmessage = (event) => {
      console.log(
        `message has been received by server. server message: ${event.data}`
      );
      const parsedMessage = JSON.parse(event.data);
      console.log(parsedMessage);
  
      setMessages((prev) => [...prev, { text: parsedMessage.text, type: "received" }]);
    };
  
    ws.onclose = () => {
      console.log(`websocket connection terminated!!`);
    };
  
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }, []);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!ws) {
    return;
  }

  

  const sendMsg = () => {
    if (inputRef.current) {
      ws.send(JSON.stringify({ text: inputRef.current.value, type: "sent" }));
      setMessages([
        ...messages,
        { text: inputRef.current.value, type: "sent" },
      ]);
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-900 flex  justify-center items-center">
      <div className="md:w-1/2 w-[90%] h-[90%] bg-slate-900 rounded-xl flex flex-col gap-2 justify-between ">
        <div className="bg-slate-800 h-full p-5 flex flex-col gap-3 rounded-xl overflow-y-auto no-scrollbar">
          {messages.map((message, index) => {
            const parsedMessage = message;
            return (
              <div
                key={index}
                ref={index === messages.length - 1 ? lastMessageRef : null}
                className={`w-fit max-w-[90%] h-fit text-lg flex flex-col bg-gray-300 py-2 px-3 rounded-xl  ${
                  parsedMessage.type === "sent"
                    ? "self-end rounded-br-none"
                    : "  rounded-bl-none "
                }`}>
                {parsedMessage.text}
                <div className="w-full text-xs">
                  {parsedMessage.type === "sent" ? "Sent" : "Received"}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between">
          <input
            ref={inputRef}
            className="bg-slate-700  w-[92%] h-fit py-2 px-4 outline-none text-white rounded-lg shadow-2xl shadow-blue-600"
            type="text"
          />
          <button
            onClick={sendMsg}
            className="w-fit h-fit px-4 py-2 bg-blue-600 rounded-lg text-white cursor-pointer shadow-2xl shadow-blue-600">
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
