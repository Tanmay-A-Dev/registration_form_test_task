import { createTheme, TextField, ThemeProvider } from "@mui/material";
import React from "react";

const CustomTextField = (props) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#A5B6CD", // Custom primary color
      },
    },
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            paddingRight: "8px !important",

            color: "#A5B6CD",
            fontWeight: 400,
            "&.Mui-focused": {
              color: "#A5B6CD",
              fontWeight: 600,
            },
            "&.Mui-error": {
              color: "#d32f2f",
            },
            "&::after": {
              content: '" * "',
              color: "#CF4055",
              position: "absolute",
              top: -1,
              right: -1,
            },
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <TextField {...props} />
    </ThemeProvider>
  );
};

export default CustomTextField;
