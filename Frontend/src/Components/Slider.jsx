import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import data from "../assets/slider.json";
import { sliderSettings } from "../assets/common";

const Slider = () => {
  return (
    <section className="bg-white text-blue">
      <div className="p-8 lg:px-20 lg:py-20">
        <div className="flex flex-col items-start mb-8">
          <span className="text-blue text-2xl font-bold">
            Best Career Paths
          </span>
          <span className="text-[#001a36] text-4xl font-bold mb-4">
            Popular Companies
          </span>
        </div>

        <Swiper {...sliderSettings}>
          <SliderButtons />
          {data.map((card, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col items-start gap-2 p-4 rounded-lg transition duration-300 ease-in hover:scale-105 shadow-md hover:border-2 border-blue h-96">
                <img
                  src={card.image}
                  alt={card.company}
                  className="w-full h-60 object-cover rounded-lg"
                />
                <span className="text-xl font-bold text-orange">
                  {card.salary}
                </span>
                <span className="text-lg font-semibold">{card.company}</span>
                <span className="text-sm">{card.position}</span>
                <span className="text-sm">{card.location}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Slider;

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="flex gap-2 mt-4 mb-4 justify-center">
      <button
        onClick={() => swiper.slidePrev()}
        className="text-blue px-4 py-2 rounded-md shadow-md"
      >
        {"<"}
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className="text-blue px-4 py-2 rounded-md shadow-md"
      >
        {">"}
      </button>
    </div>
  );
};
