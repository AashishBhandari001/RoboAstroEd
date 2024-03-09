import React, { useState, useEffect } from "react";
import { LiaUniversitySolid } from "react-icons/lia"; // School
import { PiStudentFill } from "react-icons/pi"; // Student
import { RiRobot2Fill } from "react-icons/ri"; // Robot
import { FaChalkboardTeacher } from "react-icons/fa"; // Teacher
import { AiOutlineProject } from "react-icons/ai"; // Project

function Branding() {
  const [schoolCount, setSchoolCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [robotCount, setRobotCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update counts with animation
      setSchoolCount((prevCount) => (prevCount < 20 ? prevCount + 1 : 20));
      setStudentCount((prevCount) =>
        prevCount < 2000 ? prevCount + 100 : 2000
      );
      setRobotCount((prevCount) => (prevCount < 1000 ? prevCount + 50 : 1000));
      setTeacherCount((prevCount) => (prevCount < 100 ? prevCount + 5 : 100));
      setProjectCount((prevCount) =>
        prevCount < 1000 ? prevCount + 100 : 1000
      );
    }, 100);

    // Clear interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8 mt-4">
      <div className="flex flex-wrap justify-center items-center gap-4 bg-white font-open-sans ">
        {/* School */}
        <div className="flex flex-col w-44 h-48 pr-2 pl-2 pb-2 bg-white/80 shadow-lg rounded-md justify-center items-center border">
          <LiaUniversitySolid className="text-[#0F7173] w-16 h-16" />
          <h2 className="mt-2 text-lg font-bold text-gray-600">
            {schoolCount > 20 ? "20+" : schoolCount} +
          </h2>
          <p className="mt-0 text-gray-500 font-semibold text-center">
            Partner Schools
          </p>
        </div>

        {/* Student */}
        <div className="flex flex-col w-44 h-48 pr-2 pl-2 pb-2 bg-white/80 shadow-lg rounded-md justify-center items-center border">
          <PiStudentFill className="text-[#0F7173] w-16 h-16" />
          <h2 className="mt-2 text-lg font-bold text-gray-600">
            {studentCount > 2000 ? "2000+" : studentCount} +
          </h2>
          <p className="mt-0 text-gray-500 font-semibold text-center">
            Students Affected
          </p>
        </div>

        {/* Robot */}
        <div className="flex flex-col w-44 h-48 pr-2 pl-2 pb-2 bg-white/80 shadow-lg rounded-md justify-center items-center border">
          <RiRobot2Fill className="text-[#0F7173] w-16 h-16" />
          <h2 className="mt-2 text-lg font-bold text-gray-600">
            {robotCount > 1000 ? "1000+" : robotCount} +
          </h2>
          <p className="mt-0 text-gray-500 font-semibold text-center">
            Components
          </p>
        </div>

        {/* Teacher */}
        <div className="flex flex-col w-44 h-48 pr-2 pl-2 pb-2 bg-white/80 shadow-lg rounded-md justify-center items-center border">
          <FaChalkboardTeacher className="text-[#0F7173] w-16 h-16" />
          <h2 className="mt-2 text-lg font-bold text-gray-600">
            {teacherCount > 100 ? "100+" : teacherCount} +
          </h2>
          <p className="mt-0 text-gray-500 font-semibold text-center">
            Educators Trained
          </p>
        </div>

        {/* Project */}
        <div className="flex flex-col w-44 h-48 pr-2 pl-2 pb-2 bg-white/80 shadow-lg rounded-md justify-center items-center border">
          <AiOutlineProject className="text-[#0F7173] w-16 h-16" />
          <h2 className="mt-2 text-lg font-bold text-gray-600">
            {projectCount > 1000 ? "1000+" : projectCount} +
          </h2>
          <p className="mt-0 text-gray-500 font-semibold text-center">
            Online Courses
          </p>
        </div>
      </div>
    </div>
  );
}

export default Branding;
