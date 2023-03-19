import { useEffect, useRef } from "react";

import noImg from "../../assets/no-img.jpg";
import noVideo from "../../assets/no-video.webp";
import loadingImg from "../../assets/loading-white.gif";

import VideoPlayer from "../../components/VideoPlayer";
import { CoursePreviewState } from "./CoursePreview";

type CoursePreviewMediaProps = {
  status: CoursePreviewState;
  videoLink: string | undefined;
  imageLink: string;
  onSuccess: () => void;
  onError: () => void;
};

const CoursePreviewMedia = ({
  status,
  videoLink,
  imageLink,
  onSuccess,
  onError,
}: CoursePreviewMediaProps) => {
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
        />
      )}
      {status === "pending" && (
        <img
          loading="lazy"
          src={loadingImg}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fill",
          }}
        />
      )}
      {status === "error" && (
        <img
          loading="lazy"
          src={noVideo}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fill",
          }}
        />
      )}
      {status === "idle" && (
        <img
          loading="lazy"
          src={imageLink}
          alt=""
          onError={(e) => {
            e.currentTarget.src = noImg;
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fill",
          }}
        />
      )}
    </>
  );
};

export default CoursePreviewMedia;
