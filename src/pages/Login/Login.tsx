// 3rd Party Modules
import { useContext, useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

// Local Modules
import styles from "./Login.module.css";
import { ErrorContext } from "../../routes/App";
import { UsernameInput } from "../../wrappers/UsernameInput";
import { PasswordInput } from "../../wrappers/PasswordInput";
import { DialogBox } from "../../components/DialogBox/DialogBox";
import { Button } from "../../components/Button/Button";
import { useLogin } from "../../api/endpoints";
import { Loading } from "../../components/Loading/Loading";
import { Anchor } from "../../components/Anchor/Anchor";

// Exportable Component
export const Login = () => {
  const errorContext = useContext(ErrorContext);
  const [username, setUsername] = useState<string>("");
  const [errorUsername, setErrorUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const navigate = useNavigate();

  const loginMutation = useLogin({ fetch: { credentials: "include" } });

  useEffect(() => {
    if (loginMutation.isError) {
      errorContext?.setError("Unknown server error");
      return;
    }

    if (loginMutation.isSuccess) {
      if (loginMutation.data?.status === 200) {
        navigate("/app");
      } else {
        errorContext?.setError("Invalid username and/or password");
      }
    }
  }, [loginMutation.isSuccess]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Check for input errors
    if (!showError) {
      setShowError(true);
    }
    if (errorUsername || errorPassword) {
      errorContext?.setError(
        errorUsername && errorPassword
          ? "Invalid username and password"
          : errorUsername
            ? "Invalid username"
            : "Invalid password",
      );
      return;
    }

    loginMutation.mutate({ data: { username, password } });
  };

  return (
    <DialogBox title="Login">
      <main className={styles.main}>
        {loginMutation.isPending && <Loading loading={true} />}
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          aria-label="Login user"
        >
          <UsernameInput
            value={username}
            setValue={setUsername}
            error={errorUsername}
            setError={setErrorUsername}
            showError={showError}
          />
          <PasswordInput
            value={password}
            setValue={setPassword}
            error={errorPassword}
            setError={setErrorPassword}
            showError={showError}
          />
          <div className={styles.linkDiv}>
            <Anchor name="sign up" destinationPath="/signup" />
            <Anchor
              name="forgot password"
              destinationPath="/send-reset-password-link"
            />
          </div>
          <div className={styles.buttonsDiv}>
            <Button name="Login" type="submit" onClick={handleSubmit} />
          </div>
        </form>
      </main>
    </DialogBox>
  );
};
