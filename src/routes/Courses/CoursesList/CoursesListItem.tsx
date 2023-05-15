import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";

import { ICoursesListItem } from "../../../types";

import CoursesListItemMedia from "./CoursesListItemMedia";

type CoursesListItemProps = {
  item: ICoursesListItem;
};

export type CoursesListItemState = "idle" | "pending" | "success" | "error";

const CoursesListItem = ({ item }: CoursesListItemProps) => {
  const [status, setStatus] = useState<CoursesListItemState>("idle");
  const navigate = useNavigate();

  const handleSuccess = useCallback(() => {
    setStatus("success");
  }, []);

  const handleError = useCallback(() => {
    setStatus("error");
  }, []);

  const handleMouseEnter = () => {
    if (status === "idle") {
      setStatus("pending");
    }
  };

  const handleMouseLeave = () => {
    if (status !== "idle") {
      setStatus("idle");
    }
  };

  const handleCardClick = () => {
    navigate(`course/${item.id}`);
  };

  return (
    <Card
      sx={{ width: "100%", height: "100%" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      data-testid="courses-list-item"
    >
      <CardActionArea
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <CardHeader
          title={item.title}
          subheader={`Published: ${new Date(item.launchDate).toDateString()}`}
          titleTypographyProps={{ color: "primary" }}
        />

        <CardMedia
          sx={{
            width: "100%",
            height: { sx: "210px", md: "220px", lg: "230px" },
          }}
        >
          <CoursesListItemMedia
            status={status}
            imageLink={item.previewImageLink + "/cover.webp"}
            videoLink={item.meta.courseVideoPreview?.link}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </CardMedia>
        <CardContent>
          <Typography variant="body1">{item.description}</Typography>
          <Typography gutterBottom variant="h6" color="secondary.light">
            {`Lessons count: ${item.lessonsCount}`}
          </Typography>
          {item.meta.skills && (
            <Typography gutterBottom variant="body2" color="text.secondary">
              {`Skills: ${item.meta.skills.join(", ")}`}
            </Typography>
          )}
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {item.containsLockedLessons && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "warning.light",
              }}
            >
              <LockIcon />
              <Typography variant="body1">Contains locked lessons</Typography>
            </Box>
          )}
          {!item.containsLockedLessons && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "success.light",
              }}
            >
              <LockOpenIcon />
              <Typography variant="body1">Lessons unlocked</Typography>
            </Box>
          )}
          <Rating value={item.rating} readOnly sx={{ alignSelf: "end" }} />
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default CoursesListItem;
