"use client";
import React, { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Content from "./components/layout/Content";
import Modal from "./components/common/Modal";
import Language from "./constants/language";
import { isMobile } from "react-device-detect";
import { NextUIProvider } from "@nextui-org/react";

export default function Page() {
  const [view, setView] = useState(false);
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    body: "",
    onClose: () => {},
  });

  useEffect(() => {
    const accepted_tos = localStorage.getItem("accepted_tos");

    if (!isMobile) {
      if (!accepted_tos) {
        //show tos
        const tos_dialog = {
          open: true,
          title: Language.MODAL.DEFAULT.title,
          body: Language.MODAL.DISCLAIMER.body,
          onClose: () => {
            const d = {
              open: false,
              title: "",
              body: "",
              onClose: () => {},
            };
            const val = new Date().toISOString();
            console.log("accepted tos", val);
            console.log(d);
            localStorage.setItem("accepted_tos", new Date().toISOString());
            setDialog(d);
          },
        };
        setDialog(tos_dialog);
      }
    } else {
      const desktop_dialog = {
        open: true,
        onClose: false,
        hideCloseButton: true,
        title: Language.MODAL.DEFAULT.title,
        body: Language.MODAL.DESKTOP_ONLY.body,
      };
      setDialog(desktop_dialog);
    }
    setView("frame");
  }, []);

  useEffect(() => {
    console.log(dialog);
  }, [dialog]);
  return (
    <NextUIProvider>
      {view ? (
        <main className="w-100 flex flex-col">
          <Header />

          <Content
            view={view}
            setView={(e) => {
              setView(e);
            }}
          />

          <Footer />
        </main>
      ) : null}
      <Modal
        open={dialog?.open}
        title={dialog?.title}
        body={dialog?.body}
        onClose={dialog?.onClose}
      />
    </NextUIProvider>
  );
}
