'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import { FaPlus } from 'react-icons/fa';
import Noevents from './components/Noevents';
import Modal from './components/Modal';
import EventsForm from './components/EventsForm';
import { EventsData } from '@/app/models';
import { toast } from 'react-toastify';
import Allevents from './components/Allevents';
import Editevents from './components/Editevents';

const STORAGE_KEY = 'variis-xv-steering';

export const emptyEvents: EventsData = {
  id: '',
  name: '',
  visibility: 'Visible',
  location: '',
  description: '',
  contact: '',
  highlights: [],
  date: '',
  images: [],
  availability: {
    is24Hours: true,
    startTime: '',
    endTime: '',
  },
};

const Events = () => {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState<EventsData[]>([]);
  const [eventsData, setEventsData] = useState<EventsData>(emptyEvents);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const hasLoadedStorage = useRef(false);

  useEffect(() => {
    const initializeFromStorage = () => {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        try {
          const parsed = JSON.parse(saved);

          const savedEvents = parsed.events ?? [];

          setEvents(savedEvents);
          setLastSaved(parsed.lastSaved ?? null);

          if (savedEvents.length > 0) {
            setSelectedEventId(savedEvents[0].id);
          }
        } catch {
          console.error('Failed to load events from localStorage.');
        }
      }

      hasLoadedStorage.current = true;
    };

    const timeoutId = window.setTimeout(initializeFromStorage, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!hasLoadedStorage.current) {
      return;
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        events,
        lastSaved,
      }),
    );
  }, [events, lastSaved]);

  const effectiveSelectedEventId = selectedEventId ?? events[0]?.id ?? null;

  const selectedEvent =
    events.find((event) => event.id === effectiveSelectedEventId) ?? null;

  const updateEvents = (updatedEvents: EventsData[]) => {
    const formattedTime = new Date().toLocaleString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    setEvents(updatedEvents);
    setLastSaved(formattedTime);
  };

  const handleCancel = () => {
    setEventsData(emptyEvents);
    setShowModal(false);
  };

  const handleSave = () => {
    const newEvent: EventsData = {
      ...eventsData,
      id: crypto.randomUUID(),
    };

    updateEvents([...events, newEvent]);

    /*
     * Select the newly created facility.
     */
    setSelectedEventId(newEvent.id);

    /*
     * Reset the form.
     */
    setEventsData(emptyEvents);

    /*
     * Close the modal.
     */
    setShowModal(false);

    toast.success('Facility created successfully!');
  };

  return (
    <>
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[20px] font-bold">Events Editor</p>

            <p className="text-[15px] text-gray-500">
              Manage hotel events shown on the TV app.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="flex">
              <Button variant="outlineBlue" onClick={() => setShowModal(true)}>
                <div className="flex items-center">
                  <FaPlus size={18} className="mr-2 text-primary" />
                  Add Events
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

          <p className="text-gray-600"> Last saved: {lastSaved ?? 'Never'}</p>
        </div>

        {/* Content */}
        <div className="mt-8">
          {events.length === 0 ? (
            <Noevents
              eventsData={eventsData}
              setEventsData={setEventsData}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <div className="flex gap-4">
              <Allevents
                events={events}
                updateEvents={updateEvents}
                selectedEventId={effectiveSelectedEventId}
                setSelectedEventId={setSelectedEventId}
              />
              <Editevents
                event={selectedEvent}
                events={events}
                updateEvents={updateEvents}
              />
            </div>
          )}
        </div>
      </div>

      {/* Add Event */}
      <Modal
        isOpen={showModal}
        onClose={handleCancel}
        title="Add New Event"
        subtitle="Add a new event that will be shown on the TV app."
      >
        <EventsForm
          eventsData={eventsData}
          setEventsData={setEventsData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Modal>
    </>
  );
};

export default Events;
