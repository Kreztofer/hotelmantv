"use client";

import { directoryIcons } from "@/app/constants/directoryIcons";
import { DirectoryData } from "@/app/models";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaGripVertical, FaEye, FaEyeSlash } from "react-icons/fa6";

interface DirectoryCardProps {
  directory: DirectoryData;
  selected: boolean;
  onClick: () => void;
}

export const truncate = (text: string, maxLength: number) =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

const DirectoryCard = ({
  directory,
  selected,
  onClick,
}: DirectoryCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: directory.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const directoryIconMap = new Map(
    directoryIcons.map((icon) => [icon.id, icon.icon]),
  );

  const Icon = directoryIconMap.get(directory.icon);
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

      {/* Icon */}
      <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-gray-100 text-primary">
        {Icon && <Icon size={20} />}
      </div>
      {/* Content */}
      <div className="w-full justify-between flex">
        <div className="W-[80%]">
          <h3 className="truncate text-[14px] font-semibold text-gray-900">
            {directory.name}
          </h3>
          <p className="text-[12px] text-gray-500">
            {truncate(directory.description, 20)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {directory.visibility === "Visible" ? (
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

export default DirectoryCard;
