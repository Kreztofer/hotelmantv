"use client";
import { GoArrowUpRight } from "react-icons/go";
import Container from "./Container";
import Button from "./Button";
import HotelCarousel from "./HotelCarousel";

const Demo = () => {
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
      <div className="mt-10 py-10 border rounded-[20px] border-[#1A1F24] px-8 flex flex-row justify-between">
        <div className="flex  w-[30%] flex-col gap-3">
          <h2 className=" text-[#3CCFE8] text-[14px]">INTERACTIVE DEMO</h2>

          <p className="text-3xl font-semibold">
            See Hotelman TV <br /> in action
          </p>
          <p className="text-gray-400">
            Explore the intuitive interface designed <br /> to make every stay
            effortless
          </p>
          <div className="mt-4">
            <Button onClick={handleClick}>
              <div className="flex  gap-2 items-center">
                Get Now
                <GoArrowUpRight size={18} className=" animate-pulse" />
              </div>
            </Button>
          </div>
        </div>
        <div className="w-[70%]">
          <HotelCarousel />
        </div>
      </div>
    </Container>
  );
};

export default Demo;
