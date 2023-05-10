import { memo } from "react";
import LockIcon from "@mui/icons-material/Lock";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import secondsToTime from "../../../utils/secondsToTime";
import { ICourseLessonsListItem } from "../../../types";

import { SetVideoFunction } from "./CourseLessonsList";

type CourseLessonsListItemProps = {
  selectedLink: string;
  item: ICourseLessonsListItem;
  orderNum: number;
  onClick: SetVideoFunction;
};

const CourseLessonsListItem = ({
  selectedLink,
  item,
  orderNum,
  onClick,
}: CourseLessonsListItemProps) => {
  const corrupted = !item.link;
  const locked = item.status === "locked";

  const handleClick = () => {
    if (item.link && !locked) {
      onClick(item.link, item.title, orderNum);
    }
  };

  return (
    <ListItem alignItems="flex-start" data-testid="course-lessons-list-item">
      <ListItemButton
        selected={!corrupted && selectedLink === item.link}
        disabled={locked || corrupted}
        sx={{
          "&.Mui-selected": {
            backgroundColor: "primary.light",
          },
        }}
        onClick={handleClick}
        data-testid="course-lessons-list-item-button"
      >
        <ListItemAvatar>
          <Avatar
            alt=""
            src={item.previewImageLink + "/lesson-" + item.order + ".webp"}
          />
        </ListItemAvatar>
        <ListItemText
          primary={`#${orderNum + 1} ${item.title}`}
          secondary={`Duration: ${secondsToTime(item.duration)}`}
        />
        {locked && (
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
        )}
        {corrupted && (
          <ListItemIcon>
            <BrokenImageIcon />
          </ListItemIcon>
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default memo(CourseLessonsListItem);
