import React from "react";

function Loading() {
  return (
    <div className="flex  justify-center items-center h-screen">
      <div className="my-40 flex">
        <div className="relative mx-auto h-10 w-10">
          <div className="relative mx-auto ms-5 h-24 w-24 animate-bounce rounded-full border-2">
            <div className="absolute bottom-0 right-10">
              <div className="relative h-40 animate-bounce">
                <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-black"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
