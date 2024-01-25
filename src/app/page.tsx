"use client";

import React, { useState } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Content from "./components/layout/Content";
export default function Page() {
  const [view, setView] = useState("frame");

  return (
    <main className="w-100 flex flex-col h-[100vh] relative">
      <Header />
      <Content view={view} setView={setView} />
      <Footer />
    </main>
  );
}
