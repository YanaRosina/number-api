import { useState } from "react";
import { Box, Slide, Zoom } from "@mui/material";
import { useNumberFact } from "@/hooks/useNumberFact";
import CustomForm from "./CustomForm";
import Result from "./Result";

const NumberFactContainer = () => {
  const [showResult, setShowResult] = useState(false);
  const { factData, loading, error, clearFact, fetchFact } = useNumberFact();

  const handleFormSubmit = async (
    numbers: string,
    type: "math" | "trivia" | "date" | "year",
    random: boolean
  ) => {
    await fetchFact(numbers, type, random);
    setShowResult(true);
  };

  const handleBack = () => {
    clearFact();
    setShowResult(false);
  };

  return (
    <Box>
      {/* Форма */}
      <Slide
        direction="left"
        in={!showResult}
        mountOnEnter
        unmountOnExit
        timeout={600}
      >
        <Box>
          <Zoom in={!showResult} timeout={400}>
            <Box>
              <CustomForm
                onSubmit={handleFormSubmit}
                loading={loading}
                error={error}
              />
            </Box>
          </Zoom>
        </Box>
      </Slide>

      {/* Результат */}
      <Slide
        direction="left"
        in={showResult && !!factData}
        mountOnEnter
        unmountOnExit
        timeout={600}
      >
        <Box>
          <Box>
            {factData && (
              <Result
                number={factData.numbers}
                random={factData.random}
                type={factData.type}
                fact={factData.fact}
                onBack={handleBack}
              />
            )}
          </Box>
        </Box>
      </Slide>
    </Box>
  );
};

export default NumberFactContainer;
