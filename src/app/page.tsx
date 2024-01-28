"use client";

import React, { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Content from "./components/layout/Content";
import Modal from "./components/common/Modal";
import Language from "./constants/language";
import { isMobile } from 'react-device-detect';

export default function Page()
{
  const [view, setView] = useState("frame");
  const [dialog, setDialog] = useState({ open: true, title: "", body: "" });


  useEffect(() =>
  {
    const accepted_tos = localStorage.getItem("accepted_tos");

    if (!isMobile)
    {
      if (!accepted_tos)
      {
        //show tos
        const tos_dialog = {
          open: true, title: Language.MODAL.DISCLAIMER, body: Language.MODAL.DISCLAIMER, onClose: (setDialog: any) =>
          {
            localStorage.setItem("accepted_tos", (new Date()).toISOString());
            setDialog(false);
          }
        }
      }
    } else
    {
      const desktop_dialog = {
        open: true, onClose: false, ...Language.MODAL.DISCLAIMER
      }
      setDialog(desktop_dialog);
    }
  }, []);

  return (
    <main className="w-100 flex flex-col">
      <Header />
      <Content view={view} setView={setView} />
      <Footer />
      <Modal isOpen={dialog?.open} title={dialog?.title} body={dialog?.body} onClose={setDialog} />
    </main>
  );
}
