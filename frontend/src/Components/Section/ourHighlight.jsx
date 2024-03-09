import React, { useState } from "react";

const OurHighlight = () => {
  const [showVideo, setShowVideo] = useState(false);

  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  const closeVideo = (e) => {
    if (e.target === e.currentTarget) {
      setShowVideo(false);
    }
  };

  return (
    <div className="bg-white font-open-sans p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl text-cyan-600 my-2 text-center">
          Upgrading Education with Forward-Thinking Initiatives
        </h1>
        <p className="font-normal mb-4 text-justify text-sm md:text-base md:pl-8 md:pr-4 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et eveniet
          perferendis quod corporis rerum similique vel? Doloribus vitae, eaque,
          est quo tempora recusandae soluta fuga nesciunt, reprehenderit ea
          sapiente sint. Ipsum molestiae perspiciatis fuga rerum reprehenderit
          quam? Iste dolor error nobis temporibus eos veritatis nesciunt, soluta
          odio deserunt voluptatibus, totam saepe esse blanditiis ratione
          officia magnam doloribus, quis voluptate pariatur atque? Nesciunt,
        </p>
        {/* another */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl text-center mx-auto py-2 px-2">
          <div className="flex flex-col justify-center items-center">
            <img
              src="https://source.unsplash.com/1600x900/?education"
              alt="education"
              className="border rounded-lg shadow-lg w-auto h-auto object-cover"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl md:text-6xl text-cyan-600 my-2 text-center">
              Our Mission
            </h2>
            <p className="font-normal mb-4 text-justify text-sm md:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
              eveniet perferendis quod corporis rerum similique vel? Doloribus
              vitae, eaque, est quo tempora recusandae soluta fuga nesciunt,
              reprehenderit ea sapiente sint. Ipsum molestiae perspiciatis fuga
              rerum reprehenderit quam? Iste dolor error nobis temporibus eos
              veritatis nesciunt, soluta odio deserunt voluptatibus, totam saepe
              esse blanditiis ratione officia magnam doloribus, quis voluptate
              pariatur atque? Nesciunt,
            </p>
            <div>
              <button
                onClick={toggleVideo}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
              >
                Watch Video
              </button>
              {showVideo && (
                <div
                  className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50"
                  onClick={closeVideo}
                >
                  <iframe
                    width="850"
                    height="600"
                    src="https://www.youtube.com/embed/0amAUU4F91g?autoplay=1"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* card2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl text-center mx-auto py-2 px-2">
          <div className="flex flex-col justify-center items-center order-2 md:order-1">
            <h2 className="text-2xl md:text-6xl text-cyan-600 my-2 text-center">
              Our Mission
            </h2>
            <p className="font-normal mb-4 text-justify text-sm md:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
              eveniet perferendis quod corporis rerum similique vel? Doloribus
              vitae, eaque, est quo tempora recusandae soluta fuga nesciunt,
              reprehenderit ea sapiente sint. Ipsum molestiae perspiciatis fuga
              rerum reprehenderit quam? Iste dolor error nobis temporibus eos
              veritatis nesciunt, soluta odio deserunt voluptatibus, totam saepe
              esse blanditiis ratione officia magnam doloribus, quis voluptate
              pariatur atque? Nesciunt,
            </p>
            <div>
              <button
                onClick={toggleVideo}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
              >
                Watch Video
              </button>
              {showVideo && (
                <div
                  className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50"
                  onClick={closeVideo}
                >
                  <iframe
                    width="850"
                    height="600"
                    src="https://www.youtube.com/embed/0amAUU4F91g?autoplay=1"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center order-1 md:order-2">
            <img
              src="https://source.unsplash.com/1600x900/?education"
              alt="education"
              className="border rounded-lg shadow-lg w-auto h-auto object-cover"
            />
          </div>
        </div>
        {/* another */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl text-center mx-auto py-2 px-2">
          <div className="flex flex-col justify-center items-center">
            <img
              src="https://source.unsplash.com/1600x900/?education"
              alt="education"
              className="border rounded-lg shadow-lg w-auto h-auto object-cover"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl md:text-6xl text-cyan-600 my-2 text-center">
              Our Mission
            </h2>
            <p className="font-normal mb-4 text-justify text-sm md:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
              eveniet perferendis quod corporis rerum similique vel? Doloribus
              vitae, eaque, est quo tempora recusandae soluta fuga nesciunt,
              reprehenderit ea sapiente sint. Ipsum molestiae perspiciatis fuga
              rerum reprehenderit quam? Iste dolor error nobis temporibus eos
              veritatis nesciunt, soluta odio deserunt voluptatibus, totam saepe
              esse blanditiis ratione officia magnam doloribus, quis voluptate
              pariatur atque? Nesciunt,
            </p>
            <div>
              <button
                onClick={toggleVideo}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
              >
                Watch Video
              </button>
              {showVideo && (
                <div
                  className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50"
                  onClick={closeVideo}
                >
                  <iframe
                    width="850"
                    height="600"
                    src="https://www.youtube.com/embed/0amAUU4F91g?autoplay=1"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurHighlight;
