import React from "react";
import Logo from "@/components/layout/Logo";

const Header = () => {
  return (
    <header className="w-100 p-6">
      <div className="max-w-sm px-6 my-0 mx-auto">
        <Logo />
      </div>
    </header>
  );
};

export default Header;
