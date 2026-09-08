"use client";

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { toast } from "react-toastify";
import Button from "../Button";
import Modal from "./components/Modal";
import FacilityForm from "./components/FacilityForm";
import Allfacilities from "./components/Allfacilities";
import Editfacilities from "./components/Editfacilities";
import Nofacility from "./components/Nofacility";

import { FacilityData } from "@/app/models";

const STORAGE_KEY = "variis-xv-racecar";

const emptyFacility: FacilityData = {
  id: "",
  name: "",
  visibility: "Visible",
  description: "",
  images: [],
};

const Facilities = () => {
  const [showModal, setShowModal] = useState(false);
  const [facilityData, setFacilityData] = useState<FacilityData>(emptyFacility);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [facilities, setFacilities] = useState<FacilityData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(
    null,
  );

  // Load facilities once

  const updateFacilities = (updatedFacilities: FacilityData[]) => {
    const formattedTime = new Date().toLocaleString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    setFacilities(updatedFacilities);
    setLastSaved(formattedTime);
  };

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const parsed = JSON.parse(saved);

      setFacilities(parsed.facilities ?? []);
      setLastSaved(parsed.lastSaved ?? null);

      if (parsed.facilities?.length > 0) {
        setSelectedFacilityId(parsed.facilities[0].id);
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        facilities,
        lastSaved,
      }),
    );
  }, [facilities, lastSaved, isLoaded]);

  useEffect(() => {
    if (facilities.length > 0 && !selectedFacilityId) {
      setSelectedFacilityId(facilities[0].id);
    }
  }, [facilities, selectedFacilityId]);

  const handleSave = () => {
    const newFacility: FacilityData = {
      ...facilityData,
      id: crypto.randomUUID(),
    };

    updateFacilities([...facilities, newFacility]);

    setSelectedFacilityId(newFacility.id);
    setFacilityData(emptyFacility);
    setShowModal(false);

    toast.success("Facility created successfully!");
  };

  const handleCancel = () => {
    setFacilityData(emptyFacility);
    setShowModal(false);
  };

  const selectedFacility =
    facilities.find((facility) => facility.id === selectedFacilityId) ?? null;

  return (
    <>
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[20px] font-bold">Facilities Editor</p>

            <p className="text-[15px] text-gray-500">
              Manage hotel facilities shown on the TV app.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="flex">
              <Button variant="outlineBlue" onClick={() => setShowModal(true)}>
                <div className="flex items-center">
                  <FaPlus size={18} className="mr-2 text-primary" />
                  Add Facility
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mt-4 flex items-center justify-end gap-4 text-[12px]">
          <p className="rounded-sm bg-gray-200 px-2 py-1 text-gray-600">
            Draft
          </p>

          <p className="text-gray-600"> Last saved: {lastSaved ?? "Never"}</p>
        </div>

        {/* Content */}
        <div className="mt-8">
          {facilities.length === 0 ? (
            <Nofacility
              facilityData={facilityData}
              setFacilityData={setFacilityData}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <div className="flex gap-4">
              <Allfacilities
                facilities={facilities}
                updateFacilities={updateFacilities}
                selectedFacilityId={selectedFacilityId}
                setSelectedFacilityId={setSelectedFacilityId}
              />

              <Editfacilities
                facility={selectedFacility}
                facilities={facilities}
                updateFacilities={updateFacilities}
              />
            </div>
          )}
        </div>
      </div>

      {/* Add Facility */}
      <Modal
        isOpen={showModal}
        onClose={handleCancel}
        title="Add New Facility"
        subtitle="Add a new facility that will be shown on the TV app."
      >
        <FacilityForm
          facilityData={facilityData}
          setFacilityData={setFacilityData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Modal>
    </>
  );
};

export default Facilities;
