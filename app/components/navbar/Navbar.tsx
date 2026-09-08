"use client";
import Button from "../Button";
import Container from "../Container";
import Navicons from "./Navicons";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const link = document.createElement("a");
    link.href = "/hotelmantv.apk";
    link.download = "hotelmantv.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-7">
      <Container>
        <div className="w-full flex items-center justify-between">
          <Navicons />
          <div className="flex gap-5">
            <Button variant="outline" onClick={() => router.push("/signin")}>
              Sign In
            </Button>
            <Button onClick={handleClick}>Download App</Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
