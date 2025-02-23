import { Teacher } from "../../teachers/models/teacher.model";

export interface Course {
    id: string;
    name: string;
    teachers?: Teacher[];
}