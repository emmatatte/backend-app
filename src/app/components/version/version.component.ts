import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarversionComponent } from './listarversion/listarversion.component';

@Component({
  selector: 'app-version',
  imports: [RouterOutlet, ListarversionComponent],
  templateUrl: './version.component.html',
  styleUrl: './version.component.css',
})
export class VersionComponent {
  constructor(public route: ActivatedRoute) {}
}
