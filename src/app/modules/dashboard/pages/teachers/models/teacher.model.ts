import { Course } from "../../courses/models/course.models";

export interface Teacher {
    id: string;
    name: string;
    courseId: string;
    course?: Course;
}