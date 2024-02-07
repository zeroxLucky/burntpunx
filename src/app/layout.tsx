import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/web3/contexts/Providers";

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
    <html lang="en-US">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
