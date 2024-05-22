import React, { useState, useEffect } from "react";
import newsletterData from "../assets/newsLetter.json";
import { sliderSettings } from "../assets/comman2";

const NsHome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVisibleIndex((prevIndex) =>
        prevIndex === newsletterData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setCurrentIndex(visibleIndex);
  }, [visibleIndex]);

  return (
    <section className="bg-white ">
      <div className="p-8 lg:px-20 lg:py-20">
        <div className="flex flex-col items-start mb-10">
          <span className="text-blue text-2xl font-bold">
            Latest Newsletters
          </span>
        </div>

        <div className="w-3/4 mx-auto relative">
          {newsletterData.map((newsletter, index) => (
            <NewsletterTile
              key={index}
              newsletter={newsletter}
              visible={index === visibleIndex}
            />
          ))}
        </div>
      </div>

      <div className="h-80"></div>
    </section>
  );
};

const NewsletterTile = ({ newsletter, visible }) => {
  return (
    <div
      className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="p-20 rounded-lg shadow-lg border-2 border-gray-200">
        <div className="flex flex-col h-full justify-center items-center gap-4">
          <span className="text-3xl text-blue font-bold text-center">
            {newsletter.title}
          </span>
          <p className="text-lg text-center">{newsletter.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NsHome;
