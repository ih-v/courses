import { VideoHTMLAttributes, forwardRef } from "react";

export type VideoPlayerProps = {
  link: string;
  attachCb?: () => void;
  errorCb?: () => void;
} & VideoHTMLAttributes<HTMLVideoElement>;

export const VideoPlayerMock = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ link, attachCb, errorCb, ...props }, ref) => {
    return (
      <div>
        <video ref={ref} {...props} />
        <button onClick={errorCb} data-testid="video-error-button" />
      </div>
    );
  }
);
