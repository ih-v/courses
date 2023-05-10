import { useEffect, useRef } from "react";

import noImg from "../../../assets/no-img.jpg";
import noVideoImg from "../../../assets/no-video.webp";
import loadingImg from "../../../assets/loading-white.gif";
import VideoPlayer from "../../../components/VideoPlayer";
import FluidImage from "../../../components/FluidImage";

import { CoursesListItemState } from "./CoursesListItem";

type CoursesListItemMediaProps = {
  status: CoursesListItemState;
  videoLink?: string;
  imageLink: string;
  onSuccess: () => void;
  onError: () => void;
};

const CoursesListItemMedia = ({
  status,
  videoLink,
  imageLink,
  onSuccess,
  onError,
}: CoursesListItemMediaProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (status === "success") {
        videoRef.current.playbackRate = 1.5;
        videoRef.current.play();
      } else {
        if (videoRef.current.played) videoRef.current.pause();
      }
    }
  }, [status]);

  const mountVideo =
    videoLink && (status === "pending" || status === "success");

  return (
    <>
      {mountVideo && (
        <VideoPlayer
          ref={videoRef}
          style={{
            display: status === "pending" ? "none" : "inherit",
            width: "100%",
            height: "100%",
            objectFit: "fill",
          }}
          link={videoLink}
          controls={false}
          muted={true}
          playsInline={true}
          attachCb={onSuccess}
          errorCb={onError}
          data-testid="courses-list-item-media-video"
        />
      )}
      {status === "pending" && (
        <FluidImage
          src={loadingImg}
          data-testid="courses-list-item-media-img-pending"
        />
      )}
      {status === "error" && (
        <FluidImage
          src={noVideoImg}
          data-testid="courses-list-item-media-img-error"
        />
      )}
      {status === "idle" && (
        <FluidImage
          src={imageLink}
          onError={(e) => {
            e.currentTarget.src = noImg;
          }}
          data-testid="courses-list-item-media-img-idle"
        />
      )}
    </>
  );
};

export default CoursesListItemMedia;
