import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Content from "./components/layout/content";

export default function Page() {
  return (
    <main className="w-100 flex flex-col h-[100vh] relative">
      <Header />
      <Content />
      <Footer />
    </main>
  );
}
