// 3rd Party Modules
import { FcDownRight, FcServices, FcSupport } from "react-icons/fc";

// Local Modules
import styles from "./SettingsMenu.module.css";
import { DialogBox } from "../../components/DialogBox/DialogBox";
import { Anchor } from "../../components/Anchor/Anchor";

// Exportable Component
export const SettingsMenu = () => {
  return (
    <DialogBox title="Settings">
      <div className={styles.div}>
        <Anchor
          name="Customization"
          destinationPath="/app/customization"
          underline={false}
        >
          <FcServices />
        </Anchor>
        <Anchor
          name="Settings"
          destinationPath="/app/settings"
          underline={false}
        >
          <FcSupport />
        </Anchor>
        <Anchor name="Log out" destinationPath="/app/logout" underline={false}>
          <FcDownRight />
        </Anchor>
      </div>
    </DialogBox>
  );
};
