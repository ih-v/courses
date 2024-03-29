import React, { useCallback, useEffect } from "react";
import {
  Divider,
  List,
  ListSubheader,
  Paper,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAsyncValue } from "react-router-dom";

import { useCoursesContext } from "../context/CoursesContext";

import { style } from "../../../constants";
import { ICourse } from "../../../types";

import CourseLessonsListItem from "./CourseLessonsListItem";

export type SetVideoFunction = (
  link: string,
  title: string,
  orderNum: number
) => void;

const CourseLessonsList = () => {
  const course = useAsyncValue() as ICourse;
  const { state, setState } = useCoursesContext();
  const brlg = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const theme = useTheme();

  const setVideo: SetVideoFunction = useCallback(
    (link, title, orderNum) =>
      setState((prev) => ({
        ...prev,
        videoLink: link,
        videoTitle: `#${orderNum + 1} ${title}`,
      })),
    [setState]
  );

  const firstLesson = course.lessons[0];

  useEffect(() => {
    const { link, title, status } = firstLesson;
    if (!link) {
      setVideo("corrupted", title, 0);
    } else if (status === "locked") {
      setVideo("locked", title, 0);
    } else {
      setVideo(link, title, 0);
    }
  }, [firstLesson, setVideo]);

  const containerPaddings = brlg ? 0 : 48;
  const mdWidth =
    theme.breakpoints.values.md -
    style.VIDEO_MAX_WIDH -
    parseInt(theme.spacing(2)) -
    containerPaddings;

  const mdHeight =
    (style.VIDEO_MAX_WIDH * style.VIDEO_ASPECT_RATIO[1]) /
    style.VIDEO_ASPECT_RATIO[0];

  return (
    <Paper
      sx={{
        position: { md: "absolute" },
        top: { md: style.ROOT_HEADER_HEIGHT },
        right: { md: 0 },
        width: { md: mdWidth },
        height: { md: mdHeight },
        minWidth: { xs: style.CARD_MIN_WIDTH, md: mdWidth },
        overflowY: { md: "scroll" },
        mt: style.MARGIN_PREV,
      }}
      data-testid="course-lessons-list"
    >
      <List
        subheader={
          <ListSubheader
            component="div"
            color="primary"
            sx={{ fontSize: "1.1em" }}
          >
            <b>Lessons list:</b>
          </ListSubheader>
        }
      >
        {course.lessons.map((item, i, items) => {
          return (
            <React.Fragment key={item.id}>
              <CourseLessonsListItem
                key={item.id}
                selectedLink={state.videoLink}
                item={item}
                orderNum={i}
                onClick={setVideo}
              />
              {i < items.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Paper>
  );
};

export default CourseLessonsList;
