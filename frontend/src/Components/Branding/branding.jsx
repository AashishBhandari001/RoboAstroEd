import React from "react";
import { LiaUniversitySolid } from "react-icons/lia"; // School
import { PiStudentFill } from "react-icons/pi"; // Student
import { RiRobot2Fill } from "react-icons/ri"; // Robot
import { FaChalkboardTeacher } from "react-icons/fa"; // Teacher
import { AiOutlineProject } from "react-icons/ai"; // Project

function Branding() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8 mt-4">
      <div className="flex flex-wrap justify-center items-center gap-4 bg-white font-open-sans">
        {/* School */}
        <div className="flex flex-col w-44 h-48 pr-2 pl-2 pb-2 bg-white/80 shadow-lg rounded-md justify-center items-center">
          <LiaUniversitySolid className="text-[#0F7173] w-16 h-16" />
          <h2 className="mt-2 text-lg font-bold text-gray-600">20+</h2>
          <p className="mt-0 text-gray-500 font-semibold text-center">
            Partner Schools
          </p>
        </div>

        {/* Student */}
        <div className="flex flex-col w-44 h-48 pr-2 pl-2 pb-2 bg-white/80 shadow-lg rounded-md justify-center items-center">
          <PiStudentFill className="text-[#0F7173] w-16 h-16" />
          <h2 className="mt-2 text-lg font-bold text-gray-600">2000+</h2>
          <p className="mt-0 text-gray-500 font-semibold text-center">
            Students Affected
          </p>
        </div>

        {/* Robot */}
        <div className="flex flex-col w-44 h-48 pr-2 pl-2 pb-2 bg-white/80 shadow-lg rounded-md justify-center items-center">
          <RiRobot2Fill className="text-[#0F7173] w-16 h-16" />
          <h2 className="mt-2 text-lg font-bold text-gray-600">50+</h2>
          <p className="mt-0 text-gray-500 font-semibold text-center">
            Electrical Components
          </p>
        </div>

        {/* Teacher */}
        <div className="flex flex-col w-44 h-48 pr-2 pl-2 pb-2 bg-white/80 shadow-lg rounded-md justify-center items-center">
          <FaChalkboardTeacher className="text-[#0F7173] w-16 h-16" />
          <h2 className="mt-2 text-lg font-bold text-gray-600">100+</h2>
          <p className="mt-0 text-gray-500 font-semibold text-center">
            Educators Trained
          </p>
        </div>

        {/* Project */}
        <div className="flex flex-col w-44 h-48 pr-2 pl-2 pb-2 bg-white/80 shadow-lg rounded-md justify-center items-center">
          <AiOutlineProject className="text-[#0F7173] w-16 h-16" />
          <h2 className="mt-2 text-lg font-bold text-gray-600">1000+</h2>
          <p className="mt-0 text-gray-500 font-semibold text-center">
            Student's Project
          </p>
        </div>
      </div>
    </div>
  );
}

export default Branding;
