import React from "react";
import google from "../assets/google.jpg";
import amazon from "../assets/Amazon-Logo.png";
import spotify from "../assets/Spotify.png";
import microsoft from "../assets/microsoft.jpg";
import rocketlane from "../assets/rocketlane.jpg";

const Comp = () => {
  return (
    <section className="flex flex-col items-center lg:flex-row lg:justify-center">
      <div className="p-8 lg:px-15 lg:py-20 flex flex-col gap-9 justify-around items-center max-w-screen-xl mx-auto lg:flex-row lg:gap-32">
        <img src={google} alt="google" className="w-40" />
        <img src={microsoft} alt="microsoft" className="w-40" />
        <img src={amazon} alt="amazon" className="w-40" />
        <img src={spotify} alt="spotify" className="w-40" />
        <img src={rocketlane} alt="rocketlane" className="w-40" />
      </div>
    </section>
  );
};

export default Comp;
