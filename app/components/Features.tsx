import { features } from "../constants";
import Container from "./Container";

const Features = () => {
  return (
    <Container>
      <div className="mt-10">
        <p className="text-center text-[#3CCFE8]">FEATURES</p>
        <p className="text-center text-[28px]">
          Everything your guests need, at their fingertips.
        </p>

        <div className="flex gap-3 mt-4">
          {features.map((item) => (
            <div
              key={item.id}
              className="flex-1 bg-[#14181D] p-6 rounded-lg shadow-md"
            >
              <item.icon size={24} className="text-[#3CCFE8]  mb-4" />

              <h3 className="text-[18px] font-bold mb-3">{item.title}</h3>

              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Features;
