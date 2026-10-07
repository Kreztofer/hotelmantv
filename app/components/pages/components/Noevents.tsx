'use client';

import { images } from '@/app/constants';
import Image from 'next/image';
import Button from '../../Button';
import { FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import { EventsProps } from '@/app/models';
import Modal from './Modal';
import EventsForm from './EventsForm';

const Noevents = ({
  eventsData,
  setEventsData,
  onSave,
  onCancel,
}: EventsProps) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div>
        <Image className="mb-5" src={images.box} alt="No Events" />
        <p className="text-center font-semibold text-[24px]">
          No Events added yet
        </p>
        <p className="text-center text-gray-500 mt-1">
          Get started by adding events that will be shown <br /> to your guests
          on the TV app.
        </p>
        <div className="mt-6 flex justify-center">
          <Button onClick={() => setShowModal(true)} variant="blue">
            <div className="flex items-center">
              <FaPlus size={18} className="mr-2  text-white" />
              Add Events
            </div>
          </Button>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add New Event"
        subtitle="Add a new event that will be shown on the TV app."
      >
        <EventsForm
          eventsData={eventsData}
          setEventsData={setEventsData}
          onSave={onSave}
          onCancel={onCancel}
        />
      </Modal>
    </>
  );
};

export default Noevents;
