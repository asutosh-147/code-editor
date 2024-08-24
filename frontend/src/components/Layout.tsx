import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full flex-col h-screen">
      <Navbar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Layout;
