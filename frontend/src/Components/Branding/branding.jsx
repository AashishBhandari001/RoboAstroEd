import React from "react";
import { LiaUniversitySolid } from "react-icons/lia"; // School
import { PiStudentFill } from "react-icons/pi"; // Student
import { RiRobot2Fill } from "react-icons/ri"; // Robot
import { FaChalkboardTeacher } from "react-icons/fa"; // Teacher

function Branding() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-4 bg-white font-open-sans mr-4 ml-4 mt-2">
      {/* School */}
      <div className="flex flex-col w-48 md:w-52 h-48 md:h-56 pr-2 pl-2 mb-4 bg-[#B0F0F6] rounded-md justify-center items-center">
        <LiaUniversitySolid className="text-[#0F7173] w-16 h-16 md:w-20 md:h-20" />
        <div className="mt-2 text-lg font-bold text-gray-600">20+</div>
        <p className="mt-0 text-gray-500 font-semibold text-center">
          Partner Schools
        </p>
      </div>

      {/* Student */}
      <div className="flex flex-col w-48 md:w-52 h-48 md:h-56 pr-2 pl-2 mb-4 bg-[#B0F0F6] rounded-md justify-center items-center">
        <PiStudentFill className="text-[#0F7173] w-16 h-16 md:w-20 md:h-20" />
        <div className="mt-2 text-lg font-bold text-gray-600">2000+</div>
        <p className="mt-0 text-gray-500 font-semibold text-center">
          Students Affected
        </p>
      </div>

      {/* Robot */}
      <div className="flex flex-col w-48 md:w-52 h-48 md:h-56 pr-2 pl-2 mb-4 bg-[#B0F0F6] rounded-md justify-center items-center">
        <RiRobot2Fill className="text-[#0F7173] w-16 h-16 md:w-20 md:h-20" />
        <div className="mt-2 text-lg font-bold text-gray-600">50+</div>
        <p className="mt-0 text-gray-500 font-semibold text-center">
          Electrical Components
        </p>
      </div>

      {/* Teacher */}
      <div className="flex flex-col w-48 md:w-52 h-48 md:h-56 pr-2 pl-2 mb-4 bg-[#B0F0F6] rounded-md justify-center items-center">
        <FaChalkboardTeacher className="text-[#0F7173] w-16 h-16 md:w-20 md:h-20" />
        <div className="mt-2 text-lg font-bold text-gray-600">100+</div>
        <p className="mt-0 text-gray-500 font-semibold text-center">
          Educators Trained
        </p>
      </div>
    </div>
  );
}

export default Branding;
