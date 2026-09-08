"use client";
import { useState } from "react";
import TextFieldWithCounter from "../../TextFieldWithCouner";
import IconPicker from "./IconPicker";
import { directoryIcons } from "@/app/constants/directoryIcons";
import Button from "../../Button";
import VisibilityDropdown from "./VisibilityDropdown";
import { DirectoryFormProps } from "@/app/models";

const DirectoriesForm = ({
  directoriesData,
  setDirectoriesData,
  onCancel,
  onDelete,
  onSave,
}: DirectoryFormProps) => {
  const isFormValid =
    directoriesData.name.trim() !== "" &&
    directoriesData.description.trim() !== "" &&
    directoriesData.icon.trim() !== "";

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center">
        <p className="text-[16px] font-bold">Directory Information</p>
        <div className="w-32.5">
          <VisibilityDropdown
            value={directoriesData.visibility}
            onChange={(value) =>
              setDirectoriesData((prev) => ({
                ...prev,
                visibility: value,
              }))
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 w-full">
        <TextFieldWithCounter
          label="Directory Name"
          required
          placeholder="Enter directory name"
          maxLength={50}
          value={directoriesData.name}
          onChange={(e) =>
            setDirectoriesData((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />
        <TextFieldWithCounter
          label="Phone Number"
          required
          placeholder="Enter number"
          maxLength={50}
          value={directoriesData.phoneNumber}
          onChange={(e) =>
            setDirectoriesData((prev) => ({
              ...prev,
              phoneNumber: e.target.value,
            }))
          }
        />
      </div>
      <TextFieldWithCounter
        label="Description"
        required
        placeholder="Enter description"
        maxLength={200}
        multiline
        value={directoriesData.description}
        onChange={(e) =>
          setDirectoriesData((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
      />
      <p className="text-[16px] mt-4 font-bold">Icons</p>
      <p className="text-[14px] text-gray-500 ">
        Add an icon to showcase this directory
      </p>
      <IconPicker
        label="Directory Icon"
        required
        icons={directoryIcons}
        value={directoriesData.icon}
        onChange={(icon) =>
          setDirectoriesData((prev) => ({
            ...prev,
            icon,
          }))
        }
      />
      <div className="mt-6 flex items-center">
        {onDelete && (
          <Button variant="outlineRed" onClick={onDelete}>
            <p className="text-rose-500">Delete</p>
          </Button>
        )}

        <div className="ml-auto flex gap-1">
          {!onDelete && (
            <Button className="mr-4" variant="outlineBlue" onClick={onCancel}>
              Cancel
            </Button>
          )}

          <Button disabled={!isFormValid} variant="blue" onClick={onSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DirectoriesForm;
