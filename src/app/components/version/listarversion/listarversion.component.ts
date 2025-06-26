import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Version } from '../../../models/version';
import { VersionService } from '../../../services/version.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listarversion',
  imports: [

    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './listarversion.component.html',
  styleUrl: './listarversion.component.css',
})
export class ListarversionComponent implements OnInit {
  dataSource: MatTableDataSource<Version> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  constructor(private vS: VersionService) {}

  ngOnInit(): void {
    this.vS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.vS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
