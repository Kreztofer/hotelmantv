"use client";
import { images } from "@/app/constants";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";

import Button from "../../Button";
import Modal from "./Modal";
import FacilityForm from "./FacilityForm";
import { useState } from "react";
import { FacilityFormProps } from "@/app/models";

const Nofacility = ({
  facilityData,
  setFacilityData,
  onSave,
  onCancel,
}: FacilityFormProps) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div>
        <Image className="mb-5" src={images.box} alt="No Facilities" />
        <p className="text-center font-semibold text-[24px]">
          No Facilities added yet
        </p>
        <p className="text-center text-gray-500 mt-1">
          Get started by adding facilities that will be shown <br /> to your
          guests on the TV app.
        </p>
        <div className="mt-6 flex justify-center">
          <Button onClick={() => setShowModal(true)} variant="blue">
            <div className="flex items-center">
              <FaPlus size={18} className="mr-2  text-white" />
              Add Facility
            </div>
          </Button>
        </div>
      </div>
      <Modal
        title="Add New Facility"
        subtitle="Add a new facility that will be shown on the TV app."
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <FacilityForm
          facilityData={facilityData}
          setFacilityData={setFacilityData}
          onSave={onSave}
          onCancel={onCancel}
        />
      </Modal>
    </>
  );
};

export default Nofacility;
