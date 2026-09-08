"use client";

import { FacilityData } from "@/app/models";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaGripVertical, FaEye, FaEyeSlash } from "react-icons/fa6";
import { truncate } from "./DirectoryCard";

interface FacilityCardProps {
  facility: FacilityData;
  selected: boolean;
  onClick: () => void;
}

const FacilityCard = ({ facility, selected, onClick }: FacilityCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: facility.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const image = facility.images.length > 0 ? facility.images[0].preview : "";

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-4 rounded-xl border bg-white p-4 transition-all duration-200 ${
        selected
          ? "border-primary shadow-md"
          : "border-gray-200 hover:border-primary/40 hover:shadow-sm"
      }`}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
        className="cursor-grab text-gray-400 active:cursor-grabbing"
      >
        <FaGripVertical size={18} />
      </div>

      {/* Thumbnail */}
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
        {image ? (
          <img
            src={image}
            alt={facility.name}
            className="h-full w-full object-cover"
            onLoad={() => console.log("loaded", image)}
            onError={() => console.log("failed", image)}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="w-full justify-between flex">
        <div className="W-[80%]">
          <h3 className="truncate text-[14px] font-semibold text-gray-900">
            {facility.name}
          </h3>
          <p className="text-[12px] text-gray-500">
            {truncate(facility.description, 20)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {facility.visibility === "Visible" ? (
            <>
              <span className="text-xs font-medium bg-green-100 py-1 px-2 rounded-xs text-green-600">
                Visible
              </span>
            </>
          ) : (
            <>
              <span className="text-xs font-medium py-1 px-2 rounded-xs bg-gray-100 text-gray-500">
                Hidden
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacilityCard;
