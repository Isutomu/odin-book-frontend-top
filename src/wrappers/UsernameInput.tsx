// Local Modules
import { TextInput } from "../components/TextInput/TextInput";

// MAIN COMPONENT
type UsernameInputProps = {
  value: string;
  setValue: (value: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
  showError?: boolean;
};
export const UsernameInput = ({
  value,
  setValue,
  error,
  setError,
  showError = true,
}: UsernameInputProps) => {
  return (
    <TextInput
      label="username"
      value={value}
      setValue={setValue}
      minLength={3}
      maxLength={20}
      regex={new RegExp(/^[a-zA-Z0-9]*$/)}
      regexError="Must be letters or numbers"
      error={error}
      setError={setError}
      placeholder="username"
      showError={showError}
      size="clamp(15rem, 40vw, 30rem)"
    />
  );
};
