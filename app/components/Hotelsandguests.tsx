import Image from "next/image";
import { forguests, forhotels, images } from "../constants";
import Card from "./Card";
import Container from "./Container";

const Hotelsandguests = () => {
  return (
    <Container>
      <div className="mt-10 bg-[#14181D] border rounded-[20px] border-[#1A1F24] px-8 flex flex-row justify-between">
        <div className="w-[18%] mt-12">
          {forhotels.map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </div>
        <div className="w-[54%]">
          <Image
            className="w-full relative z-10"
            src={images.room}
            width={2000}
            height={2000}
            alt="bg"
          />
        </div>

        <div className="w-[20%] mt-12">
          {forguests.map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Hotelsandguests;
