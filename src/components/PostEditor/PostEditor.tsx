// 3rd Party Modules
import { FcNext } from "react-icons/fc";
import { useContext, useEffect, useState, type Dispatch } from "react";

// Local Modules
import styles from "./PostEditor.module.css";
import { DialogBox } from "../DialogBox/DialogBox";
import { Button } from "../Button/Button";
import { ErrorContext, type ErrorContextValue } from "../../routes/App";
import { useCreatePost } from "../../api/endpoints";

// Helpers
const validatePostContent = (
  content: string,
  errorContext: ErrorContextValue,
) => {
  const maxLength = 600;
  if (!content) {
    errorContext?.setError("Post can't be empty!");
  } else if (content.length > maxLength) {
    errorContext?.setError(`Maximum ${maxLength} characters`);
  } else {
    return true;
  }

  return false;
};

// Local Components
type TextareaProps = {
  postContent: string;
  setPostContent: Dispatch<React.SetStateAction<string>>;
};
const Textarea = ({ postContent, setPostContent }: TextareaProps) => {
  return (
    <textarea
      className={styles.textarea}
      placeholder="Your post goes here!"
      minLength={1}
      maxLength={600}
      value={postContent}
      onChange={(e) => setPostContent(e.target.value)}
    />
  );
};

// Exportable Component
export const PostEditor = () => {
  const errorContext = useContext(ErrorContext);
  const [content, setContent] = useState<string>("");
  const createPostMutation = useCreatePost({
    fetch: { credentials: "include" },
  });

  useEffect(() => {
    if (createPostMutation.isError) {
      errorContext?.setError("Unknown server error");
      return;
    }

    if (createPostMutation.isSuccess) {
      if (createPostMutation.data?.status === 201) {
        setContent("");
      } else {
        errorContext?.setError("Could not create post");
      }
    }
  }, [createPostMutation.isSuccess]);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const isValid = validatePostContent(content, errorContext);
    if (!isValid) {
      return;
    }
    createPostMutation.mutate({ data: { content } });
  };

  return (
    <DialogBox title={`Post ${content.length}/600`}>
      <form className={styles.post}>
        <Textarea postContent={content} setPostContent={setContent} />
        <Button type="submit" onClick={handleSubmit}>
          <FcNext />
        </Button>
      </form>
    </DialogBox>
  );
};
