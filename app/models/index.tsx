export interface ImageItem {
  id: string;
  preview: string;
}

export interface TVData {
  message: string;
  images: ImageItem[];
  currentImage: number;
  guestInfo: string[];
}
export interface FacilityData {
  name: string;
  id: string;
  visibility: "Visible" | "Hidden";
  description: string;
  images: ImageItem[];
}
export interface FacilityFormProps {
  facilityData: FacilityData;
  setFacilityData: React.Dispatch<React.SetStateAction<FacilityData>>;
  onSave: () => void;
  onCancel: () => void;
  onDelete?: () => void;
}
export interface DirectoryData {
  id: string;
  name: string;
  phoneNumber: string;
  description: string;
  visibility: "Visible" | "Hidden";
  icon: string;
}

export interface DirectoryFormProps {
  directoriesData: DirectoryData;
  setDirectoriesData: React.Dispatch<React.SetStateAction<DirectoryData>>;
  onSave: () => void;
  onCancel: () => void;
  onDelete?: () => void;
}
