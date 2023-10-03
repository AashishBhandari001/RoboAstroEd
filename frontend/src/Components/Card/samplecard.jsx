import React from "react";

function Samplecard({ picture, title, text }) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow font-open-sans">
      <div className="flex justify-center items-center">
        <img className="rounded-lg" src={picture} alt="" 
        style={{ width: "14.5rem", height: "12rem" }}/>
      </div>
      <div className="text-center py-3">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h5>

        <p className="mb-3 font-normal text-gray-700 text-center px-5 md:px-4 pb-4">
          {text}
        </p>
      </div>
    </div>
  );
}

export default Samplecard;
