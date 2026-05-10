import Calltoaction from "./components/Calltoaction";
import Demo from "./components/Demo";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Hotelsandguests from "./components/Hotelsandguests";
import Navbar from "./components/navbar/Navbar";
import Partners from "./components/Partners";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Demo />
      <Hotelsandguests />
      <Partners />
      <Calltoaction />
      <Footer />
    </div>
  );
}
