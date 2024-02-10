import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/contexts/Providers";
import { Toaster } from "sonner";
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
    <html lang="en-US" className="bg-black">
      <body>
        <Toaster
          position="top-center"
          theme="dark"
          toastOptions={{
            classNames: {
              toast: "digital",
              
            },
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
