import { Component } from '@angular/core';
import { ListaraplicacionComponent } from "./listaraplicacion/listaraplicacion.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-aplicacion',
  imports: [ListaraplicacionComponent,RouterOutlet],
  templateUrl: './aplicacion.component.html',
  styleUrl: './aplicacion.component.css'
})
export class AplicacionComponent {
  constructor(public route:ActivatedRoute){}

}
