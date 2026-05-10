import Button from "../Button";
import Container from "../Container";
import Navicons from "./Navicons";

const Navbar = () => {
  return (
    <div className="mt-7">
      <Container>
        <div className="w-full flex items-center justify-between">
          <Navicons />
          <Button>Download App</Button>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
