// 3rd Party Modules
import React, { useState } from "react";

// Local Modules
import styles from "./WindowWrapper.module.css";
import { Button } from "../Button/Button";

// Props Type
type WindowWrapperProps = {
  children: React.ReactElement;
  title: string;
};

/**
 * This is a visual wrapper for components.
 * It gives them a border that seems like a program window.
 * It also allows the user to drag it by click and holding the header.
 */
export const WindowWrapper = ({ children, title }: WindowWrapperProps) => {
  type Position = {
    top: number;
    left: number;
  };

  const [windowPosition, setWindowPosition] = useState<Position>({
    top: 0,
    left: 0,
  });
  const [windowInitialPosition, setWindowInitialPosition] = useState<Position>({
    top: 0,
    left: 0,
  });
  const [dragStartingPoint, setDragStartingPoint] = useState<Position>({
    top: 0,
    left: 0,
  });
  const [dragging, setDragging] = useState<boolean>(false);

  const handleDragStart = (e: React.MouseEvent) => {
    setDragging(true);
    setDragStartingPoint({ top: e.clientY, left: e.clientX });
    setWindowInitialPosition({ ...windowPosition });
  };
  const handleDrag = (e: React.MouseEvent) => {
    if (!dragging) {
      return;
    }
    setWindowPosition({
      top: windowInitialPosition.top + e.clientY - dragStartingPoint.top,
      left: windowInitialPosition.left + e.clientX - dragStartingPoint.left,
    });
  };
  const handleDragEnd = () => {
    setDragging(false);
  };

  const resetWindowPosition = () => {
    setWindowPosition({ top: 0, left: 0 });
  };

  return (
    <div className={styles.window} style={windowPosition}>
      <div
        className={styles.titleBar}
        onMouseDown={handleDragStart}
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
        onDoubleClick={resetWindowPosition}
      >
        <h2>{title}</h2>
        <Button size="small" name="X" onClick={() => {}} />
      </div>
      {children}
    </div>
  );
};
