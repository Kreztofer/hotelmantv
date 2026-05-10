import { IoIosArrowDropright } from "react-icons/io";

import Container from "./Container";
import { heroIcons, images } from "../constants";
import Image from "next/image";
import Button from "./Button";

const Hero = () => {
  return (
    <Container>
      <div className="flex mt-24 w-full items-center  justify-between">
        <div className="w-[48%] flex flex-col gap-5">
          <p className="font-medium text-[40px] leading-[1.1]">
            Reinvent the <br /> In-Room Experience
          </p>
          <p className="text-gray-400 text-[18px] ">
            Hotelman TV is a smart hospitality platform that turns in-room TVs
            into an interactive concierge connecting guests to everything your
            hotel offers.
          </p>
          <div className="flex gap-6">
            <Button>Get Started</Button>
            <Button variant="outline">
              <div className="flex items-center">
                <IoIosArrowDropright
                  size={18}
                  className="mr-2 text-[#3CCFE8] animate-pulse"
                />
                About Hotelman
              </div>
            </Button>
          </div>
          <div className="flex justify-between mt-6">
            {heroIcons.map((item) => (
              <div className="flex flex-row gap-3" key={item.id}>
                <div className="border border-gray-400 p-3 rounded-full flex items-center justify-center mb-1">
                  <item.icon size={20} className="text-gray-400" />
                </div>

                <p className="text-gray-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[52%] relative">
          <div
            className="pointer-events-none absolute top-20 right-18 
    h-65 w-125
    bg-linear-to-br from-[#7FAEBB]  to-[#2abde6] 
    blur-[70px] opacity-90 z-0"
          />

          <Image
            className="w-full relative z-10"
            src={images.bg4}
            width={2000}
            height={2000}
            alt="bg"
          />
        </div>
      </div>
      <div className="bg-gray-400 w-full h-px opacity-30 mt-30" />
    </Container>
  );
};

export default Hero;
