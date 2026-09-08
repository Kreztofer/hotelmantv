"use client";
import { useState, useEffect } from "react";
import Button from "../Button";
import { FaPlus } from "react-icons/fa6";
import Nodirectories from "./components/Nodirectories";
import Modal from "./components/Modal";
import { toast } from "react-toastify";
import DirectoriesForm from "./components/DirectoriesForm";
import { DirectoryData } from "@/app/models";
import AllDirectories from "./components/AllDirectories";
import EditDirectories from "./components/EditDirectories";

const STORAGE_KEY = "variis-xv-driver";

const emptyDirectory: DirectoryData = {
  id: "",
  name: "",
  phoneNumber: "",
  visibility: "Visible",
  description: "",
  icon: "",
};

const Directory = () => {
  const [showModal, setShowModal] = useState(false);
  const [directoriesData, setDirectoriesData] =
    useState<DirectoryData>(emptyDirectory);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [directories, setDirectories] = useState<DirectoryData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedDirectoryId, setSelectedDirectoryId] = useState<string | null>(
    null,
  );

  const updateDirectories = (updatedDirectories: DirectoryData[]) => {
    const formattedTime = new Date().toLocaleString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    setDirectories(updatedDirectories);
    setLastSaved(formattedTime);
  };

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const parsed = JSON.parse(saved);

      setDirectories(parsed.directories ?? []);
      setLastSaved(parsed.lastSaved ?? null);

      if (parsed.directories?.length > 0) {
        setSelectedDirectoryId(parsed.directories[0].id);
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        directories,
        lastSaved,
      }),
    );
  }, [directories, lastSaved, isLoaded]);

  useEffect(() => {
    if (directories.length > 0 && !selectedDirectoryId) {
      setSelectedDirectoryId(directories[0].id);
    }
  }, [directories, selectedDirectoryId]);

  const handleSave = () => {
    const newDirectory: DirectoryData = {
      ...directoriesData,
      id: crypto.randomUUID(),
    };

    updateDirectories([...directories, newDirectory]);

    setSelectedDirectoryId(newDirectory.id);
    setDirectoriesData(emptyDirectory);
    setShowModal(false);

    toast.success("Directory created successfully!");
  };

  const handleCancel = () => {
    setDirectoriesData(emptyDirectory);
    setShowModal(false);
  };

  const selectedDirectory =
    directories.find((directory) => directory.id === selectedDirectoryId) ??
    null;

  return (
    <>
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[20px] font-bold">Directories Editor</p>

            <p className="text-[15px] text-gray-500">
              Manage hotel contacts displayed in the directory.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="flex">
              <Button variant="outlineBlue" onClick={() => setShowModal(true)}>
                <div className="flex items-center">
                  <FaPlus size={18} className="mr-2 text-primary" />
                  Add Directory
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
          {directories.length === 0 ? (
            <Nodirectories
              directoriesData={directoriesData}
              setDirectoriesData={setDirectoriesData}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <div className="flex gap-4">
              <AllDirectories
                directories={directories}
                updateDirectories={updateDirectories}
                selectedDirectoryId={selectedDirectoryId}
                setSelectedDirectoryId={setSelectedDirectoryId}
              />
              <EditDirectories
                directory={selectedDirectory}
                directories={directories}
                updateDirectories={updateDirectories}
              />
            </div>
          )}
        </div>
      </div>

      {/* Add Directory */}
      <Modal
        isOpen={showModal}
        onClose={handleCancel}
        title="Add New Facility"
        subtitle="Add a new facility that will be shown on the TV app."
      >
        <DirectoriesForm
          directoriesData={directoriesData}
          setDirectoriesData={setDirectoriesData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Modal>
    </>
  );
};

export default Directory;
