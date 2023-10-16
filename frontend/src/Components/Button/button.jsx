import React from "react";

function Button({ onClick, children }) {
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full border-none"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
