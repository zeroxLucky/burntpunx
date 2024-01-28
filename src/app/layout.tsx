import type { Metadata } from "next";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";

export const metadata: Metadata = {
  title: "Hoodie Cartel",
  description: "UniversalPunx",
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
