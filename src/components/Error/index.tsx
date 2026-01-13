// 3rd Party Modules
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { FiAlertOctagon } from "react-icons/fi";

// Local Modules
import styles from "./index.module.css";

// Props Type
type ErrorProps = {
  error: string | null;
};

// Exportable Component
export const Error = ({ error }: ErrorProps) => {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          key={styles.error}
          className={styles.error}
          exit={{ top: 0, transform: "translateX(-50%) translateY(-160%)" }}
          transition={{ duration: 0.25 }}
        >
          <FiAlertOctagon size="1.3rem" />
          <span>{error}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
