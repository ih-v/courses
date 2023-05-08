import {
  ICourse,
  ICoursePreview,
  ICoursePreviewResponse,
  ICourseResponse,
} from "../types";
import serializateLaunchDate from "../utils/serializateLaunchDate";
import baseApi from "./base.api";

export const getAll = async (): Promise<ICoursePreview[]> => {
  const result: { data: { courses: ICoursePreviewResponse[] } } =
    await baseApi.get("/core/preview-courses");
  return result.data.courses.map((item) => serializateLaunchDate(item));
};

export const getById = async (id: string | undefined): Promise<ICourse> => {
  if (!id) {
    throw new Error("id: corrupted");
  }
  const result: { data: ICourseResponse } = await baseApi.get(
    `/core/preview-courses/${id}`
  );
  return serializateLaunchDate(result.data);
};
