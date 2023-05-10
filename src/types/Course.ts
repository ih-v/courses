export interface ICourseVideoPreview {
  link: string;
  duration: number;
  previewImageLink: string;
}

export interface ICourseMeta {
  slug: string;
  skills?: string[];
  courseVideoPreview?: ICourseVideoPreview;
}

export interface ICourseLessonsListItem {
  id: string;
  title: string;
  duration: number;
  order: number;
  type: string;
  status: "unlocked" | "locked";
  link?: string;
  previewImageLink: string;
  meta: { difficulty?: string } | null;
}

export interface ICourse {
  id: string;
  title: string;
  tags: string[];
  launchDate: Date;
  status: string;
  description: string;
  duration: number;
  previewImageLink: string;
  rating: number;
  meta: ICourseMeta;
  lessons: ICourseLessonsListItem[];
  containsLockedLessons: boolean;
}

export interface ICourseResponse extends Omit<ICourse, "launchDate"> {
  launchDate: string;
}
