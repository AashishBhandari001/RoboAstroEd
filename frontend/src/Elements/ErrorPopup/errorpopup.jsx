import React from "react";
import Button from "../../Components/Button";

function ErrorPopup({ error, onBack }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-50 fixed inset-0"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 text-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="text-red-500 mb-4">
          {error.message || JSON.stringify(error)}
        </div>
        <Button onClick={onBack}>Back</Button>
      </div>
    </div>
  );
}

export default ErrorPopup;
