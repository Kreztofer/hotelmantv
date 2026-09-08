"use client";

import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { DirectoryData } from "@/app/models";
import DirectoryCard from "./DirectoryCard";

interface Props {
  directories: DirectoryData[];
  updateDirectories: (directories: DirectoryData[]) => void;
  selectedDirectoryId: string | null;
  setSelectedDirectoryId: React.Dispatch<React.SetStateAction<string | null>>;
}
const AllDirectories = ({
  directories,
  updateDirectories,
  selectedDirectoryId,
  setSelectedDirectoryId,
}: Props) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = directories.findIndex(
      (directory) => directory.id === active.id,
    );

    const newIndex = directories.findIndex(
      (directory) => directory.id === over.id,
    );

    updateDirectories(arrayMove(directories, oldIndex, newIndex));
  };

  return (
    <div className="w-[45%] rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-5 flex w-full items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Directories</h2>

          <p className="text-sm text-gray-500">Drag to reorder directories</p>
        </div>
      </div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={directories.map((directory) => directory.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {directories.map((directory) => (
              <DirectoryCard
                key={directory.id}
                directory={directory}
                selected={selectedDirectoryId === directory.id}
                onClick={() => setSelectedDirectoryId(directory.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default AllDirectories;
