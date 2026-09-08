"use client";
import { DirectoryData } from "@/app/models";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DirectoriesForm from "./DirectoriesForm";
import ConfirmationModal from "./ConfirmationModal";

interface EditDirectoriesProps {
  directory: DirectoryData | null;
  directories: DirectoryData[];
  updateDirectories: (directories: DirectoryData[]) => void;
}

const EditDirectories = ({
  directory,
  directories,
  updateDirectories,
}: EditDirectoriesProps) => {
  // Show empty state if nothing is selected
  if (!directory) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white">
        <p className="text-gray-500">Select a directory to edit.</p>
      </div>
    );
  }

  const [directoryData, setDirectoryData] = useState<DirectoryData>(directory);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    setDirectoryData(directory);
  }, [directory]);

  const handleSave = () => {
    const updatedDirectories = directories.map((item) =>
      item.id === directoryData.id ? directoryData : item,
    );

    updateDirectories(updatedDirectories);

    toast.success("Directory updated successfully!");
  };

  const handleCancel = () => {
    setDirectoryData(directory);
  };

  const handleDelete = () => {
    const updatedDirectories = directories.filter(
      (item) => item.id !== directoryData.id,
    );

    updateDirectories(updatedDirectories);

    setShowDeleteModal(false);

    toast.success("Directory deleted successfully!");
  };

  return (
    <div className="flex-1  shadow-sm rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Edit Directory</h2>

          <p className="text-sm text-gray-500">
            Update the selected directory.
          </p>
        </div>
      </div>
      <DirectoriesForm
        directoriesData={directoryData}
        setDirectoriesData={setDirectoryData}
        onSave={handleSave}
        onDelete={() => setShowDeleteModal(true)}
        onCancel={handleCancel}
      />
      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Delete Directory"
        message={`Are you sure you want to delete "${directoryData.name}"? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default EditDirectories;
