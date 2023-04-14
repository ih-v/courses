import { ICourse, ICoursePreview } from "../types";
import $api from ".";

export const getAll = async (): Promise<ICoursePreview[]> => {
  const result = await $api.get("/core/preview-courses");
  return result.data.courses;
};

export const getById = async (id: string | undefined): Promise<ICourse> => {
  const result = await $api.get(`/core/preview-courses/${id}`);
  const launchDate = result?.data?.launchDate;
  if (launchDate) {
    result.data.launchDate = new Date(launchDate);
  }
  return result.data;
};
