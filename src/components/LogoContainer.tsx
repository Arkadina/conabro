import React from "react";
import { cn } from "../lib/utils"

type Props = {
  src: string;
  height: string;
  width: string;
  alt: string;
  right?: string;
  left?: string;
  top: string;
};

function LogoContainer({ src, height, width, alt, right, top, left }: Props) {
  return (
    <div>
      <img src={src} alt={alt} style={{ width: "150px" }} />
    </div>
  );
}

export default LogoContainer;
