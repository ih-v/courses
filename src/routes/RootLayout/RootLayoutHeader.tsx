import { useNavigate, useParams } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import { style } from "../../constants";

type RootLayoutHeaderProps = {
  themeName: string;
  toggleTheme: () => void;
};

const RootLayoutHeader = ({
  themeName,
  toggleTheme,
}: RootLayoutHeaderProps) => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  return (
    <AppBar
      component="nav"
      sx={{ height: style.ROOT_HEADER_HEIGHT }}
      data-testid="root-layout-header"
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          sx={{
            mr: 2,
            backgroundColor: !courseId ? "inherit" : "secondary.light",
          }}
          onClick={() => navigate("/")}
          data-testid="root-layout-header-navigate-button"
        >
          {!courseId ? (
            <SchoolIcon data-testid="root-layout-header-home-icon" />
          ) : (
            <ArrowBackIcon data-testid="root-layout-header-back-icon" />
          )}
        </IconButton>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" noWrap component="div">
            Courses platform
          </Typography>
          <Typography variant="body1" noWrap component="div">
            Learn, grow, ahieve goals...
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Tooltip
          title={
            themeName === "light"
              ? "Toggle to dark theme"
              : "Toggle to light theme"
          }
        >
          <IconButton
            edge="end"
            onClick={toggleTheme}
            color="inherit"
            data-testid="root-layout-header-theme-button"
          >
            {themeName === "light" && (
              <DarkModeIcon data-testid="root-layout-header-light-theme-icon" />
            )}
            {themeName === "dark" && (
              <LightModeIcon data-testid="root-layout-header-dark-theme-icon" />
            )}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default RootLayoutHeader;
