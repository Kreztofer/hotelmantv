import { FaRegCircleCheck } from "react-icons/fa6";

interface CardProps {
  id: string;
  title: string;
  description: string;
  values: string[];
}
const Card = ({ title, description, values }: CardProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className=" text-[#3CCFE8] text-[14px]">{title}</h2>

      <p className="text-2xl font-semibold">{description}</p>
      <div className="mt-5 space-y-4">
        {values.map((value, index) => (
          <div key={index} className="flex items-start gap-3">
            <FaRegCircleCheck className="text-[#3CCFE8] mt-1 shrink-0" />

            <p className="text-white text-[14px]">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
