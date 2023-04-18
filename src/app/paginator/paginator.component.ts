import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Paginator } from '../models/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() paginator: Paginator;

  paginas: number[];

  desde: number;
  hasta: number;

  inicial: number;
  final: number;

  ngOnInit(): void {
    this.initPaginatorData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Esto para optimizar y actualizar los datos del paginador solo si
    //ha habido un cambio en la propiedad paginator y no en otra cosa
    if (changes['paginator'].previousValue) {
      this.initPaginatorData();
    }
  }

  initPaginatorData = () => {
    this.final = this.paginator.size * (this.paginator.number + 1) - (this.paginator.size - this.paginator.numberOfElements);
    this.inicial = this.final - this.paginator.numberOfElements + 1;
    if (this.paginator.totalPages > 5) {
      //formula para obtener el desde: minimo del (maximo de 1 y el numero de pagina actual  -4) y el total de paginas -5 
      this.desde = Math.min(Math.max(1, this.paginator.number - 4), this.paginator.totalPages - 5);//3
      //formula para obtener el hasta: maximo del (minimo del total de paginas y el numero de pagina actual + 4) y 6
      this.hasta = Math.max(Math.min(this.paginator.totalPages, this.paginator.number + 4), 6);//11
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0)
        .map((_valor, index) => index + this.desde);
    } else {
      this.paginas = new Array(this.paginator.totalPages).fill(0)
        .map((_valor, index) => index + 1);
    }
  }
}
