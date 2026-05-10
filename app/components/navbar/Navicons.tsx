import { images } from "@/app/constants";
import Image from "next/image";
import Link from "next/link";

const Navicons = () => {
  return (
    <Link href="/" className="flex-row cursor-pointer flex items-center gap-3">
      <Image src={images.icon} width={35} height={35} alt="logo" />
      <p className=" text-[16px]">Hotelman TV</p>
    </Link>
  );
};

export default Navicons;
