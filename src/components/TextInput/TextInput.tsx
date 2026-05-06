// 3rd Party Modules
import { motion } from "motion/react";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";

// Local Modules
import styles from "./TextInput.module.css";

// Local Components
type EyeIconProps = { handleClick: () => void; show: boolean };
const EyeIcon = ({ handleClick, show }: EyeIconProps) => {
  return (
    <button className={styles.eye} onClick={handleClick} type="button">
      {show ? <BiSolidShow size="1.3rem" /> : <BiSolidHide size="1.3rem" />}
    </button>
  );
};
type ErrorMessageProps = { showError: boolean; error: string | null };
const ErrorMessage = ({ showError, error }: ErrorMessageProps) => {
  return (
    <AnimatePresence>
      {showError && error && (
        <motion.span
          key={styles.error}
          className={styles.error}
          initial={{ opacity: 0.2, height: 0 }}
          animate={{ opacity: 1, height: "fit-content" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35 }}
        >
          {error}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

// MAIN COMPONENT
type TextInputProps = {
  label: string;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  minLength?: number;
  maxLength?: number;
  regex?: RegExp;
  regexError?: string;
  error: string | null;
  setError: (error: string | null) => void;
  size?: string;
  equals?: string;
  showError?: boolean;
  withOcclusion?: boolean;
};
export const TextInput = ({
  label,
  placeholder = "",
  value,
  setValue,
  minLength = 0,
  maxLength = 999,
  regex = new RegExp(/^.*$/),
  regexError = "",
  error,
  setError,
  size = "50vw",
  equals,
  showError = true,
  withOcclusion = false,
}: TextInputProps) => {
  const [show, setShow] = useState<boolean>(!withOcclusion);

  const handleClick = () => {
    setShow((prev) => !prev);
  };

  const validateInput = (inputValue: string) => {
    if (!inputValue) {
      setError("Required");
    } else if (inputValue.length < minLength) {
      setError(`Minimum ${minLength} characters`);
    } else if (inputValue.length > maxLength) {
      setError(`Maximum ${maxLength} characters`);
    } else if (!new RegExp(regex).test(inputValue)) {
      setError(regexError);
    } else if (equals && equals !== inputValue) {
      setError("Values don't match");
    } else {
      setError(null);
    }
  };

  const id = styles.input + label;
  return (
    <div className={styles.div} style={{ width: size }}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <input
          className={`${styles.input} ${withOcclusion ? styles.inputWithOclusion : ""}`}
          type={show ? "text" : "password"}
          id={id}
          name={id}
          value={value}
          onChange={(e) => {
            validateInput(e.target.value);
            setValue(e.target.value);
          }}
          placeholder={placeholder}
        />
        {withOcclusion && <EyeIcon handleClick={handleClick} show={show} />}
      </div>
      <ErrorMessage showError={showError} error={error} />
    </div>
  );
};
