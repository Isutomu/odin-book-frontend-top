// Local Modules
import { TextInput } from "../components/TextInput/TextInput";

// MAIN COMPONENT
type EmailInputProps = {
  value: string;
  setValue: (value: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
  showError?: boolean;
};
export const EmailInput = ({
  value,
  setValue,
  error,
  setError,
  showError = true,
}: EmailInputProps) => {
  return (
    <TextInput
      label="email"
      value={value}
      setValue={setValue}
      minLength={5}
      maxLength={45}
      regex={
        new RegExp(
          /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        )
      }
      regexError="Must be a valid email"
      error={error}
      setError={setError}
      placeholder="email"
      size="clamp(15rem, 40vw, 30rem)"
      showError={showError}
    />
  );
};
