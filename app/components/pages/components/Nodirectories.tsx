"use client";
import { images } from "@/app/constants";
import Image from "next/image";
import Button from "../../Button";
import { FaPlus } from "react-icons/fa6";
import Modal from "./Modal";
import { useState } from "react";
import DirectoriesForm from "./DirectoriesForm";
import { DirectoryFormProps } from "@/app/models";

const Nodirectories = ({
  directoriesData,
  setDirectoriesData,
  onCancel,
  onSave,
}: DirectoryFormProps) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div>
        <Image className="mb-5" src={images.box} alt="No directories" />
        <p className="text-center font-semibold text-[24px]">
          No directories added yet
        </p>
        <p className="text-center text-gray-500 mt-1">
          Get started by adding directories that will be shown <br /> to your
          guests on the TV app.
        </p>
        <div className="mt-6 flex justify-center">
          <Button onClick={() => setShowModal(true)} variant="blue">
            <div className="flex items-center">
              <FaPlus size={18} className="mr-2  text-white" />
              Add Directory
            </div>
          </Button>
        </div>
      </div>
      <Modal
        title="Add New Directory"
        subtitle="Add a new directory that will be shown on the TV app."
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <DirectoriesForm
          directoriesData={directoriesData}
          setDirectoriesData={setDirectoriesData}
          onSave={onSave}
          onCancel={onCancel}
        />
      </Modal>
    </>
  );
};

export default Nodirectories;
