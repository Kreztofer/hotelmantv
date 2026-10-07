'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import { FaPlus } from 'react-icons/fa6';
import Nodirectories from './components/Nodirectories';
import Modal from './components/Modal';
import { toast } from 'react-toastify';
import DirectoriesForm from './components/DirectoriesForm';
import { DirectoryData } from '@/app/models';
import AllDirectories from './components/AllDirectories';
import EditDirectories from './components/EditDirectories';

const STORAGE_KEY = 'variis-xv-driver';

const emptyDirectory: DirectoryData = {
  id: '',
  name: '',
  phoneNumber: '',
  visibility: 'Visible',
  description: '',
  icon: '',
};

const Directory = () => {
  const [showModal, setShowModal] = useState(false);

  const [directoriesData, setDirectoriesData] =
    useState<DirectoryData>(emptyDirectory);

  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const [directories, setDirectories] = useState<DirectoryData[]>([]);

  const [selectedDirectoryId, setSelectedDirectoryId] = useState<string | null>(
    null,
  );

  /*
   * Prevent the save-to-localStorage effect from running
   * before we have finished loading the existing data.
   */
  const hasLoadedStorage = useRef(false);

  /*
   * Load existing data from localStorage after the initial
   * render.
   *
   * setTimeout ensures the state updates do not happen
   * synchronously inside the effect, which satisfies the
   * new React set-state-in-effect rule.
   */
  useEffect(() => {
    const initializeFromStorage = () => {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        try {
          const parsed = JSON.parse(saved);

          const savedDirectories = parsed.directories ?? [];

          setDirectories(savedDirectories);
          setLastSaved(parsed.lastSaved ?? null);

          /*
           * Select the first directory when loading existing
           * data and nothing has been selected yet.
           */
          if (savedDirectories.length > 0) {
            setSelectedDirectoryId(savedDirectories[0].id);
          }
        } catch {
          console.error('Failed to load directories from localStorage.');
        }
      }

      hasLoadedStorage.current = true;
    };

    const timeoutId = window.setTimeout(initializeFromStorage, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  /*
   * Keep localStorage synchronized with React state.
   *
   * This effect is appropriate because localStorage is an
   * external system.
   */
  useEffect(() => {
    if (!hasLoadedStorage.current) {
      return;
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        directories,
        lastSaved,
      }),
    );
  }, [directories, lastSaved]);

  /*
   * If no directory is explicitly selected, fall back to
   * the first available directory.
   *
   * This replaces the old effect that called
   * setSelectedDirectoryId().
   */
  const effectiveSelectedDirectoryId =
    selectedDirectoryId ?? directories[0]?.id ?? null;

  const selectedDirectory =
    directories.find(
      (directory) => directory.id === effectiveSelectedDirectoryId,
    ) ?? null;

  const updateDirectories = (updatedDirectories: DirectoryData[]) => {
    const formattedTime = new Date().toLocaleString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    setDirectories(updatedDirectories);
    setLastSaved(formattedTime);
  };

  const handleSave = () => {
    const newDirectory: DirectoryData = {
      ...directoriesData,
      id: crypto.randomUUID(),
    };

    updateDirectories([...directories, newDirectory]);

    /*
     * Select the newly created directory immediately.
     */
    setSelectedDirectoryId(newDirectory.id);

    /*
     * Reset the form.
     */
    setDirectoriesData(emptyDirectory);

    /*
     * Close the modal.
     */
    setShowModal(false);

    toast.success('Directory created successfully!');
  };

  const handleCancel = () => {
    setDirectoriesData(emptyDirectory);
    setShowModal(false);
  };

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

          <p className="text-gray-600">Last saved: {lastSaved ?? 'Never'}</p>
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
                selectedDirectoryId={effectiveSelectedDirectoryId}
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
