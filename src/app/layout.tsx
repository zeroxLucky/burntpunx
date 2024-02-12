import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/contexts/Providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://hoodiecartel.com"),
  title: "Hoodie Cartel",
  description: "Home to the BurntPunX Collection and the Hoodie Cartel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className="bg-black">
      <body>
        <Toaster
          position="top-center"
          className="toaster group"
          toastOptions={{
            classNames: {
              toast:
                "digital group toast group-[.toaster]:bg-black group-[.toaster]:text-[#cabd89] group-[.toaster]:text-xs group-[.toaster]:border-[2px] group-[.toaster]:border-[#cabd89] group-[.toaster]:shadow-lg",
            },
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
