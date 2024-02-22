import React from "react";
import "./WavyCircleLoader.css";

interface WavyCircle {
  visible: boolean;
}
export const WavyCircleLoader: React.FC<WavyCircle> = ({ visible }) => {
  return (
    <div className="wavy-circle-loader" style={{ opacity: visible ? 1 : 0 }}>
      <div className="circle"></div>
    </div>
  );
};
