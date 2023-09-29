import React from "react";
import ReactDOM from "react-dom";
import Picture from "../../Assets/child-robo.jpeg";
// import { Carousel } from "@trendyol-js/react-carousel";
import Dash from "../../Elements/Dash";

function Card() {
  return (
    <div className="bg-white font-open-sans ml-4 mr-4">
      <div>
        <h1 className="flex flex-row justify-center text-center item-center text-xl md:text-6xl text-[#00ADEB] my-1 mx-2 ">
          Transforming young minds into innovators
        </h1>
        <Dash />
      </div>
      <div>
        <p className="flex flex-row justify-center font-normal items-center text-justify md:text-center mx-3 md:mx-10 ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non,
          inventore natus hic quis magnam sit nobis assumenda omnis
          necessitatibus dolor labore nemo possimus sint cumque ipsum veniam
          accusamus similique saepe iure distinctio laboriosam officiis deleniti
          dicta! Odit laudantium fugiat natus sit accusamus consectetur, totam
          et at velit corrupti nesciunt id numquam, incidunt dolor vero nemo
          doloribus expedita. Ipsum perferendis tempore debitis saepe reiciendis
          quos labore, voluptatibus blanditiis nam deleniti aliquid possimus
          accusamus nulla sed ratione praesentium commodi, voluptatum omnis
          explicabo veniam sequi, architecto maiores. Sed corrupti enim
          asperiores est? Iste error suscipit quisquam veritatis ipsam eos ipsum
          illo quaerat odio.
        </p>
      </div>

      {/* -----------------------------------Card----------------------------------- */}
      <div className="flex flex-col md:flex-row md:space-x-4 mr-4 ml-4">
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow font-open-sans">
          <div className="flex justify-center items-center h-48 sm:h-auto">
            {" "}
            <img className="rounded-t-lg" src={Picture} alt="" />
          </div>
          <div className="text-center py-3">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              Inter School Robotics Competition 2022
            </h5>

            <p className="mb-3 font-normal text-gray-700 text-center md:px-4 pb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
              voluptatibus reprehenderit, voluptas reiciendis quae maiores
              libero nesciunt quisquam ipsum perferendis facere aliquid, culpa
              quia! Molestias voluptas eum eos tempore nesciunt.
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow font-open-sans">
          <div className="flex justify-center items-center h-48 sm:h-auto">
            {" "}
            <img className="rounded-t-lg" src={Picture} alt="" />
          </div>
          <div className="text-center py-3">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              Lunar Habitat Challenge
            </h5>

            <p className="mb-3 font-normal text-gray-700 text-center md:px-4 pb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
              voluptatibus reprehenderit, voluptas reiciendis quae maiores
              libero nesciunt quisquam ipsum perferendis facere aliquid, culpa
              quia! Molestias voluptas eum eos tempore nesciunt.
            </p>
          </div>
        </div>

        {/* Another card */}
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow font-open-sans">
          <div className="flex justify-center items-center h-48 sm:h-auto">
            {" "}
            <img className="rounded-t-lg" src={Picture} alt="" />
          </div>
          <div className="text-center py-3">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              Educathon 1.O 2023
            </h5>

            <p className="mb-3 font-normal text-gray-700 text-center md:px-4 pb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
              voluptatibus reprehenderit, voluptas reiciendis quae maiores
              libero nesciunt quisquam ipsum perferendis facere aliquid, culpa
              quia! Molestias voluptas eum eos tempore nesciunt.
            </p>
          </div>
        </div>

        {/* Another card*/}
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow font-open-sans">
          <div className="flex justify-center items-center h-48 sm:h-auto">
            {" "}
            <img className="rounded-t-lg" src={Picture} alt="" />
          </div>
          <div className="text-center py-3">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              Codding Challenge
            </h5>

            <p className="mb-3 font-normal text-gray-700 text-center md:px-4 pb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
              voluptatibus reprehenderit, voluptas reiciendis quae maiores
              libero nesciunt quisquam ipsum perferendis facere aliquid, culpa
              quia! Molestias voluptas eum eos tempore nesciunt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
