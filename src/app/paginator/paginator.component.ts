import { Component, Input, OnInit } from '@angular/core';
import { Paginator } from '../models/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent implements OnInit {

  @Input() paginator: Paginator;

  paginas: number[];

  ngOnInit(): void {
    this.paginas = new Array(this.paginator.totalPages).fill(0)
      .map((_valor, index) => index + 1);
  }

}
