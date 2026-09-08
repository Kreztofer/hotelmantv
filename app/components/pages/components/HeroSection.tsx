import React from "react";
import { TVData } from "@/app/models";
import HeroImageUploader from "../../HeroImageUploader";
import TextFieldWithCounter from "../../TextFieldWithCouner";
import { guestInfo } from "@/app/constants";

interface HeroSectionProps {
  tvData: TVData;
  setTvData: React.Dispatch<React.SetStateAction<TVData>>;
}
const HeroSection = ({ tvData, setTvData }: HeroSectionProps) => {
  const toggleGuestInfo = (id: string) => {
    setTvData((prev) => ({
      ...prev,
      guestInfo: prev.guestInfo.includes(id)
        ? prev.guestInfo.filter((item) => item !== id)
        : [...prev.guestInfo, id],
    }));
  };
  return (
    <div className="border flex flex-col gap-3 border-gray-200 shadow-lg p-4 rounded-md w-[47%]">
      <div>
        <p className="font-bold">Hero Section</p>
        <p className="text-[14px] text-gray-500">
          This is the main banner area at the top of the TV app.
        </p>
      </div>

      <p className="text-[14px] font-bold">
        Background Images{" "}
        <span className="text-gray-500 font-normal">(Drag to reorder)</span>
      </p>
      <HeroImageUploader
        images={tvData.images}
        onChange={(images) =>
          setTvData((prev) => ({
            ...prev,
            images,
          }))
        }
      />

      <TextFieldWithCounter
        label="Welcome Message"
        value={tvData.message}
        onChange={(e) =>
          setTvData((prev) => ({
            ...prev,
            message: e.target.value,
          }))
        }
        multiline
        maxLength={100}
      />
      <div className="space-y-3">
        <div>
          <h3 className="font-bold text-[14px]">Guest Information</h3>

          <p className="text-[14px] text-gray-500">
            Select what guest information appears on the TV.
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">
          {guestInfo.map(({ id, title, icon: Icon }) => {
            const selected = tvData.guestInfo.includes(id);

            return (
              <button
                key={id}
                type="button"
                onClick={() => toggleGuestInfo(id)}
                className={`flex items-center gap-2 rounded-lg border px-2 py-3 transition
          ${
            selected
              ? "border-[#38adec] bg-[#38adec]/10 text-[#38adec]"
              : "border-gray-300 hover:border-[#38adec]"
          }`}
              >
                <Icon size={18} />

                <span className="text-[12px]">{title}</span>

                <div
                  className={`ml-2 flex text-[12px] h-5 w-5 items-center justify-center rounded-full
            ${selected ? "bg-[#38adec] text-white" : "border border-gray-300"}`}
                >
                  {selected && "✓"}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
