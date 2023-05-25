/// <reference types="react" />
import { CoursesListItemState } from "./CoursesListItem";
type CoursesListItemMediaProps = {
    status: CoursesListItemState;
    videoLink?: string;
    imageLink: string;
    onSuccess: () => void;
    onError: () => void;
};
declare const CoursesListItemMedia: ({ status, videoLink, imageLink, onSuccess, onError, }: CoursesListItemMediaProps) => JSX.Element;
export default CoursesListItemMedia;
