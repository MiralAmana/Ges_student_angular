import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { StudentService } from './services/student.service';
import { StudentAddEditComponent } from './student-add-edit/student-add-edit.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [
    MatTableModule, 
    MatToolbarModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ges_student';
  students: any[] = [];
  displayedColumns: string[] = ['firstname', 'lastname', 'classe', 'actions'];

  constructor(private _dialog: MatDialog, private _studentService: StudentService) {}

  ngOnInit() {
    // Fetch students
    this._studentService.getStudents().subscribe(data => {
      this.students = data;
    });
  }

  open_Add_Edit_StudentForm(student?: any): void {
    const dialogRef = this._dialog.open(StudentAddEditComponent, {
      data: student, // Pass the student data if editing
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (student) {
          // Edit existing student
          const index = this.students.findIndex(s => s.id === student.id);
          if (index !== -1) {
            this.students[index] = result; // Update student in the list
          }
        } else {
          // Add new student
          this.students.push(result);
        }
      }
    });
  }

  deleteStudent(studentId: number) {
    this._studentService.deleteStudent(studentId).subscribe({
      next: () => {
        // Remove student from the list after deletion
        this.students = this.students.filter(student => student.id !== studentId);
        alert('Student deleted successfully');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
