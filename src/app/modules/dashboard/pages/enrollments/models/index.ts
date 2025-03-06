import { Course } from '../../courses/models/course.models';
import { student } from '../../students/models/index';
export interface Enrollment {
    id: string;
    studentId: string;
    courseId: string;
    course?: Course;
    student?: student
}