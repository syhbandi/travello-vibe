import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Destinations from "@/components/Destinations";
import Packages from "@/components/Packages";
import BookingSteps from "@/components/BookingSteps";
import Testimonials from "@/components/Testimonials";
import Sponsors from "@/components/Sponsors";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Destinations />
      <Packages />
      <BookingSteps />
      <Testimonials />
      <Sponsors />
      <Newsletter />
    </>
  );
}
