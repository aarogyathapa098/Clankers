import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Islington Academic Planning",
  description: "Academic planning dashboard for schedules, rooms, faculty, and examinations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
