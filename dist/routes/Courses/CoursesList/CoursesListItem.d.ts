/// <reference types="react" />
import { ICoursesListItem } from "../../../types";
type CoursesListItemProps = {
    item: ICoursesListItem;
};
export type CoursesListItemState = "idle" | "pending" | "success" | "error";
declare const CoursesListItem: ({ item }: CoursesListItemProps) => JSX.Element;
export default CoursesListItem;
