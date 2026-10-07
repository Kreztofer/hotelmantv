import { EventsProps } from '@/app/models';
import TextFieldWithCounter from '../../TextFieldWithCouner';
import VisibilityDropdown from './VisibilityDropdown';
import DateSelector from './DateSelector';
import AvailabilitySelector from './AvailabilitySelector';
import HighlightsInput from './HighlightsInput';
import HeroImageUploader from '../../HeroImageUploader';
import Button from '../../Button';

const EventsForm = ({
  eventsData,
  setEventsData,
  onCancel,
  onSave,
  onDelete,
}: EventsProps) => {
  const isFormValid =
    eventsData.name.trim() !== '' &&
    eventsData.description.trim() !== '' &&
    eventsData.date !== '' &&
    eventsData.location.trim() !== '' &&
    eventsData.contact.trim() !== '' &&
    eventsData.images.length > 0 &&
    eventsData.highlights.length > 0 &&
    (eventsData.availability.is24Hours ||
      (eventsData.availability.startTime !== '' &&
        eventsData.availability.endTime !== ''));
  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="text-[16px] font-bold">Events Information</p>
      <div className="grid grid-cols-2 gap-5 w-full">
        <TextFieldWithCounter
          label="Event Name"
          required
          placeholder="Enter event name"
          maxLength={50}
          value={eventsData.name}
          onChange={(e) =>
            setEventsData((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />
        <VisibilityDropdown
          label="Visibility"
          value={eventsData.visibility}
          onChange={(value) =>
            setEventsData((prev) => ({
              ...prev,
              visibility: value,
            }))
          }
        />
      </div>
      <div className="grid grid-cols-2 gap-5 w-full">
        <TextFieldWithCounter
          label="Event location"
          required
          placeholder="Enter event location"
          maxLength={50}
          value={eventsData.location}
          onChange={(e) =>
            setEventsData((prev) => ({
              ...prev,
              location: e.target.value,
            }))
          }
        />
        <DateSelector
          required
          value={eventsData.date}
          label="Select Event Date"
          onChange={(date) =>
            setEventsData({
              ...eventsData,
              date,
            })
          }
        />
      </div>
      <AvailabilitySelector
        value={eventsData.availability}
        onChange={(availability) =>
          setEventsData((prev) => ({
            ...prev,
            availability,
          }))
        }
      />
      <TextFieldWithCounter
        label="Contact Number"
        type="number"
        required
        placeholder="Enter contact number for this event"
        maxLength={15}
        value={eventsData.contact}
        onChange={(e) =>
          setEventsData((prev) => ({
            ...prev,
            contact: e.target.value,
          }))
        }
      />
      <HighlightsInput
        required
        label="Highlights"
        value={eventsData.highlights}
        onChange={(highlights) =>
          setEventsData((prev) => ({
            ...prev,
            highlights,
          }))
        }
      />

      <TextFieldWithCounter
        label="Event Description"
        value={eventsData.description}
        onChange={(e) =>
          setEventsData((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
        placeholder="Enter Event description"
        required
        multiline
        maxLength={200}
      />
      <p className="text-[16px] mt-4 font-bold">Images</p>
      <p className="text-[14px] text-gray-500 ">
        Add an images to showcase this Event (Max 1 image)
      </p>
      <HeroImageUploader
        maxImages={1}
        images={eventsData.images}
        onChange={(images) =>
          setEventsData((prev) => ({
            ...prev,
            images,
          }))
        }
      />
      <div className="mt-6 flex items-center">
        {onDelete && (
          <Button variant="outlineRed" onClick={onDelete}>
            <p className="text-rose-500">Delete</p>
          </Button>
        )}

        <div className="ml-auto flex gap-1">
          {!onDelete && (
            <Button className="mr-4" variant="outlineBlue" onClick={onCancel}>
              Cancel
            </Button>
          )}

          <Button disabled={!isFormValid} variant="blue" onClick={onSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventsForm;
