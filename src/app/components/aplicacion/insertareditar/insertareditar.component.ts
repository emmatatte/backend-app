import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Aplicacion } from '../../../models/aplicacion';
import { AplicacionService } from '../../../services/aplicacion.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertareditar',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css',
})
export class InsertareditarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  aplicacion: Aplicacion = new Aplicacion();
  estado: boolean = true

  id: number = 0
  edicion: boolean = false

  //aqui van las opciones para eligir en el selct
  tipos: { value: string; viewValue: string }[] = [
    { value: "SO", viewValue: "Sistema Operativo" },
    { value: "Ofimática", viewValue: "Ofimática" }
  ]

  constructor(
    private aS: AplicacionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      //actualizar
      this.init()
    })

    this.form = this.formBuilder.group({
      codigo: [''],
      name: ['', Validators.required],
      state: ['', Validators.required],
      dateimpl: ['', Validators.required],
      amount: ['', Validators.required],
      type: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.aplicacion.idApp = this.form.value.codigo;
      this.aplicacion.nameApp = this.form.value.name;
      this.aplicacion.stateApp = this.form.value.state;
      this.aplicacion.implementationDateApp = this.form.value.dateimpl;
      this.aplicacion.amountApp = this.form.value.amount;
      this.aplicacion.typeApp = this.form.value.type;
      if (this.edicion) {
        //actualizar
        this.aS.update(this.aplicacion).subscribe(() => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      } else {
        //insertar
        this.aS.insert(this.aplicacion).subscribe(() => {
          this.aS.list().subscribe((data) => {
            this.aS.setList(data);
          });
        });
      }
      this.router.navigate(['aplicaciones']);
    }
  }

  init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idApp),
          name: new FormControl(data.nameApp),
          state: new FormControl(data.stateApp),
          dateimpl: new FormControl(data.implementationDateApp),
          amount: new FormControl(data.amountApp),
          type: new FormControl(data.typeApp)
        })
      })
    }
  }
}
