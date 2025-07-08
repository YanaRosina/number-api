"use client";

import { Box } from "@mui/material";
import NumberFactContainer from "@/components/NumberFactContainer";

const HomeView = () => {
  return (
    <Box
      sx={{
        padding: 4,
        color: "text.primary",
      }}
    >
      {/* <Typography variant="h4" gutterBottom textAlign="center">
        Добро пожаловать!
      </Typography> */}

      <NumberFactContainer />
    </Box>
  );
};

export default HomeView;
