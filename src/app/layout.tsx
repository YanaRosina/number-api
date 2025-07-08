import ThemeRegistry from "@/components/ThemeRegistry";
import { Box } from "@mui/material";
export const metadata = {
  title: "Numbers Api",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <ThemeRegistry>
          <Box
            sx={{
              minHeight: "100vh",
              background: "linear-gradient(to bottom right, #1f1f1f, #121212)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
