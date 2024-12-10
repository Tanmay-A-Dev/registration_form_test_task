import logo from "./logo.png";
import "./App.css";
import CreateUserAccount from "./components/CreateUserAccount";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Lato, sans-serif", // Apply Lato font globally
      h1: {
        fontFamily: "Lato, sans-serif", // Optional: Customize specific typography variants
        fontWeight: 700,
      },
      h2: {
        fontFamily: "Lato, sans-serif",
        fontWeight: 700,
      },
      body1: {
        fontFamily: "Lato, sans-serif",
        fontWeight: 400,
      },
      body2: {
        fontFamily: "Lato, sans-serif",
        fontWeight: 300,
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CreateUserAccount />
    </ThemeProvider>
  );
}

export default App;
