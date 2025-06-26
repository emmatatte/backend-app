import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Aplicacion } from '../../../models/aplicacion';
import { VersionService } from '../../../services/version.service';
import { Router } from '@angular/router';
import { AplicacionService } from '../../../services/aplicacion.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Version } from '../../../models/version';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-insertareditarversion',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './insertareditarversion.component.html',
  styleUrl: './insertareditarversion.component.css'
})
export class InsertareditarversionComponent  implements OnInit {
  form: FormGroup = new FormGroup({});

  ver: Version = new Version()

  listaAplicaciones:Aplicacion[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private vS: VersionService,
    private router: Router,
    private aS:AplicacionService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      numero: ['', Validators.required],
      fecha: ['', Validators.required],
      anotaciones: ['', Validators.required],
      monto: ['', Validators.required],
      responsable: ['', Validators.required],
      apli: ['', Validators.required],
    })

   this.aS.list().subscribe(data=>{
    this.listaAplicaciones=data
   })
  }
  aceptar() {
    if (this.form.valid) {
      this.ver.numberVersion = this.form.value.numero
      this.ver.dateLaunchVersion = this.form.value.fecha
      this.ver.notesChangeVersion = this.form.value.anotaciones
      this.ver.amountChangeVersion = this.form.value.monto
      this.ver.responsibleVersion = this.form.value.responsable
      this.ver.app.idApp = this.form.value.apli
      this.vS.insert(this.ver).subscribe(() => {
        this.vS.list().subscribe(data => {
          this.vS.setList(data)
        })
      })
      this.router.navigate(['versiones'])

    }
  }
}
