import { AppBar, TextField, Container, styled, colors } from "@mui/material";

export const Header = styled(AppBar)({
  background: "#252f3D",
  color: "white",
  padding: "16px",
  display: "flex",
  justifyContent: "space-between",
  "& .logo": {
    width: "294px",
    "@media (max-width: 600px)": {
      width: "148px",
    },
  },
});

export const FormContainer = styled(Container)({
  marginTop: "50px",
  "& .form__container": {
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    padding: "30px",
    position: "relative",
  },
  "& .btn": {
    width: "145px",
  },
  "& .btn__container": {
    gap: "50px",
    padding: "30px 0px",
    "@media (max-width: 600px)": {
      flexDirection: "column", // Stack buttons vertically
      alignItems: "center", // Center buttons horizontally
      marginTop: "15px", // Adjust margin for smaller screens
      gap: "10px",
      padding: "30px 10px",
      "& > button": {
        width: "100%",
      },
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px",
      marginTop: "10px",
    },
  },
});

export const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#4D5C6F",
    },
    "&.Mui-focused fieldset": {
      // borderColor: "#4D5C6F",
    },
  },
  "& label": {
    paddingRight: "8px !important",
    color: "#4D5C6F !important",
    "&::after": {
      content: '" * "',
      color: "#CF4055",
      position: "absolute",
      top: -1,
      right: 1,
    },
    "& .css-19qnlrw-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
      color: "#4D5C6F !important",
      // fontWeight: 600,
    },
    "& .css-113d811-MuiFormLabel-root-MuiInputLabel-root.Mui-error": {
      fontWeight: 600,
    },
  },
  borderRadius: "30px",
  "& ..css-5ziy27-MuiAutocomplete-root .MuiInputLabel-root": {
    color: "#4D5C6F",
    fontWeight: 600,
  },
  "& .MuiFormLabel-asterisk": {
    color: "#CF4055",
  },
});
