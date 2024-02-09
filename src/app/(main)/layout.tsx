import MobileModal from "@/components/common/MobileModal";
import TOSModal from "@/components/common/TOSModal";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-100 flex flex-col">
      <Header />
      <MobileModal />
      <TOSModal />
      <section className="flex flex-1 flex-col w-full px-6 items-center">
        {children}
      </section>
      <Footer />
    </main>
  );
}
