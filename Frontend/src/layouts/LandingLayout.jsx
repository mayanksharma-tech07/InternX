import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const LandingLayout = () => {
  return (
    <div className="landing-layout">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default LandingLayout;