// 3rd Party Modules
import { Link } from "react-router-dom";

// Local Modules
import styles from "./Anchor.module.css";

// Props Type
type AnchorProps = {
  name: string;
  destinationPath: string;
};

// Exportable Component
export const Anchor = ({ name, destinationPath }: AnchorProps) => (
  <Link className={styles.link} to={destinationPath}>
    {name}
  </Link>
);
