import { EventsData } from '@/app/models';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ConfirmationModal from './ConfirmationModal';
import EventsForm from './EventsForm';

interface EditEventsProps {
  event: EventsData | null;
  events: EventsData[];
  updateEvents: (events: EventsData[]) => void;
}

const Editevents = ({ event, events, updateEvents }: EditEventsProps) => {
  if (!event) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white">
        <p className="text-gray-500">Select an event to edit.</p>
      </div>
    );
  }
  return (
    <EventsEditor
      key={event.id}
      event={event}
      events={events}
      updateEvents={updateEvents}
    />
  );
};

interface EventsEditorProps {
  event: EventsData;
  events: EventsData[];
  updateEvents: (events: EventsData[]) => void;
}

const EventsEditor = ({ event, events, updateEvents }: EventsEditorProps) => {
  const [eventData, setEventData] = useState<EventsData>(event);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSave = () => {
    const updatedEvents = events.map((item) =>
      item.id === eventData.id ? eventData : item,
    );

    updateEvents(updatedEvents);

    toast.success('Event updated successfully!');
  };

  const handleCancel = () => {
    setEventData(event);
  };

  const handleDelete = () => {
    const updatedEvents = events.filter((item) => item.id !== eventData.id);

    updateEvents(updatedEvents);

    setShowDeleteModal(false);

    toast.success('Event deleted successfully!');
  };

  return (
    <div className="flex-1 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Edit Event</h2>

          <p className="text-sm text-gray-500">Update the selected event.</p>
        </div>
      </div>

      <EventsForm
        eventsData={eventData}
        setEventsData={setEventData}
        onSave={handleSave}
        onDelete={() => setShowDeleteModal(true)}
        onCancel={handleCancel}
      />

      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Delete Event"
        message={`Are you sure you want to delete "${eventData.name}"? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default Editevents;
