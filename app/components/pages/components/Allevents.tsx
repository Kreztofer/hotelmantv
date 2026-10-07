import { EventsData } from '@/app/models';

import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import EventsCard from './EventsCard';

interface Props {
  events: EventsData[];
  updateEvents: (events: EventsData[]) => void;
  selectedEventId: string | null;
  setSelectedEventId: React.Dispatch<React.SetStateAction<string | null>>;
}

const Allevents = ({
  events,
  updateEvents,
  selectedEventId,
  setSelectedEventId,
}: Props) => {
  const handleDragEnd = (eventt: DragEndEvent) => {
    const { active, over } = eventt;

    if (!over || active.id === over.id) return;

    const oldIndex = events.findIndex((event) => event.id === active.id);

    const newIndex = events.findIndex((event) => event.id === over.id);

    updateEvents(arrayMove(events, oldIndex, newIndex));
  };

  return (
    <div className="w-[45%] rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-5 flex w-full items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Events</h2>

          <p className="text-sm text-gray-500">Drag to reorder events</p>
        </div>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={events.map((event) => event.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {events.map((event) => (
              <EventsCard
                key={event.id}
                event={event}
                selected={selectedEventId === event.id}
                onClick={() => setSelectedEventId(event.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Allevents;
