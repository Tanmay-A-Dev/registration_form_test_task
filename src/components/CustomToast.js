import { Alert, Snackbar } from "@mui/material";

const CustomToast = ({ open, message, severity }) => {
  return (
    <Snackbar
      color=""
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={3000}
      sx={{
        position: { xs: "relative", sm: "fixed" },
        bottom: { xs: "unset ", sm: "fixed" },
        left: { xs: "unset ", sm: "fixed" },
        right: { xs: "unset ", sm: "20px" },
        width: { xs: "100% ", sm: "426px" },
        top: { sm: "80px" },
        "& > div": {
          width: { xs: "100%", sx: "426px" },
          alignItems: "center",
        },
      }}
    >
      <Alert severity={severity} sx={{ marginBottom: "16px", height: "75px" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomToast;
