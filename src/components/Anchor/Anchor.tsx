// 3rd Party Modules
import { Link } from "react-router-dom";
import { type ReactElement } from "react";

// Local Modules
import styles from "./Anchor.module.css";

// Props Type
type AnchorProps = {
  children?: ReactElement;
  name: string;
  destinationPath: string;
  underline?: Boolean;
};

// Exportable Component
export const Anchor = ({
  children,
  name,
  destinationPath,
  underline = true,
}: AnchorProps) => (
  <Link
    className={styles.link}
    to={destinationPath}
    style={underline ? { textDecoration: "underline" } : {}}
  >
    {children}
    {name}
  </Link>
);
