import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Destinations from "@/components/Destinations";
import Packages from "@/components/Packages";
import BookingSteps from "@/components/BookingSteps";
import Testimonials from "@/components/Testimonials";
import Sponsors from "@/components/Sponsors";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full bg-white flex flex-col">
        <Hero />
        <Services />
        <Destinations />
        <Packages />
        <BookingSteps />
        <Testimonials />
        <Sponsors />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
