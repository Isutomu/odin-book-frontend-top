// 3rd Party Modules
import { FcHome, FcNeutralDecision, FcSearch } from "react-icons/fc";

// Local Modules
import styles from "./MainMenu.module.css";
import { DialogBox } from "../../components/DialogBox/DialogBox";
import { Anchor } from "../../components/Anchor/Anchor";

// Exportable Component
export const MainMenu = () => {
  return (
    <DialogBox title="Navigation">
      <div className={styles.div}>
        <Anchor name="Home" destinationPath="/app" underline={false}>
          <FcHome />
        </Anchor>
        <Anchor name="Profile" destinationPath="/app/profile" underline={false}>
          <FcNeutralDecision />
        </Anchor>
        <Anchor name="Search" destinationPath="/app/search" underline={false}>
          <FcSearch />
        </Anchor>
      </div>
    </DialogBox>
  );
};
