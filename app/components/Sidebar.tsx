"use client";

import { images } from "@/app/constants";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { sidebarLinks } from "@/app/constants";
import ConfirmationModal from "./pages/components/ConfirmationModal";

const Sidebar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("v1") || "dashboard";
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const router = useRouter();

  const handleLogout = () => {
    setShowLogoutModal(false);

    router.push("/signin");
  };
  return (
    <>
      <aside className="w-[260px] border-r border-[#161923] sticky bg-[#020612] top-0 h-screen flex flex-col justify-between p-4">
        <div>
          <div className="ml-4 mt-2">
            <Image
              src={images.icon2}
              alt="Affiliate Icon"
              width={140}
              height={140}
            />
          </div>

          <nav className="flex flex-col ml-2 mt-10 gap-4">
            {sidebarLinks.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentStep === item.name.toLowerCase();

              return (
                <div
                  key={index}
                  onClick={() => {
                    if (item.disabled) return;

                    if (item.name.toLowerCase() === "logout") {
                      setShowLogoutModal(true);
                      return;
                    }

                    const params = new URLSearchParams(searchParams.toString());

                    params.set("v1", item.name.toLowerCase());

                    router.push(`/dashboard?${params.toString()}`);
                  }}
                >
                  <div
                    className={`
          group relative flex items-center gap-6 p-2 rounded-md transition-all
          ${
            item.disabled
              ? "cursor-not-allowed opacity-50 blur-[1px] pointer-events-none"
              : "cursor-pointer"
          }
          ${
            isActive
              ? "bg-gradient-to-r from-[#2488bd] to-[#1f2143]"
              : "hover:bg-[#0e1220] text-[#81899C]"
          }
        `}
                  >
                    <Icon
                      size={18}
                      className={isActive ? "text-white" : "text-[#81899C]"}
                    />

                    <span
                      className={isActive ? "text-white" : "text-[#81899C]"}
                    >
                      {item.name}
                    </span>

                    {item.disabled && (
                      <span className="ml-auto rounded-full bg-[#2488bd]/20 px-2 py-0.5 text-[10px] font-medium text-[#62b4e3]">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  {index === 5 && (
                    <div className="my-15 border-t border-[#161923]" />
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
      <ConfirmationModal
        variant="info"
        isOpen={showLogoutModal}
        title="Sign out"
        message="Are you sure you want to sign out?"
        confirmText="Cancel"
        cancelText="Sign out"
        onConfirm={() => setShowLogoutModal(false)}
        onCancel={handleLogout}
      />
    </>
  );
};

export default Sidebar;
