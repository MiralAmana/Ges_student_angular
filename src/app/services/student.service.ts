import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentsSubject = new BehaviorSubject<any[]>([]);
  students$ = this.studentsSubject.asObservable();

  constructor(private _http: HttpClient) { }

  // Récupérer la liste des étudiants
  getStudents(): Observable<any> {
    return this._http.get('http://localhost:4000/students');
  }

  addstudent(data: any): Observable<any> {
    return this._http.post('http://localhost:4000/students', data);
  }
  updateStudent(id: string, studentData: any) {
    return this._http.put(`http://localhost:4000/students/${id}`, studentData);
  }
  
  deleteStudent(studentId: number): Observable<any> {
    return this._http.delete(`http://localhost:4000/students/${studentId}`);
  }
  
  
}
