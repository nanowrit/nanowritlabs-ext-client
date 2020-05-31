import React from "react";
import { Button } from "react-bootstrap";
import { GiClockwiseRotation } from "react-icons/gi";
import "./LoaderButton.css";

export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <Button
      className={`LoaderButton ${className}`}
      variant="secondary"
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <GiClockwiseRotation glyph="refresh" className="spinning" />}
      {props.children}
    </Button>
  );
}