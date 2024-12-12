import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-student-add-edit',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './student-add-edit.component.html',
  styleUrls: ['./student-add-edit.component.scss']
})
export class StudentAddEditComponent {
  studentForm: FormGroup;  // Corrigé le nom du formulaire
  student: any;
  Classes: { value: string; viewValue: string }[] = [
    { value: 'L3GL-0', viewValue: 'L3GL'},
    {value: 'L3RI-1',viewValue: 'L3RI' },
    { value: 'L3DATA-2', viewValue: 'L3DATASCIENCE' },
  ];

  constructor(
    private _fb: FormBuilder,
    private _studentService: StudentService,
    public dialogRef: MatDialogRef<StudentAddEditComponent>,  // Injection de dialogRef
    @Inject(MAT_DIALOG_DATA) public data: any  // Injection des données de l'étudiant
  ) {
    // Si des données sont passées, pré-remplir le formulaire
    if (data) {
      this.student = data;
      this.studentForm = this._fb.group({
        firstname: [this.student.firstname],
        lastname: [this.student.lastname],
        classe: [this.student.classe],
      });
    } else {
      // Formulaire vide pour l'ajout
      this.studentForm = this._fb.group({
        firstname: '',
        lastname: '',
        classe: '',
      });
    }
  }

  // Méthode pour soumettre le formulaire
  onFormSubmit() {
    if (this.studentForm.valid) {
      const studentData = this.studentForm.value;
  
      if (this.student && this.student.id) {
        // Mise à jour d'un étudiant existant
        this._studentService.updateStudent(this.student.id, studentData).subscribe({
          next: (updatedStudent) => {
            this.dialogRef.close(updatedStudent);  // Ferme le dialog et renvoie l'étudiant mis à jour
          },
          error: (err) => {
            console.error(err);
          },
        });
      } else {
        // Ajout d'un nouvel étudiant
        this._studentService.addstudent(studentData).subscribe({
          next: (newStudent) => {
            this.dialogRef.close(newStudent);  // Ferme le dialog et renvoie l'étudiant ajouté
          },
          error: (err) => {
            console.error(err);
          },
        });
      }
    }
  }
  
  
  // Méthode pour annuler l'édition
  onCancel() {
    this.dialogRef.close();  // Ferme simplement le dialog sans renvoyer de données
  }
}
