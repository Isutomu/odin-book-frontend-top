// Local Modules
import styles from "./Homepage.module.css";
import { PostEditor } from "../../components/PostEditor/PostEditor";
import { Feed } from "../../containers/Feed/Feed";

// Exportable Component
export const Homepage = () => {
  return (
    <main className={styles.main}>
      <PostEditor />
      <Feed />
    </main>
  );
};
