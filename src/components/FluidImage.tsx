import { forwardRef, ImgHTMLAttributes } from "react";

const FluidImage = forwardRef<
  HTMLImageElement,
  ImgHTMLAttributes<HTMLImageElement>
>(({ ...props }: ImgHTMLAttributes<HTMLImageElement>, ref) => {
  return (
    <img
      {...props}
      ref={ref}
      loading="lazy"
      alt=""
      style={{
        width: "100%",
        height: "100%",
        objectFit: "fill",
      }}
    />
  );
});

export default FluidImage;
