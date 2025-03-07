import { Course } from '../../courses/models/course.models';
import { Student } from '../../students/models/index';
export interface Enrollment {
    id: string;
    studentId: string;
    courseId: string;
    course?: Course;
    student?: Student
}