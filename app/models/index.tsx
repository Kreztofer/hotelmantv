export interface ImageItem {
  id: string;
  preview: string;
}

export interface TVData {
  message: string;
  images: ImageItem[];
  currentImage: number;
}

export interface availability {
  is24Hours: boolean;
  startTime: string;
  endTime: string;
}

export interface FacilityData {
  name: string;
  id: string;
  visibility: 'Visible' | 'Hidden';
  description: string;
  images: ImageItem[];
  availability: availability;
}
export interface FacilityFormProps {
  facilityData: FacilityData;
  setFacilityData: React.Dispatch<React.SetStateAction<FacilityData>>;
  onSave: () => void;
  onCancel: () => void;
  onDelete?: () => void;
}

export interface Highlight {
  id: string;
  title: string;
  icon: string;
}

export interface EventsData {
  name: string;
  id: string;
  date: string;
  contact: string;
  highlights: Highlight[];
  location: string;
  visibility: 'Visible' | 'Hidden';
  description: string;
  images: ImageItem[];
  availability: availability;
}

export interface EventsProps {
  eventsData: EventsData;
  setEventsData: React.Dispatch<React.SetStateAction<EventsData>>;
  onSave: () => void;
  onCancel: () => void;
  onDelete?: () => void;
}
export interface DirectoryData {
  id: string;
  name: string;
  phoneNumber: string;
  description: string;
  visibility: 'Visible' | 'Hidden';
  icon: string;
}

export interface DirectoryFormProps {
  directoriesData: DirectoryData;
  setDirectoriesData: React.Dispatch<React.SetStateAction<DirectoryData>>;
  onSave: () => void;
  onCancel: () => void;
  onDelete?: () => void;
}
