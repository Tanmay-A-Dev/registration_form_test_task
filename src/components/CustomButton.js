import React from "react";
import { ThemeProvider, createTheme, Button } from "@mui/material";

// Create a custom theme with Button customization
const theme = createTheme({
  palette: {
    primary: {
      main: "#127C95", // Custom primary color
    },
    secondary: {
      main: "#ff4081", // Custom secondary color
    },
  },
  components: {
    // Customizing the Button component globally
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Example of rounded corners for all buttons
          padding: "10px 20px", // Customize button padding
          fontWeight: "bold", // Make the text bold
        },
        containedPrimary: {
          backgroundColor: "#127C95", // Custom primary background for contained buttons
          color: "white", // Text color
          "&:hover": {
            backgroundColor: "#0f5e69", // Darker shade for hover effect
          },
        },
        containedSecondary: {
          backgroundColor: "#ff4081", // Custom secondary background for contained buttons
          color: "white",
          "&:hover": {
            backgroundColor: "#f50057", // Darker shade for hover effect
          },
        },
      },
    },
  },
});

const CustomButton = ({ children, ...props }) => {
  return (
    <ThemeProvider theme={theme}>
      <Button {...props}>{children}</Button>
    </ThemeProvider>
  );
};

export default CustomButton;
