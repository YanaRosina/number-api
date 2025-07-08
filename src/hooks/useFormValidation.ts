import { useState, useCallback } from "react";
import { isNumber, isValidDateFormat } from "@/utils/validation";

type RadioOption = "option1" | "option2" | "option3" | "option4";

interface UseFormValidationReturn {
  inputError: string;
  validateInput: (value: string, radioValue: RadioOption) => void;
  clearError: () => void;
}

export const useFormValidation = (): UseFormValidationReturn => {
  const [inputError, setInputError] = useState("");

  const validateInput = useCallback(
    (value: string, radioValue: RadioOption) => {
      if (radioValue === "option3") {
        if (!isValidDateFormat(value)) {
          setInputError("Enter the date in MMDD format, for example: 0928");
        } else {
          setInputError("");
        }
      } else {
        if (!isNumber(value)) {
          setInputError("Enter only the number");
        } else {
          setInputError("");
        }
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setInputError("");
  }, []);

  return {
    inputError,
    validateInput,
    clearError,
  };
};
