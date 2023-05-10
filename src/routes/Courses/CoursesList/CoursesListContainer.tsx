import { useMemo } from "react";
import { useAsyncValue } from "react-router-dom";
import { Box, Grid } from "@mui/material";

import { ICoursesListItem } from "../../../types";
import { style } from "../../../constants";

import { useCoursesContext } from "../context/CoursesContext";

import CoursesListItem from "./CoursesListItem";
import CoursesPagination from "./CoursesListPagination";

const paginateDivider = 10;

const CoursesListContainer = () => {
  const courses = useAsyncValue() as ICoursesListItem[];
  const { state } = useCoursesContext();

  const filteredCourses = useMemo(() => {
    return courses.filter((item) => {
      if (state.search) {
        const searchWords = state.search.toLowerCase().trim().split(/\s+/);
        const searchResult = searchWords.every((word) => {
          return item.title.toLowerCase().includes(word);
        });
        if (!searchResult) return false;
      }
      if (state.rating && item.rating < state.rating) return false;

      if (state.filterLocked && item.containsLockedLessons) return false;

      return true;
    });
  }, [courses, state.filterLocked, state.rating, state.search]);

  const pageCourses = useMemo(() => {
    const startIdx = (state.page - 1) * paginateDivider;
    const endPageIdx = (state.page - 1) * paginateDivider + paginateDivider;
    const endIdx =
      endPageIdx <= filteredCourses.length
        ? endPageIdx
        : filteredCourses.length;
    return filteredCourses.slice(startIdx, endIdx);
  }, [filteredCourses, state.page]);

  return (
    <Box
      minWidth={style.CARD_MIN_WIDTH}
      mt={style.MARGIN_PREV}
      pb={7}
      data-testid="courses-list-container"
    >
      <Grid container spacing={2}>
        {pageCourses.map((course) => {
          return (
            <Grid key={course.id} item xs={12} md={6}>
              <CoursesListItem item={course} />
            </Grid>
          );
        })}
      </Grid>
      <CoursesPagination
        length={filteredCourses.length}
        divider={paginateDivider}
      />
    </Box>
  );
};

export default CoursesListContainer;
