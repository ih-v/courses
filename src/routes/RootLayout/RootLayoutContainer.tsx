import { ReactNode } from "react";
import { Container } from "@mui/material";

import { style } from "../../constants";

type RootLayoutContainerProps = {
  children: ReactNode;
};

const RootLayoutContainer = ({ children }: RootLayoutContainerProps) => {
  return (
    <Container
      component="main"
      maxWidth="md"
      disableGutters={true}
      sx={{ position: "relative", paddingTop: `${style.ROOT_HEADER_HEIGHT}px` }}
      data-testid="root-layout-container"
    >
      {children}
    </Container>
  );
};

export default RootLayoutContainer;
