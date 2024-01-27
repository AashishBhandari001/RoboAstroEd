import React from "react";

function Button({ onClick, children }) {
  return (
    <div>
      <button
        className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
