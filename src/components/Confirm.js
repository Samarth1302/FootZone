import React, { useEffect } from "react";
import { IoMdCloseCircle } from "react-icons/io";

const Confirm = ({ message, onConfirm, onCancel, dark }) => {
  return (
    <div
      className={`${
        dark ? "dark" : ""
      } fixed inset-0 bg-gray-700 bg-opacity-95 flex items-center justify-center`}
    >
      <div className="md:w-full max-w-sm md:max-w-md">
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6">
          <div className="flex justify-end mb-1">
            <button
              onClick={onCancel}
              className="text-black dark:text-white text-xl cursor-pointer focus:outline-1"
            >
              <IoMdCloseCircle className=" dark:text-white text-black hover:text-red-500 dark:hover:text-red-600"/>
            </button>
          </div>
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-red-800 dark:text-red-600">
            Confirm action
          </h1>
          <p className="text-black  dark:text-white text-center mt-2 mb-4 font-medium">
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
