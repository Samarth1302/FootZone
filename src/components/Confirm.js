import React, { useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Confirm = ({ message, onConfirm, onCancel, dark }) => {
  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-95 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-end mb-1">
            <button
              onClick={onCancel}
              className="text-black text-2xl cursor-pointer focus:outline-1"
            >
              <AiOutlineCloseCircle />
            </button>
          </div>
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-red-800">
            Confirm action
          </h1>
          <p className="text-black text-center mt-2 mb-4 font-medium">
            {message}
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                onConfirm();
              }}
              className="bg-red-800 hover:bg-red-900 text-white font-medium rounded-lg px-4 py-1 focus:outline-none"
            >
              Yes
            </button>
            <button
              onClick={() => {
                onCancel();
              }}
              className="bg-gray-700 hover:bg-gray-800 text-white font-medium rounded-lg px-4 py-1 focus:outline-none"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
