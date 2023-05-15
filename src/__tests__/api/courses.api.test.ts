import { describe, test, expect, vi, afterEach, Mock } from "vitest";

import baseApi from "../../api/base.api";

import {
  ALL_COURSES_DATA as coursesData,
  ALL_COURSES_SERIALIZED_DATA as coursesSerializedData,
  COURSE_DATA as courseData,
  COURSE_SERIALIZED_DATA as courseSerializedData,
} from "../__fake__";

import { getAll, getById } from "../../api/courses.api";

vi.mock("../../api/base.api", () => {
  return {
    default: {
      post: vi.fn(),
      get: vi.fn(),
      delete: vi.fn(),
      put: vi.fn(),
      create: vi.fn().mockReturnThis(),
      interceptors: {
        request: {
          use: vi.fn(),
          eject: vi.fn(),
        },
        response: {
          use: vi.fn(),
          eject: vi.fn(),
        },
      },
    },
  };
});

describe("Courses api testing", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("getAll", async () => {
    (baseApi.get as Mock).mockResolvedValue({
      data: { courses: coursesData },
    });

    const courses = await getAll();

    expect(courses).toEqual(coursesSerializedData);
    expect(baseApi.get).toHaveBeenCalledWith("/core/preview-courses");
    expect(baseApi.get).toHaveBeenCalledTimes(1);
  });

  test("getById", async () => {
    (baseApi.get as Mock).mockResolvedValue({ data: courseData });

    const course = await getById(courseData.id);

    expect(course).toEqual(courseSerializedData);
    expect(baseApi.get).toHaveBeenCalledWith(
      `/core/preview-courses/${courseData.id}`
    );
    expect(baseApi.get).toHaveBeenCalledTimes(1);
  });
});
