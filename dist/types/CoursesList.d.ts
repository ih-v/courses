import { ICourse } from "./Course";
export interface ICoursesListItem extends Omit<ICourse, "lessons"> {
    lessonsCount: number;
}
export interface ICoursesListItemResponse extends Omit<ICoursesListItem, "launchDate"> {
    launchDate: string;
}
