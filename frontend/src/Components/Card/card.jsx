import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Samplecard from "./samplecard";
import Picture1 from "../../Assets/child-robo.jpeg"; //card1
import Picture2 from "../../Assets/Student2.png"; //card 2
import Picture3 from "../../Assets/Student3.png";
import Dash from "../../Elements/Dash";

function Card() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Display 3 cards at a time by default
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024, // Medium screen (laptop)
        settings: {
          slidesToShow: 3, // Display 3 cards at a time
          slidesToScroll: 3, // Slide 3 cards at a time
        },
      },
      {
        breakpoint: 640, // Small screen (tablet)
        settings: {
          slidesToShow: 1, // Display 1 card at a time in small screens
          slidesToScroll: 1, // Slide 1 card at a time in small screens
        },
      },
    ],
  };

  return (
    <div className="bg-white font-open-sans ml-6 mr-6 mb-10">
      <div>
        <h1 className="flex flex-row justify-center text-center item-center text-xl md:text-6xl text-[#00ADEB] my-1 mx-2">
          Transforming young minds into innovators
        </h1>
        <Dash />
      </div>

      <div>
        <p className="flex flex-row font-normal mb-4 text-justify text-sm md:mr-16 md:ml-16 mx-3 md:mx-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
          veniam explicabo voluptates et rerum odit iure molestiae sunt, error
          sapiente sit quisquam eaque reprehenderit repellendus nostrum
          praesentium voluptas quae voluptate a, quia cumque saepe tempore.
          Rerum, iure maiores, dolorem aliquam corporis molestiae neque ullam
          explicabo veniam perferendis fugiat vitae odio mollitia. Qui dicta
          cumque quasi. Esse voluptatibus placeat provident eius earum in
          aliquam laborum molestiae porro architecto, similique soluta aliquid,
          vel assumenda? Deleniti tempore ipsum suscipit nam beatae vel saepe
          praesentium incidunt nesciunt, accusantium in asperiores vero quam
          tenetur ad odit quo! Maiores, porro excepturi beatae quibusdam
          sapiente eius aliquid?
        </p>
      </div>
      <div className="mr-4 ml-4">
        {/* Carousel */}
        <Slider {...settings}>
          {/* Card 1 */}
          <Samplecard
            picture={Picture1}
            title="Inter School Competition"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
          voluptatibus reprehenderit, voluptas reiciendis quae maiores libero
          nesciunt quisquam ipsum perferendis facere aliquid, culpa quia!
          Molestias voluptas eum eos tempore nesciunt"
          />

          {/* Card 2 */}
          <Samplecard
            picture={Picture2}
            title="Lunar Habitat Challenge"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
          voluptatibus reprehenderit, voluptas reiciendis quae maiores libero
          nesciunt quisquam ipsum perferendis facere aliquid, culpa quia!
          Molestias voluptas eum eos tempore nesciunt"
          />

          {/* Card 3 */}
          <Samplecard
            picture={Picture3}
            title="Hackathon 1.O"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
          voluptatibus reprehenderit, voluptas reiciendis quae maiores libero
          nesciunt quisquam ipsum perferendis facere aliquid, culpa quia!
          Molestias voluptas eum eos tempore nesciunt"
          />

          {/* Add more cards as needed */}
          {/* Card 4 */}
          <Samplecard
            picture={Picture1}
            title="Inter School Competition"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
          voluptatibus reprehenderit, voluptas reiciendis quae maiores libero
          nesciunt quisquam ipsum perferendis facere aliquid, culpa quia!
          Molestias voluptas eum eos tempore nesciunt"
          />

          {/* Card 5 */}
          <Samplecard
            picture={Picture1}
            title="Inter School Competition"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
          voluptatibus reprehenderit, voluptas reiciendis quae maiores libero
          nesciunt quisquam ipsum perferendis facere aliquid, culpa quia!
          Molestias voluptas eum eos tempore nesciunt"
          />

          {/* Add more cards as needed */}
          {/* card 6 */}
          <Samplecard
            picture={Picture1}
            title="Inter School Competition"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
          voluptatibus reprehenderit, voluptas reiciendis quae maiores libero
          nesciunt quisquam ipsum perferendis facere aliquid, culpa quia!
          Molestias voluptas eum eos tempore nesciunt"
          />
        </Slider>
      </div>
    </div>
  );
}

export default Card;
