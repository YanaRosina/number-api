import { Box, Button, Typography, Grow, Zoom } from "@mui/material";

interface ResultProps {
  number: string;
  random: boolean;
  type: string;
  fact: string;
  onBack: () => void;
}

const getTypeDisplayName = (type: string): string => {
  const typeMap: Record<string, string> = {
    math: "Math",
    trivia: "Trivia",
    date: "Date",
    year: "Year",
  };
  return typeMap[type] || type;
};

const Result = ({ number, random, type, fact, onBack }: ResultProps) => {
  return (
    <Grow in timeout={500}>
      <Box
        sx={{
          backgroundColor: "transparant",
          padding: 4,
          borderRadius: 4,
          maxWidth: 500,
          minWidth: 350,
          width: "100%",
          boxShadow: "0 0 20px rgba(100, 181, 246, 0.2)",
          //   color: "primary.main",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0 0 30px rgba(100, 181, 246, 0.3)",
            transform: "translateY(-2px)",
          },
        }}
      >
        <Zoom in timeout={600}>
          <Typography
            variant="h6"
            color="primary.main"
            sx={{ mb: 2, fontWeight: 600 }}
          >
            Your result
          </Typography>
        </Zoom>

        <Grow in timeout={800}>
          <Typography sx={{ mb: 1 }}>
            Your number: {random ? "random" : number || "не указано"}
          </Typography>
        </Grow>

        <Grow in timeout={1000}>
          <Typography sx={{ mb: 1 }}>
            Selected type: {getTypeDisplayName(type)}
          </Typography>
        </Grow>

        <Grow in timeout={1200}>
          <Box
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 2,
              backgroundColor: "rgba(100, 181, 246, 0.1)",
              border: "1px solid rgba(100, 181, 246, 0.2)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "rgba(100, 181, 246, 0.15)",
                transform: "scale(1.01)",
              },
            }}
          >
            <Typography
              sx={{
                fontStyle: fact ? "normal" : "italic",
                fontSize: "1.1rem",
                lineHeight: 1.6,
              }}
            >
              {fact || "Факт не найден"}
            </Typography>
          </Box>
        </Grow>

        <Grow in timeout={1400}>
          <Button
            variant="contained"
            color="primary"
            onClick={onBack}
            sx={{
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
            fullWidth
          >
            Back
          </Button>
        </Grow>
      </Box>
    </Grow>
  );
};

export default Result;
