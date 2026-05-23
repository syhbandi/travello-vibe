import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us - Travello",
  description: "Get in touch with the Travello Lombok team. Send us a message, find our office location, or reach out directly via phone or email.",
};

export default function ContactPage() {
  return <ContactClient />;
}
