import icon from "@/public/images/digilogo.png";
import bg from "@/public/images/bg.png";
import bg1 from "@/public/images/bg1.png";
import bg2 from "@/public/images/bg2.png";
import bg3 from "@/public/images/bg3.png";
import bg4 from "@/public/images/bg4.png";
import room from "@/public/images/room.png";
import box from "@/public/images/box.png";
import densie from "@/public/images/denise.png";
import topview from "@/public/images/topview.png";
import grandpela from "@/public/images/grand.png";
import threejs from "@/public/images/3js.png";
import chelsea from "@/public/images/chelsea.png";
import tcl from "@/public/images/tcl.png";
import sony from "@/public/images/sony.png";
import philips from "@/public/images/philips.png";
import report from "@/public/images/report.png";
import support from "@/public/images/support.png";
import tvicon from "@/public/images/tvicon.png";
import icon2 from "@/public/images/icon2.png";
import meal from "@/public/images/meal.png";
import menu from "@/public/images/menu.png";
import divider from "@/public/images/divider.png";
import { BsHouseFill, BsFillBarChartLineFill } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";
import { GoHomeFill, GoFileDirectoryFill } from "react-icons/go";
import { FaConciergeBell } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { IoDocumentText, IoFastFood } from "react-icons/io5";
import { RiComputerLine } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { FaCalendarDays, FaDumbbell, FaPhone } from "react-icons/fa6";
import { BiSolidDoorOpen } from "react-icons/bi";
import { FaUser } from "react-icons/fa";

export const images = {
  icon,
  icon2,
  bg,
  bg1,
  divider,
  room,
  bg2,
  bg3,
  bg4,
  densie,
  topview,
  grandpela,
  threejs,
  chelsea,
  tvicon,
  box,
};

export const carousel = [menu, meal, report, support];

export const partners = [
  {
    id: "1",
    image: topview,
  },
  {
    id: "2",
    image: densie,
  },

  {
    id: "3",
    image: grandpela,
  },
  {
    id: "4",
    image: threejs,
  },
  {
    id: "5",
    image: chelsea,
  },
];

export const tvs = [
  {
    id: "1",
    image: tcl,
  },
  {
    id: "2",
    image: sony,
  },

  {
    id: "3",
    image: philips,
  },
];

export const heroIcons = [
  {
    id: "1",
    icon: BsHouseFill,
    text: "Enhance Guest Experience",
  },
  {
    id: "2",
    icon: BsFillBarChartLineFill,
    text: "Increase Hotel Revenue",
  },
  {
    id: "3",
    icon: FaGear,
    text: "Steamline Hotel Operations",
  },
];

export const features = [
  {
    id: "1",
    icon: GoHomeFill,
    title: "Welcome Experience",
    description:
      "Persolized greetings and beautiful hotel introductions for your guests.",
  },
  {
    id: "2",
    icon: FaConciergeBell,
    title: "Hotel Services",
    description:
      "Access room service, housekeeping, concierge, and other hotel amenities.",
  },
  {
    id: "3",
    icon: GiShoppingBag,
    title: "In-Room Shopping",
    description:
      "Browse and purchase hotel products,, and exclusive offers directly from the TV.",
  },
  {
    id: "4",
    icon: IoDocumentText,
    title: "Statement and Billing",
    description:
      "View and manage your hotel charges and payments directly from the TV.",
  },
  {
    id: "5",
    icon: RiComputerLine,
    title: "Management Dashboard",
    description: "Powerful tools for hotels to manage content and services.",
  },
];

export const forhotels = [
  {
    id: "1",
    title: "FOR HOTELS",
    description: "Run your hotel smarter",
    values: [
      "Increase ancillary revenue",
      "Reduce operational workload",
      "Deliver exceptional guest experiences",
      "Fully customizable and brand aligned",
    ],
  },
];

export const forguests = [
  {
    id: "1",
    title: "FOR GUESTS",
    description: "Make every stay extraordinary",
    values: [
      "Easy access to hotel services",
      "Personalized recommendations",
      "Seamless and intuitive experience",
      "Everything you need, on your TV",
    ],
  },
];

export const sidebarLinks = [
  {
    id: 1,
    name: "Home",
    icon: GoHomeFill,
  },
  {
    id: 2,
    name: "Facilities",
    icon: FaDumbbell,
  },
  {
    id: 3,
    name: "Directory",
    icon: FaPhone,
  },
  {
    id: 4,
    name: "Messages",
    icon: AiFillMessage,
    disabled: true,
  },
  {
    id: 5,
    name: "Menu",
    icon: IoFastFood,
    disabled: true,
  },
  {
    id: 6,
    name: "Events",
    icon: FaCalendarDays,
    disabled: true,
  },
  {
    id: 7,
    name: "Logout",
    icon: FiLogOut,
  },
];

export const guestInfo = [
  {
    id: "room",
    title: "Room Number",
    icon: BiSolidDoorOpen,
  },
  {
    id: "guest",
    title: "Guest Name",
    icon: FaUser,
  },
  {
    id: "stay",
    title: "Stay Details",
    icon: FaCalendarDays,
  },
];
