interface PropType {
  message: string;
  username: string;
  isSender:boolean
}

const ChatBubble = ({ message, username, isSender }: PropType) => {
  return (
<div className={`flex ${isSender ? "justify-end" : "justify-start"} my-2`}>
      <div
        className={`w-fit max-w-[90%] px-4 py-2  shadow-md 
          ${isSender ? "bg-blue-500 text-white rounded-tl-xl rounded-bl-xl rounded-tr-xl" : "bg-gray-700 text-white rounded-tr-xl rounded-br-xl rounded-tl-xl"}`}
      >
        {!isSender && <p className="text-xs font-semibold text-gray-300">{username}</p>}
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
