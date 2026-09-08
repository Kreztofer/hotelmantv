"use client";

import TextFieldWithCounter from "../../TextFieldWithCouner";
import VisibilityDropdown from "./VisibilityDropdown";
import HeroImageUploader from "../../HeroImageUploader";
import { FacilityFormProps } from "@/app/models";
import Button from "../../Button";

const FacilityForm = ({
  facilityData,
  setFacilityData,
  onSave,
  onDelete,
  onCancel,
}: FacilityFormProps) => {
  const isFormValid =
    facilityData.name.trim() !== "" &&
    facilityData.description.trim() !== "" &&
    facilityData.images.length > 0;
  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="text-[16px] font-bold">Facility Information</p>
      <div className="grid grid-cols-2 gap-5 w-full">
        <TextFieldWithCounter
          label="Facility Name"
          required
          placeholder="Enter facility name"
          maxLength={50}
          value={facilityData.name}
          onChange={(e) =>
            setFacilityData((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />
        <VisibilityDropdown
          label="Visibility"
          value={facilityData.visibility}
          onChange={(value) =>
            setFacilityData((prev) => ({
              ...prev,
              visibility: value,
            }))
          }
        />
      </div>
      <TextFieldWithCounter
        label="Facility Description"
        value={facilityData.description}
        onChange={(e) =>
          setFacilityData((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
        placeholder="Enter facility description"
        required
        multiline
        maxLength={200}
      />
      <p className="text-[16px] mt-4 font-bold">Images</p>
      <p className="text-[14px] text-gray-500 ">
        Add images to showcase this facility (Max 5 images)
      </p>
      <HeroImageUploader
        images={facilityData.images}
        onChange={(images) =>
          setFacilityData((prev) => ({
            ...prev,
            images,
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

export default FacilityForm;
