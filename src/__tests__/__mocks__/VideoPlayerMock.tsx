import { VideoHTMLAttributes, forwardRef } from "react";

export type VideoPlayerProps = {
  link: string;
  attachCb?: () => void;
  errorCb?: () => void;
} & VideoHTMLAttributes<HTMLVideoElement>;

export const VideoPlayerMock = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ link, attachCb, errorCb, ...props }, ref) => {
    return (
      <div data-testid="video-player-mock">
        <video ref={ref} {...props} />
        <button onClick={attachCb} data-testid="video-attach-button" />
        <button onClick={errorCb} data-testid="video-error-button" />
      </div>
    );
  }
);
