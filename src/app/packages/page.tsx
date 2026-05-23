import type { Metadata } from "next";
import PackagesClient from "./PackagesClient";

export const metadata: Metadata = {
  title: "Premium Tour Packages - Travello",
  description: "Browse our premium Lombok tour packages. All-inclusive luxury snorkeling, Rinjani trekking, and heritage tours with complete facilities.",
};

export default function PackagesPage() {
  return <PackagesClient />;
}
