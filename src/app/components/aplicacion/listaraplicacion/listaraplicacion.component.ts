import { Component, OnInit } from '@angular/core';
import { Aplicacion } from '../../../models/aplicacion';

import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { AplicacionService } from '../../../services/aplicacion.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listaraplicacion',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule
  ],
  templateUrl: './listaraplicacion.component.html',
  styleUrl: './listaraplicacion.component.css'
})
export class ListaraplicacionComponent implements OnInit {
  dataSource: MatTableDataSource<Aplicacion> = new MatTableDataSource()

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8']

  constructor(private aS: AplicacionService) { }

  ngOnInit(): void {
    this.aS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.aS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number) {
    this.aS.deleteA(id).subscribe(data => {
      this.aS.list().subscribe(data => {
        this.aS.setList(data)
      })
    })
  }
}
