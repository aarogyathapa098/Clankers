import type { Metadata } from "next";
import { RoleProvider } from "@/components/auth/RoleProvider";
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
      <body>
        <RoleProvider>{children}</RoleProvider>
      </body>
    </html>
  );
}
