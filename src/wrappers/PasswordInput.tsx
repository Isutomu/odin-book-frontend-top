// Local Modules
import { TextInput } from "../components/TextInput/TextInput";

// MAIN COMPONENT
type PasswordInputProps = {
  value: string;
  setValue: (value: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
  showError?: boolean;
  label?: "password" | "confirm password";
  equals?: string;
};
export const PasswordInput = ({
  value,
  setValue,
  error,
  setError,
  showError,
  label = "password",
  equals,
}: PasswordInputProps) => {
  return (
    <TextInput
      label={label}
      value={value}
      setValue={setValue}
      minLength={6}
      maxLength={20}
      error={error}
      setError={setError}
      placeholder="password"
      showError={showError}
      size="clamp(15rem, 40vw, 30rem)"
      equals={equals}
      withOcclusion={true}
    />
  );
};
