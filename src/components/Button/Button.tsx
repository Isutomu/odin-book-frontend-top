// 3rd Party Modules
import type React from "react";

// Local Modules
import styles from "./Button.module.css";

// Props Type
// "name" and "children" are not really optional, it's just that it's one OR the other.
type ButtonProps = {
  onClick: () => void;
  name?: string;
  children?: React.ReactElement;
  type?: "button" | "reset" | "submit";
  padding?: string;
  size?: "big" | "small";
};

// Exportable Component
export const Button = ({
  onClick,
  name,
  children,
  type = "button",
  padding,
  size = "big",
}: ButtonProps) => {
  if (!name && !children) {
    throw new Error("One of props 'name' or 'children' has to be specified!");
  } else if (name && children) {
    throw new Error(
      "Button can't have 'name' and 'children' as props. Use one only.",
    );
  }

  let classNameArr = [styles.button, size === "small" ? styles.small : ""];
  if (children) {
    classNameArr.push(styles.paddingSmall);
  }

  return (
    <button
      className={classNameArr.join(" ")}
      onClick={onClick}
      type={type}
      style={{ padding }}
    >
      {children && <span className={styles.children}>{children}</span>}
      {name && <span className={styles.name}>{name}</span>}
    </button>
  );
};
