import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Paper,
  Grow,
  Collapse,
} from "@mui/material";
import { useState, ChangeEvent, FormEvent } from "react";
import { useFormValidation } from "@/hooks/useFormValidation";

type RadioOption = "option1" | "option2" | "option3" | "option4";
type FactType = "math" | "trivia" | "date" | "year";

interface CustomFormProps {
  onSubmit: (numbers: string, type: FactType, random: boolean) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const CustomForm = ({ onSubmit, loading, error }: CustomFormProps) => {
  const [inputValue, setInputValue] = useState("");
  const [radioValue, setRadioValue] = useState<RadioOption | "">("");
  const [randomChecked, setRandomChecked] = useState(false);

  const { inputError, validateInput, clearError } = useFormValidation();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (!radioValue || randomChecked) return;
    if (value.length > 4) return;

    validateInput(value, radioValue);
    setInputValue(value);
  };

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as RadioOption;
    setRadioValue(value);
    setRandomChecked(false);
    setInputValue("");
    clearError();
  };

  const handleRandomChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRandomChecked(event.target.checked);
    if (event.target.checked) {
      setInputValue("");
      clearError();
    }
  };

  const getFactType = (radioValue: RadioOption): FactType => {
    const typeMap: Record<RadioOption, FactType> = {
      option1: "math",
      option2: "trivia",
      option3: "date",
      option4: "year",
    };
    return typeMap[radioValue];
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (inputError || !radioValue) return;
    if (!randomChecked && !inputValue) return;

    const numbers = randomChecked ? "" : inputValue;
    const factType = getFactType(radioValue);

    await onSubmit(numbers, factType, randomChecked);
  };

  const handleClear = () => {
    setInputValue("");
    setRadioValue("");
    setRandomChecked(false);
    clearError();
  };

  const isFormValid =
    radioValue && (randomChecked || (inputValue && !inputError));

  return (
    <Grow in timeout={500}>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "transparent",
          padding: 4,
          borderRadius: 4,
          maxWidth: 500,
          width: "100%",
          boxShadow: "0 0 20px rgba(100, 181, 246, 0.2)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 0 30px rgba(100, 181, 246, 0.3)",
            transform: "translateY(-2px)",
          },
        }}
      >
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          Find out interesting facts about your number
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grow in timeout={700}>
            <FormControl component="fieldset" margin="normal" fullWidth>
              <FormLabel sx={{ color: "primary.main", mb: 1 }}>
                Select the option
              </FormLabel>
              <RadioGroup value={radioValue} onChange={handleRadioChange}>
                <FormControlLabel
                  value="option1"
                  control={<Radio color="primary" />}
                  label="Math"
                />
                <FormControlLabel
                  value="option2"
                  control={<Radio color="primary" />}
                  label="Trivia"
                />
                <FormControlLabel
                  value="option3"
                  control={<Radio color="primary" />}
                  label="Date"
                />
                <FormControlLabel
                  value="option4"
                  control={<Radio color="primary" />}
                  label="Year"
                />
              </RadioGroup>
            </FormControl>
          </Grow>

          <Grow in timeout={900}>
            <TextField
              fullWidth
              label="Enter a number"
              variant="outlined"
              value={inputValue}
              onChange={handleInputChange}
              error={!!inputError}
              helperText={inputError}
              margin="normal"
              color="primary"
              disabled={!radioValue || randomChecked}
              sx={{
                input: { color: "#fff" },
                label: { color: "primary.main" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "primary.main" },
                  "&:hover fieldset": { borderColor: "#50727B" },
                  "&.Mui-focused fieldset": { borderColor: "primary.main" },
                },
                transition: "all 0.3s ease-in-out",
              }}
            />
          </Grow>

          <Grow in timeout={1100}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={randomChecked}
                  onChange={handleRandomChange}
                  disabled={!radioValue}
                />
              }
              label="Random"
              sx={{ color: "primary.main", mb: 2 }}
            />
          </Grow>

          <Grow in timeout={1300}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isFormValid || loading}
              fullWidth
              sx={{
                mt: 3,
                fontWeight: "bold",
                textTransform: "none",
                boxShadow: "0 4px 10px rgba(100, 181, 246, 0.2)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#50727B",
                  transform: "translateY(-1px)",
                  boxShadow: "0 6px 15px rgba(100, 181, 246, 0.3)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
              }}
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </Grow>

          <Collapse in={!!error} timeout={400}>
            <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
              {error}
            </Typography>
          </Collapse>

          <Grow in timeout={1500}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClear}
              fullWidth
              sx={{
                mt: 2,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-1px)",
                },
              }}
            >
              Clear
            </Button>
          </Grow>
        </Box>
      </Paper>
    </Grow>
  );
};

export default CustomForm;
