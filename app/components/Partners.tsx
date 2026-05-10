import React from "react";
import Container from "./Container";
import { partners, tvs } from "../constants";
import Image from "next/image";

const Partners = () => {
  return (
    <Container>
      <div className="flex mt-6 gap-10 flex-row w-full justify-between">
        <div className="w-[65%] mt-4">
          <p className="text-center text-[#3CCFE8]">
            TRUSTED BY LEADING HOTELS
          </p>
          <div className="flex  w-full justify-between flex-row">
            {partners.map((partner, index) => (
              <div
                key={partner.id}
                className={`flex items-center justify-center ${
                  index === partners.length - 2 ? "mt-4" : ""
                }`}
              >
                <Image
                  src={partner.image}
                  alt={`Partner ${partner.id}`}
                  className={
                    index === partners.length - 1
                      ? "w-19.5 h-auto"
                      : "w-35 h-auto"
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-[35%] py-4 px-8 bg-[#14181D] border rounded-[20px] border-[#1A1F24] ">
          <p>Seamless Integrations</p>
          <p className="text-gray-400 mt-2 text-[14px]">
            Works seamlessly with industry-leading <br /> Android and Google TV
            solutions
          </p>

          <div className="flex gap-4">
            {tvs.map((tv) => (
              <div
                key={tv.id}
                className="flex w-14 h-14 justify-center items-center shadow-2xl rounded-full bg-[#11181d] gap-4 mt-2"
              >
                <Image
                  src={tv.image}
                  alt={`TV ${tv.id}`}
                  className="w-12 h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Partners;
