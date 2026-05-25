// 3rd Party Modules
import {
  FcComments,
  FcLikePlaceholder,
  FcMindMap,
  FcVoicePresentation,
} from "react-icons/fc";

// Local Modules
import styles from "./Post.module.css";
import { Button } from "../Button/Button";

// Helpers
const parseDataDifference = (postDate: string) => {
  const date = Date.parse(postDate);
  const timeDifference = (Date.now() - date) / 1000;

  const periods = ["y", "m", "w", "d", "h", "min", "s"];
  const timeInSeconds = [
    365 * 24 * 60 * 60,
    30 * 24 * 60 * 60,
    7 * 24 * 60 * 60,
    24 * 60 * 60,
    60 * 60,
    60,
    1,
  ];
  const periodsInSeconds = Object.fromEntries(
    periods.map((key, index) => [key, timeInSeconds[index]]),
  );
  for (let period of periods) {
    const timeInPeriod = Math.trunc(timeDifference / periodsInSeconds[period]);
    if (timeInPeriod) {
      return ` ${timeInPeriod}${period}`;
    }
  }
  return "1s";
};

// Local Components
const ReactionsMenu = () => {
  return (
    <ul className={styles.reactionsMenu}>
      <li>
        <Button onClick={() => {}}>
          <FcLikePlaceholder />
        </Button>
      </li>
      <li>
        <Button onClick={() => {}}>
          <FcComments />
        </Button>
      </li>
      <li>
        <Button onClick={() => {}}>
          <FcMindMap />
        </Button>
      </li>
    </ul>
  );
};

type PostProps = {
  username: string;
  content: string;
  publishedAt: string;
  updatedAt: string | null;
};
export const Post = ({
  username,
  content,
  publishedAt,
  updatedAt,
}: PostProps) => {
  const dateTitle = updatedAt
    ? `${publishedAt}, updated at ${updatedAt}`
    : publishedAt;

  return (
    <div className={styles.post}>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.user}>
            <div className={styles.icon}>
              <FcVoicePresentation />
            </div>
            <h3 className={styles.username}>{username}</h3>
          </div>
          <span
            className={styles.date}
            title={dateTitle}
            aria-description="last time updated"
          >
            {parseDataDifference(updatedAt ? updatedAt : publishedAt)}
          </span>
        </div>
        <span className={styles.content}>{content}</span>
      </div>
      <ReactionsMenu />
    </div>
  );
};
