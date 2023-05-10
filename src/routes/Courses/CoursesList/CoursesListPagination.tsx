import { useEffect } from "react";
import { AppBar, Pagination, Theme } from "@mui/material";

import { useCoursesContext } from "../context/CoursesContext";

type CoursesListPaginationProps = {
  divider: number;
  length: number;
};

const CoursesListPagination = ({
  divider,
  length,
}: CoursesListPaginationProps) => {
  const { state, setState } = useCoursesContext();

  useEffect(() => {
    if (state.page > Math.ceil(length / divider)) {
      setState((prev) => ({ ...prev, page: 1 }));
    }
  }, [divider, length, setState, state.page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setState((prev) => ({ ...prev, page: value }));
  };

  return (
    <AppBar
      position="fixed"
      component="footer"
      sx={{
        alignItems: "center",
        top: "auto",
        bottom: 0,
        py: 0.5,
        bgcolor: (theme: Theme) => theme.palette.primary.light,
      }}
      data-testid="courses-list-pagination"
    >
      <Pagination
        color="secondary"
        count={Math.ceil(length / divider)}
        page={state.page}
        onChange={handlePageChange}
      />
    </AppBar>
  );
};

export default CoursesListPagination;
