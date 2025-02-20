import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Course } from '../../models/course.models';

@Component({
  selector: 'app-courses-table',
  standalone: false,
  templateUrl: './courses-table.component.html',
  styleUrl: './courses-table.component.scss'
})
export class CoursesTableComponent {
  @Input ()
  dataSource: Course []=[];


  @Output()
  delete = new EventEmitter<string> ()

  @Output()
  edit = new EventEmitter<Course> ()


  displayedColumns =[
    'id','name', 'action'
  ]

}
