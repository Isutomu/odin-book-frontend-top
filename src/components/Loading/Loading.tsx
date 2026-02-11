// 3rd Party Modules
import { motion } from "motion/react";
import loadingIcon from "../../assets/loading.gif";
import { AnimatePresence } from "motion/react";

// Local Modules
import styles from "./Loading.module.css";

// MAIN COMPONENT
type LoadingProps = {
  loading: boolean;
};
export const Loading = ({ loading }: LoadingProps) => {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key={styles.loadingContainer}
          className={styles.loadingContainer}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <div className={styles.loading}>
            <img className={styles.loadingIcon} src={loadingIcon} alt="" />
            <span>Loading</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
