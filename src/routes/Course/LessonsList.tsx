import React, { useCallback, useEffect } from "react";
import { useAsyncValue } from "react-router-dom";

import { ICourse } from "../../types";
import { useCoursesContext } from "../../contexts/CoursesContext";

import Lesson from "./Lesson";
import {
  Divider,
  List,
  ListSubheader,
  Paper,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { style } from "../../constants";

const LessonsList = () => {
  const course = useAsyncValue() as ICourse;
  const { state, setState } = useCoursesContext();
  const brlg = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const theme = useTheme();

  const setVideo = useCallback(
    (link: string, title: string) =>
      setState((prev) => ({ ...prev, videoLink: link, videoTitle: title })),
    [setState]
  );

  useEffect(() => {
    const { link, title } = course.lessons[0];
    setVideo(link ?? "corrupted", title ?? "Video corrupted or locked");
  }, [course.lessons, setVideo]);

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
              <Lesson
                key={item.id}
                selectedLink={state.videoLink}
                item={item}
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

export default LessonsList;
