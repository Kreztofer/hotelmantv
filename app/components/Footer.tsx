import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import Container from "./Container";

const Footer = () => {
  return (
    <Container>
      <footer className="w-full my-10">
        <div
          className="
          flex items-center justify-between
        "
        >
          <div className="">
            <h2 className="font-semibold">Hotelman TV</h2>

            <p className="text-gray-400 mt-3 ">
              © 2024 Hotelman TV. All rights reserved.
            </p>
          </div>

          <div className="flex gap-28">
            <div>
              <h3 className="font-semibold  mb-5">Product</h3>

              <div className="flex flex-col gap-3">
                <a
                  href="/hotelmantv.apk"
                  download="hotelmantv.apk"
                  className="text-gray-400 hover:text-white transition"
                >
                  Overview
                </a>

                <a
                  href="/hotelmantv.apk"
                  download="hotelmantv.apk"
                  className="text-gray-400 hover:text-white transition"
                >
                  Features
                </a>

                <a
                  href="/hotelmantv.apk"
                  download="hotelmantv.apk"
                  className="text-gray-400 hover:text-white transition"
                >
                  Pricing
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold ] mb-5">Solutions</h3>

              <div className="flex flex-col gap-3">
                <a
                  href="/hotelmantv.apk"
                  download="hotelmantv.apk"
                  className="text-gray-400 hover:text-white transition"
                >
                  For Hotels
                </a>

                <a
                  href="/hotelmantv.apk"
                  download="hotelmantv.apk"
                  className="text-gray-400 hover:text-white transition"
                >
                  For Guests
                </a>

                <a
                  href="/hotelmantv.apk"
                  download="hotelmantv.apk"
                  className="text-gray-400 hover:text-white transition"
                >
                  Use Cases
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-5">Resources</h3>

              <div className="flex flex-col gap-3">
                <a
                  href="/hotelmantv.apk"
                  download="hotelmantv.apk"
                  className="text-gray-400 hover:text-white transition"
                >
                  Blog
                </a>

                <a
                  href="/hotelmantv.apk"
                  download="hotelmantv.apk"
                  className="text-gray-400 hover:text-white transition"
                >
                  Help Center
                </a>

                <a
                  href="/hotelmantv.apk"
                  download="hotelmantv.apk"
                  className="text-gray-400 hover:text-white transition"
                >
                  Case Studies
                </a>
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-5">Company</h3>

              <div className="flex flex-col gap-3">
                <a
                  href="/hotelmantv.apk"
                  download="hotelmantv.apk"
                  className="text-gray-400 hover:text-white transition"
                >
                  About Us
                </a>

                <a
                  href="/hotelmantv.apk"
                  download="hotelmantv.apk"
                  className="text-gray-400 hover:text-white transition"
                >
                  Careers
                </a>

                <a
                  href="/hotelmantv.apk"
                  download="hotelmantv.apk"
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="relative z-10 flex items-center gap-5">
            {[FaLinkedinIn, FaFacebookF, FaInstagram, FaYoutube].map(
              (Icon, index) => (
                <div
                  key={index}
                  className="
                w-10 h-10
                rounded-full
                bg-white/10
                border border-white/10
                flex items-center justify-center
                text-white
                hover:bg-[#3CCFE8]
                hover:text-black
                transition-all duration-300
                cursor-pointer
              "
                >
                  <Icon size={16} />
                </div>
              ),
            )}
          </div>
        </div>
      </footer>
    </Container>
  );
};

export default Footer;
