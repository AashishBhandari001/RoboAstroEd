import React from "react";
import { Spinner } from "@material-tailwind/react";

function Loading() {
  return (
    <div className="flex  justify-center items-center h-screen">
      <Spinner className="h-16 w-16 text-blue-200" />
    </div>
  );
}

export default Loading;
