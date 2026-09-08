"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FacilityForm from "./FacilityForm";
import { FacilityData } from "@/app/models";
import ConfirmationModal from "./ConfirmationModal";

interface EditFacilitiesProps {
  facility: FacilityData | null;
  facilities: FacilityData[];
  updateFacilities: (facilities: FacilityData[]) => void;
}

const Editfacilities = ({
  facility,
  facilities,
  updateFacilities,
}: EditFacilitiesProps) => {
  // Show empty state if nothing is selected
  if (!facility) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white">
        <p className="text-gray-500">Select a facility to edit.</p>
      </div>
    );
  }

  const [facilityData, setFacilityData] = useState<FacilityData>(facility);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    setFacilityData(facility);
  }, [facility]);

  const handleSave = () => {
    const updatedFacilities = facilities.map((item) =>
      item.id === facilityData.id ? facilityData : item,
    );

    updateFacilities(updatedFacilities);

    toast.success("Facility updated successfully!");
  };

  const handleCancel = () => {
    setFacilityData(facility);
  };

  const handleDelete = () => {
    const updatedFacilities = facilities.filter(
      (item) => item.id !== facilityData.id,
    );

    updateFacilities(updatedFacilities);

    setShowDeleteModal(false);

    toast.success("Facility deleted successfully!");
  };

  return (
    <div className="flex-1  shadow-sm rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Edit Facility</h2>

          <p className="text-sm text-gray-500">Update the selected facility.</p>
        </div>
      </div>

      <FacilityForm
        facilityData={facilityData}
        setFacilityData={setFacilityData}
        onSave={handleSave}
        onDelete={() => setShowDeleteModal(true)}
        onCancel={handleCancel}
      />
      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Delete Facility"
        message={`Are you sure you want to delete "${facilityData.name}"? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default Editfacilities;
