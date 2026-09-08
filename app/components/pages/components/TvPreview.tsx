"use client";

import { useEffect, useState } from "react";
import {
  BedSingle,
  CalendarDays,
  Utensils,
  Building2,
  Phone,
  MessageSquare,
} from "lucide-react";
import { BsDoorOpenFill } from "react-icons/bs";

import { TVData } from "@/app/models";
import Image from "next/image";
import { images } from "@/app/constants";

interface TVPreviewProps {
  tvData: TVData;
  setTvData: React.Dispatch<React.SetStateAction<TVData>>;
}

export default function TVPreview({ tvData, setTvData }: TVPreviewProps) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      setTime(
        now
          .toLocaleTimeString("en-GB", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })
          .replace(":", "."),
      );

      setDate(
        now.toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
        }),
      );
    };

    updateDateTime();

    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (tvData.images.length === 0) {
      setTvData((prev) => ({
        ...prev,
        currentImage: 0,
      }));
      return;
    }

    if (tvData.currentImage >= tvData.images.length) {
      setTvData((prev) => ({
        ...prev,
        currentImage: 0,
      }));
    }
  }, [tvData.images.length, tvData.currentImage, setTvData]);

  useEffect(() => {
    if (tvData.images.length <= 1) return;

    const interval = setInterval(() => {
      setTvData((prev) => ({
        ...prev,
        currentImage: (prev.currentImage + 1) % prev.images.length,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [tvData.images.length, setTvData]);

  const background =
    tvData.images[Math.min(tvData.currentImage, tvData.images.length - 1)]
      ?.preview ?? images.bg1.src;

  return (
    <div className="mt-8 flex justify-center">
      <div className="relative w-full max-w-[760px]">
        {/* TV */}
        <div className=" bg-black p-3 shadow-[0_30px_70px_rgba(0,0,0,.45)]">
          {/* Screen */}
          <div className="relative h-[340px] overflow-hidden  bg-black">
            {/* Background */}
            <img
              src={background}
              alt="TV Background"
              className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/55" />

            {/* Header */}
            <div className="absolute left-5 right-4 top-6 flex items-start justify-between">
              <Image src={images.icon} alt="Icon" width={25} height={25} />

              <div className="text-right flex flex-col gap-1 text-white">
                <div className="flex items-center justify-end gap-2 text-[12px] ">
                  <span>{date}</span>
                </div>
                <div className="h-[0.4px] w-10px bg-[#38adec]" />
                <p className="text-[12px] font-semibold">{time}</p>
              </div>
            </div>

            {/* Hero */}
            <div className="absolute top-[16%] left-0 right-0 flex flex-col justify-center px-8">
              <p className=" text-white text-center text-[24px] font-semibold">
                Grand Hotel
              </p>
              <Image
                src={images.divider}
                width={150}
                height={20}
                className="mx-auto mt-1"
                alt="divider"
              />
              <div className="max-w-2xl mt-2 text-center">
                {tvData.guestInfo.includes("guest") && (
                  <p className=" text-white text-[15px] ">Welcome, Maria!</p>
                )}
              </div>
              <div className="max-w-2xl text-center">
                {tvData.message && (
                  <p className="break-words whitespace-pre-wrap text-[12px] leading-6 text-white/80">
                    {tvData.message}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap mt-1 justify-center gap-2">
                {tvData.guestInfo.includes("room") && (
                  <GuestChip
                    icon={<BsDoorOpenFill size={16} />}
                    label="Room 512"
                  />
                )}

                {tvData.guestInfo.includes("room") &&
                  tvData.guestInfo.includes("stay") && (
                    <div className="h-[32px] w-[2px] rounded-full bg-white/60" />
                  )}

                {tvData.guestInfo.includes("stay") && (
                  <GuestChip
                    icon={<CalendarDays size={16} />}
                    label="3 Nights"
                  />
                )}
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="absolute bottom-9 left-10 right-10 grid grid-cols-4 gap-2">
              <MenuCard title="Facilities" icon={<Building2 size={20} />} />

              <MenuCard title="Menu" icon={<Utensils size={20} />} />

              <MenuCard title="Messages" icon={<MessageSquare size={20} />} />

              <MenuCard title="Support" icon={<Phone size={20} />} />
            </div>
            {/* dot navigation */}
            {tvData.images.length > 1 && (
              <div className="absolute bottom-3 right-2 flex -translate-x-1/2 gap-2">
                {tvData.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setTvData((prev) => ({
                        ...prev,
                        currentImage: index,
                      }))
                    }
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === tvData.currentImage
                        ? " bg-white"
                        : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* TV Stand */}
        <div className="mx-auto h-5 w-10 bg-zinc-900" />

        <div className="mx-auto h-3 w-56 rounded-full bg-zinc-700" />
      </div>
    </div>
  );
}

interface GuestChipProps {
  icon: React.ReactNode;
  label: string;
}

function GuestChip({ icon, label }: GuestChipProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 text-sm text-white ">
      <span className="text-white/80">{icon}</span>

      <span>{label}</span>
    </div>
  );
}

interface MenuCardProps {
  title: string;
  icon: React.ReactNode;
}

function MenuCard({ title, icon }: MenuCardProps) {
  return (
    <div className="flex h-24  flex-col items-center justify-center rounded-xl border border-white/20 bg-black/20 backdrop-blur-md transition-all duration-300 hover:border-[#38adec]">
      <div className="text-white/80">{icon}</div>

      <p className="mt-3 text-[12px] font-medium text-white/80">{title}</p>
    </div>
  );
}
