import { forwardRef, ImgHTMLAttributes } from "react";

const FluidImage = forwardRef<
  HTMLVideoElement,
  ImgHTMLAttributes<HTMLImageElement>
>(({ src, ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <img
      loading="lazy"
      src={src}
      alt=""
      style={{
        width: "100%",
        height: "100%",
        objectFit: "fill",
      }}
      {...props}
    />
  );
});

export default FluidImage;
