import { describe, test, expect, vi, MockedFunction, afterEach } from "vitest";

import baseApi from "../../api/base.api";
import { getAll, getById } from "../../api/courses.api";
import {
  FAKE_ALL_COURSES_DATA,
  FAKE_ALL_COURSES_SERIALIZED_DATA,
  FAKE_COURSE_DATA,
  FAKE_COURSE_SERIALIZED_DATA,
} from "../fakeData";

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

describe("Testing courses api", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("getAll", async () => {
    (baseApi.get as MockedFunction<typeof baseApi.get>).mockResolvedValue(
      Promise.resolve({ data: { courses: FAKE_ALL_COURSES_DATA } })
    );

    const courses = await getAll();

    expect(courses).toEqual(FAKE_ALL_COURSES_SERIALIZED_DATA);
    expect(baseApi.get).toHaveBeenCalledWith("/core/preview-courses");
    expect(baseApi.get).toHaveBeenCalledTimes(1);
  });

  test("getById", async () => {
    (baseApi.get as MockedFunction<typeof baseApi.get>).mockResolvedValue(
      Promise.resolve({ data: FAKE_COURSE_DATA })
    );

    const courses = await getById(FAKE_COURSE_DATA.id);

    expect(courses).toEqual(FAKE_COURSE_SERIALIZED_DATA);
    expect(baseApi.get).toHaveBeenCalledWith(
      `/core/preview-courses/${FAKE_COURSE_DATA.id}`
    );
    expect(baseApi.get).toHaveBeenCalledTimes(1);
  });
});
