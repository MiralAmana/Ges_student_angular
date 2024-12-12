import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // Importer HttpClientModule
import { StudentService } from './services/student.service';
import { MatDialogModule } from '@angular/material/dialog';  // Si tu utilises les dialogues
import { MatFormFieldModule } from '@angular/material/form-field';  // Modules Angular Material
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { StudentAddEditComponent } from './student-add-edit/student-add-edit.component';


@NgModule({
  declarations: [

    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  // Ajouter ici
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    AppComponent
  ],
  providers: [StudentService],
  bootstrap: []
})
export class AppModule { }
