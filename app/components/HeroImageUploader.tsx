"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import type { DragEndEvent } from "@dnd-kit/core";
import { toast } from "react-toastify";
import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

interface ImageItem {
  id: string;
  preview: string;
}

interface SortableImageProps {
  image: ImageItem;
  onRemove: (id: string) => void;
}
interface HeroImageUploaderProps {
  images: ImageItem[];
  maxImages?: number;
  onChange: (images: ImageItem[]) => void;
}

function SortableImage({ image, onRemove }: SortableImageProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: image.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative w-36 h-24 overflow-hidden rounded-lg border"
    >
      <img src={image.preview} alt="" className="h-full w-full object-cover" />

      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute bottom-1 left-1 cursor-grab rounded bg-black/50 px-2 py-1 text-xs text-white"
      >
        Drag
      </div>

      {/* Delete */}
      <button
        type="button"
        onClick={() => onRemove(image.id)}
        className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow"
      >
        ✕
      </button>
    </div>
  );
}

export default function HeroImageUploader({
  images,
  onChange,
  maxImages = 5,
}: HeroImageUploaderProps) {
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result as string);

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };
  const onDrop = async (acceptedFiles: File[]) => {
    const remainingSlots = maxImages - images.length;

    if (remainingSlots <= 0) {
      toast(`Maximum of ${maxImages} images reached.`);
      return;
    }

    const filesToAdd = acceptedFiles.slice(0, remainingSlots);

    const newImages: ImageItem[] = await Promise.all(
      filesToAdd.map(async (file) => ({
        id: crypto.randomUUID(),

        preview: await fileToBase64(file),
      })),
    );

    onChange([...images, ...newImages]);
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop,
  });

  const removeImage = (id: string) => {
    const updatedImages = images.filter((img) => img.id !== id);

    onChange(updatedImages);
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = images.findIndex((i) => i.id === active.id);
    const newIndex = images.findIndex((i) => i.id === over.id);

    onChange(arrayMove(images, oldIndex, newIndex));
  };

  return (
    <div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={images.map((img) => img.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex flex-wrap gap-4">
            {images.map((image) => (
              <SortableImage
                key={image.id}
                image={image}
                onRemove={removeImage}
              />
            ))}

            <div
              {...getRootProps()}
              className="flex h-24 w-36 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed hover:bg-gray-50"
            >
              <input {...getInputProps()} />

              <span className="text-3xl">+</span>

              <p className="text-sm text-gray-500">Add Image</p>
            </div>
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
