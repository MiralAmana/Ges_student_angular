import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service'; 
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
// Service pour récupérer les étudiants

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  imports: [
    MatTableModule,  // Assure-toi que MatTableModule est bien importé
    MatButtonModule,
    MatIconModule
  ]
})
export class StudentListComponent implements OnInit {
  students = [];  // Déclaration de la variable pour stocker les étudiants
  displayedColumns: string[] = ['firstname', 'lastname', 'classe', 'actions']; // Colonnes du tableau

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getStudents();  // Appel de la méthode pour récupérer les étudiants
  }

  // Méthode pour récupérer la liste des étudiants
  getStudents(): void {
    this.studentService.getStudents().subscribe((data: any) => {
      this.students = data;  // Assignation des données récupérées à la variable students
    });
  }

  // Méthode pour gérer l'édition d'un étudiant
  editStudent(studentId: string): void {
    console.log('Edit student:', studentId);
  }

  // Méthode pour gérer la suppression d'un étudiant
  deleteStudent(studentId: string): void {
    console.log('Delete student:', studentId);
  }
}
