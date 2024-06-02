import "../../scss/tooltip.scss";
import React, { useState } from "react";

interface TooltipProps {
  text: string;
  children: React.ReactElement;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  /**
   * 마우스가 hover됐을 때 툴팁을 visible
   */
  const handleMouseEnter = () => {
    setIsVisible(true);
  };
  /**
   * 마우스가 leave 시 툴팁을 invisible
   */
  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div
      className="tooltip-wrap"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div className={`tooltip-text ${isVisible ? "visible" : ""}`}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Tooltip;
