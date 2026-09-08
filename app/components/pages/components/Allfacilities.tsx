"use client";

import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { FacilityData } from "@/app/models";
import FacilityCard from "./FacilityCard";

interface Props {
  facilities: FacilityData[];
  updateFacilities: (facilities: FacilityData[]) => void;
  selectedFacilityId: string | null;

  setSelectedFacilityId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Allfacilities({
  facilities,
  updateFacilities,
  selectedFacilityId,
  setSelectedFacilityId,
}: Props) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = facilities.findIndex(
      (facility) => facility.id === active.id,
    );

    const newIndex = facilities.findIndex(
      (facility) => facility.id === over.id,
    );

    updateFacilities(arrayMove(facilities, oldIndex, newIndex));
  };

  return (
    <div className="w-[45%] rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-5 flex w-full items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Facilities</h2>

          <p className="text-sm text-gray-500">Drag to reorder facilities</p>
        </div>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={facilities.map((facility) => facility.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {facilities.map((facility) => (
              <FacilityCard
                key={facility.id}
                facility={facility}
                selected={selectedFacilityId === facility.id}
                onClick={() => setSelectedFacilityId(facility.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
