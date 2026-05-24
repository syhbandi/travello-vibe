import type { Metadata } from "next";
import { Inter, Volkhov } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const volkhov = Volkhov({
  variable: "--font-volkhov",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Travello - Travel, enjoy and live a new and full life in Lombok",
  description: "Book your next trip to Lombok in 3 easy steps. Discover the beauty of Gili Trawangan, Mount Rinjani, and Mandalika with Travello.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${volkhov.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-foreground">
        {children}
      </body>
    </html>
  );
}
