export const FluidImageMock = ({ ...props }) => {
  return (
    <div data-testid="fluid-image-mock">
      <img alt="" {...props} />;
    </div>
  );
};
