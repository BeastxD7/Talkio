import { useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (username: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const username = inputRef.current?.value;
    if (username) {
      onSubmit(username);
    }
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800/50 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg w-[300px]">
        <h2 className="text-white mb-4">Enter Your Username</h2>
        <input
          ref={inputRef}
          type="text"
          placeholder="Username"
          className="px-4 py-2 rounded-lg bg-gray-700 text-white w-full"
        />
        <div className="mt-4 flex justify-between gap-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 px-4 py-2 rounded-lg text-white"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 px-4 py-2 rounded-lg text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
