import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {
  listaCurso: string[] = ['Javascript', 'Typescript', 'Java SE', 'C#', 'Php'];
  habilitar: boolean = true;

  setHabilitar = ()=> this.habilitar = !this.habilitar;
}
