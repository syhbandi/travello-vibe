import type { Metadata } from "next";
import DestinationsClient from "./DestinationsClient";

export const metadata: Metadata = {
  title: "Explore Destinations - Travello",
  description: "Explore the most beautiful and exotic destinations in Lombok, from pristine Gilis to majestic mountains.",
};

export default function DestinationsPage() {
  return <DestinationsClient />;
}
