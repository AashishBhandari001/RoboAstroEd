import React, { useState } from "react";
import logo1 from "../../Assets/lab.png";

const imageInfo = [
  {
    url: logo1,
    title: "Title for Image 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod",
  },
  {
    url: logo1,
    title: "Title for Image 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod",
  },
  {
    url: logo1,
    title: "Title for Image 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod",
  },
  {
    url: logo1,
    title: "Title for Image 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod",
  },
  {
    url: logo1,
    title: "Title for Image 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod",
  },
  {
    url: logo1,
    title: "Title for Image 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod",
  },
  {
    url: logo1,
    title: "Title for Image 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod",
  },
  {
    url: logo1,
    title: "Title for Image 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod",
  },
  {
    url: logo1,
    title: "Title for Image 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod",
  },
  {
    url: logo1,
    title: "Title for Image 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod",
  },
  {
    url: logo1,
    title: "Title for Image 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod",
  },
  {
    url: logo1,
    title: "Title for Image 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod",
  },
  {
    url: logo1,
    title: "Title for Image 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Loremipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod",
  },
];

const StudentsProject = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(-1);

  const toggleAnimation = () => {
    setIsPaused((prevState) => !prevState);
  };

  const handleMouseEnter = (index) => {
    setIsPaused(true);
    setCurrentImageIndex(index);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setCurrentImageIndex(-1);
  };

  return (
    <div className="mx-auto px-4 md:px-8 mb-6 mt-8 max-w-7xl">
      <div className="bg-white text-black font-open-sans mx-auto mb-2">
        <div className="flex flex-col items-center text-center">
          <h1 className="flex flex-row justify-center text-center item-center text-xl md:text-6xl text-cyan-600 my-1 mx-2 pb-4">
            Projects made by our students
          </h1>
        </div>
        <div className="flex flex-row m-auto overflow-hidden">
          <div
            className={`animate-infinite-slider inset-y-0 left-0 flex space-x-2 md:space-x-4 ${
              isPaused ? "paused" : ""
            }`}
            onMouseEnter={toggleAnimation}
            onMouseLeave={handleMouseLeave}
          >
            {imageInfo.map((image, index) => (
              <div
                className="slide w-40 md:w-96 h-auto shadow-md rounded-lg transition-transform duration-300 transform hover:scale-105 border hover:cursor-pointer hover:shadow-lg"
                key={index}
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => handleMouseEnter(index)}
              >
                <img
                  src={image.url}
                  alt={`Logo ${index + 1}`}
                  className="mx-auto max-w-full"
                />
                {currentImageIndex === index && (
                  <div className="text-center">
                    <h2 className="text-lg font-semibold text-gray-800 mt-2">
                      {image.title}
                    </h2>
                    <p className="text-sm text-gray-700 mb-2">{image.text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsProject;
