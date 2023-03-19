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

import { ILesson } from "../../types";
import secondsToTime from "../../utils/secondsToTime";

type LessonProps = {
  selectedLink: string;
  item: ILesson;
  onClick: (link: string, title: string) => void;
};

const Lesson = ({ item, onClick, selectedLink }: LessonProps) => {
  const corrupted = !item.link;
  const locked = item.status === "locked";

  const handleClick = () => {
    if (item.link && !locked) {
      onClick(item.link, item.title);
    }
  };

  return (
    <ListItem alignItems="flex-start">
      <ListItemButton
        selected={!corrupted && selectedLink === item.link}
        disabled={locked || corrupted}
        onClick={() => handleClick()}
      >
        <ListItemAvatar>
          <Avatar
            alt=""
            src={item.previewImageLink + "/lesson-" + item.order + ".webp"}
          />
        </ListItemAvatar>
        <ListItemText
          primary={item.title}
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

export default Lesson;
