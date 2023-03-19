import { Box, Typography } from "@mui/material";
import { useAsyncError } from "react-router-dom";

const Error = () => {
  const error = useAsyncError() as { message?: string };

  return (
    <Box
      height="100%"
      width="100%"
      display="flex"
      color="error.main"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      mt={10}
    >
      <Typography variant="h4">Sorry, but someting goes wrong...</Typography>
      <Typography variant="h6">
        Error! {error.message && <span>{error.message}</span>}
      </Typography>
    </Box>
  );
};

export default Error;
