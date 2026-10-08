// frontend/src/components/common/Loader.jsx

import React from "react";
import { LoaderCircle } from "lucide-react";

const Loader = ({
  size = 32,
  text = "",
  fullScreen = false,
}) => {
  return (
    <div className={`loader-wrapper ${fullScreen ? "loader-fullscreen" : ""}`}>
      <LoaderCircle
        className="loader-spinner"
        size={size}
        strokeWidth={2.5}
      />

      {text && <span className="loader-text">{text}</span>}
    </div>
  );
};

export default Loader;