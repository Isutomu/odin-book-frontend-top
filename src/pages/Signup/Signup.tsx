// 3rd Party Modules
import { useContext, useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

// Local Modules
import styles from "./Signup.module.css";
import { ErrorContext } from "../../routes/App";
import { UsernameInput } from "../../wrappers/UsernameInput";
import { PasswordInput } from "../../wrappers/PasswordInput";
import { DialogBox } from "../../components/DialogBox/DialogBox";
import { Button } from "../../components/Button/Button";
import { useSignup } from "../../api/endpoints";
import { Loading } from "../../components/Loading/Loading";
import { Anchor } from "../../components/Anchor/Anchor";
import { EmailInput } from "../../wrappers/EmailInput";

// Exportable Component
export const Signup = () => {
  const errorContext = useContext(ErrorContext);
  const [username, setUsername] = useState<string>("");
  const [errorUsername, setErrorUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const navigate = useNavigate();

  const signupMutation = useSignup({ fetch: { credentials: "include" } });

  useEffect(() => {
    if (signupMutation.isError) {
      errorContext?.setError("Unknown server error");
      return;
    }

    if (signupMutation.isSuccess) {
      if (signupMutation.data?.status === 201) {
        errorContext?.setError("User created!");
        navigate("/login");
      } else {
        errorContext?.setError("Invalid username, email, and/or password");
      }
    }
  }, [signupMutation.isSuccess]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Check for input errors
    if (!showError) {
      setShowError(true);
    }
    if (errorUsername || errorEmail || errorPassword) {
      errorContext?.setError(
        `Invalid ${errorUsername ? "'username'" : ""} ${errorEmail ? "'email'" : ""} ${errorPassword ? "'password'" : ""}`,
      );
      return;
    }

    signupMutation.mutate({ data: { username, email, password } });
  };

  return (
    <div className={styles.body}>
      <DialogBox title="Sign up">
        <main className={styles.main}>
          {signupMutation.isPending && <Loading loading={true} />}
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            aria-label="Sign up user"
          >
            <UsernameInput
              value={username}
              setValue={setUsername}
              error={errorUsername}
              setError={setErrorUsername}
              showError={showError}
            />
            <EmailInput
              value={email}
              setValue={setEmail}
              error={errorEmail}
              setError={setErrorEmail}
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
              <Anchor name="back to login" destinationPath="/login" />
            </div>
            <div className={styles.buttonsDiv}>
              <Button name="Sign up" type="submit" onClick={handleSubmit} />
            </div>
          </form>
        </main>
      </DialogBox>
    </div>
  );
};
