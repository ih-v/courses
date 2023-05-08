import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import CoursePreviewMedia from "../../../routes/Courses/CoursePreviewMedia";

describe("CoursePreviewMedia component testing", () => {
  test("Rendering with state: 'idle' - show course image", () => {
    render(
      <CoursePreviewMedia
        status={"idle"}
        imageLink={"https://somelink/cover.webp"}
        videoLink={"https://somelink/videos"}
        onSuccess={() => {}}
        onError={() => {}}
      />
    );
    expect(screen.getByTestId("course-preview-img-idle")).toBeInTheDocument();
    expect(screen.queryByTestId("course-preview-video")).toBeNull();
    expect(screen.queryByTestId("course-preview-img-pending")).toBeNull();
    expect(screen.queryByTestId("course-preview-img-error")).toBeNull();
  });

  test("Rendering with state: 'pending' - show loading image", () => {
    render(
      <CoursePreviewMedia
        status={"pending"}
        imageLink={"https://somelink/cover.webp"}
        videoLink={"https://somelink/videos"}
        onSuccess={() => {}}
        onError={() => {}}
      />
    );
    expect(
      screen.getByTestId("course-preview-img-pending")
    ).toBeInTheDocument();
    expect(screen.getByTestId("course-preview-video")).toBeInTheDocument();
    expect(screen.getByTestId("course-preview-video")).toHaveStyle({
      display: "none",
    });
    expect(screen.queryByTestId("course-preview-img-idle")).toBeNull();
    expect(screen.queryByTestId("course-preview-img-error")).toBeNull();
  });

  test("Rendering with state: 'success' - show video", () => {
    render(
      <CoursePreviewMedia
        status={"success"}
        imageLink={"https://somelink/cover.webp"}
        videoLink={"https://somelink/videos"}
        onSuccess={() => {}}
        onError={() => {}}
      />
    );
    expect(screen.getByTestId("course-preview-video")).toBeInTheDocument();
    expect(screen.getByTestId("course-preview-video")).toHaveStyle({
      display: "inherit",
    });
    expect(screen.queryByTestId("course-preview-img-idle")).toBeNull();
    expect(screen.queryByTestId("course-preview-img-pending")).toBeNull();
    expect(screen.queryByTestId("course-preview-img-error")).toBeNull();
  });

  test("Rendering with state: 'error' - show error image", () => {
    render(
      <CoursePreviewMedia
        status={"error"}
        imageLink={"https://somelink/cover.webp"}
        videoLink={"https://somelink/videos"}
        onSuccess={() => {}}
        onError={() => {}}
      />
    );
    expect(screen.getByTestId("course-preview-img-error")).toBeInTheDocument();
    expect(screen.queryByTestId("course-preview-video")).toBeNull();
    expect(screen.queryByTestId("course-preview-img-idle")).toBeNull();
    expect(screen.queryByTestId("course-preview-img-pending")).toBeNull();
  });

  test("Rendering without videolink - show loading image", () => {
    render(
      <CoursePreviewMedia
        status={"pending"}
        imageLink={"https://somelink/cover.webp"}
        onSuccess={() => {}}
        onError={() => {}}
      />
    );
    expect(
      screen.getByTestId("course-preview-img-pending")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("course-preview-video")).toBeNull();
    expect(screen.queryByTestId("course-preview-img-idle")).toBeNull();
    expect(screen.queryByTestId("course-preview-img-error")).toBeNull();
  });
});
