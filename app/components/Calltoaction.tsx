"use client";
import Image from "next/image";
import Container from "./Container";
import { images } from "../constants";
import Button from "./Button";

const Calltoaction = () => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const link = document.createElement("a");
    link.href = "/hotelmantv.apk";
    link.download = "hotelmantv.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Container>
      <div className="mt-10 justify-between h-30 px-4 border border-[#212B30] items-center flex rounded-[20px]  bg-linear-to-r from-[#0D1523] via-[#0D1523] via-60% to-[#1C5970]">
        <div className="flex items-center gap-5">
          <div className="flex bg-[#070d15] pr-0.5 justify-center w-18 h-18 items-center  border border-[#212B30] rounded-full">
            <Image src={images.icon} width={40} height={40} alt="logo" />
          </div>

          <div>
            <p className="text-[20px] font-semibold">
              Ready to transform your guest experience?
            </p>
            <p className="text-gray-400 ">
              let's create unforgettable stays, together.
            </p>
          </div>
        </div>
        <div className="flex gap-4 mr-2">
          <Button onClick={handleClick}>Get Started</Button>
          <Button
            onClick={() => {
              window.open(
                "https://digiwarelimited.com",
                "_blank",
                "noopener,noreferrer",
              );
            }}
            variant="outline"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Calltoaction;
