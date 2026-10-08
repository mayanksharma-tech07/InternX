import React from "react";
import { Loader2 } from "lucide-react";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  icon = null,
  iconPosition = "left",
  fullWidth = false,
  onClick,
  className = "",
}) => {
  const buttonClasses = [
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? "btn-full" : "",
    loading ? "btn-loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <Loader2 className="btn-loader" size={18} />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <span className="btn-icon">{icon}</span>
          )}

          <span>{children}</span>

          {icon && iconPosition === "right" && (
            <span className="btn-icon">{icon}</span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;