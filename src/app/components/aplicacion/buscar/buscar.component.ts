import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Aplicacion } from '../../../models/aplicacion';
import { AplicacionService } from '../../../services/aplicacion.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-buscar',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent implements OnInit {
  dataSource: MatTableDataSource<Aplicacion> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']
  
  tipoBusqueda:string=""
  notResults:boolean=false
  
  form:FormGroup
  constructor(private aS: AplicacionService, private fb:FormBuilder) { 
    this.form=fb.group({
      parametro:['']
    })
  }
  ngOnInit(): void {
    this.aS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })

    this.form.get('parametro')?.valueChanges.subscribe(value=>{
      this.tipoBusqueda=value
      this.buscar()
    })
  }
  buscar(){
    if(this.tipoBusqueda.trim()){
      this.aS.searchType(this.tipoBusqueda).subscribe(data=>{
        this.dataSource = new MatTableDataSource(data)
        this.notResults=data.length===0
      })
    }else{
      this.aS.list().subscribe(data=>{
        this.dataSource = new MatTableDataSource(data)
        this.notResults=false
        })
    }
  }
  }
