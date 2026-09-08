"use client";
import { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import { ImageItem } from "@/app/models";
import { toast } from "react-toastify";
import TvPreview from "./components/TvPreview";
import Button from "../Button";

const Home = () => {
  const [tvData, setTvData] = useState({
    message: "We wish you a pleasant and memorable stay",
    images: [] as ImageItem[],
    currentImage: 0,
    guestInfo: ["room", "guest", "stay"],
  });
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const STORAGE_KEY = "variis-xv-trident";

  useEffect(() => {
    const draft = localStorage.getItem(STORAGE_KEY);

    if (!draft) return;

    try {
      const parsed = JSON.parse(draft);

      if (parsed.tvData) {
        setTvData(parsed.tvData);
      }

      if (parsed.lastSaved) {
        setLastSaved(parsed.lastSaved);
      }
    } catch (err) {
      console.error("Failed to load draft", err);
    }
  }, []);
  const handleSaveDraft = () => {
    const now = new Date();

    const formattedTime = now.toLocaleString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        tvData,
        lastSaved: formattedTime,
      }),
    );

    setLastSaved(formattedTime);
    toast.success("Draft saved successfully!");
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[20px] font-bold">Home Screen Editor</p>
          <p className="text-[15px] text-gray-500">
            Customize the content and layout of the TV app home screen
          </p>
        </div>
        <div>
          <Button
            onClick={handleSaveDraft}
            className="mr-4"
            variant="outlineBlue"
          >
            Save Draft
          </Button>
          <Button variant="blue">Publish Changes</Button>
        </div>
      </div>
      <div className="mt-4 flex w-full items-center justify-end gap-4 text-[12px]">
        <p className="rounded-sm bg-gray-200 px-2 py-1 text-gray-600">Draft</p>

        <p className="text-gray-600"> Last saved: {lastSaved ?? "Never"}</p>
      </div>

      <div className="flex justify-between gap-4 mt-8">
        <HeroSection tvData={tvData} setTvData={setTvData} />

        <div className="border border-gray-200 w-[53%] shadow-lg p-4 rounded-md">
          <div>
            <p className="font-bold">Live Preview</p>
            <p className="text-[14px] text-gray-500">
              This is how it will look on the TV.
            </p>
          </div>
          <TvPreview tvData={tvData} setTvData={setTvData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
