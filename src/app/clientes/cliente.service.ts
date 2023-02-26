import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { Observable, of } from 'rxjs';
@Injectable()
export class ClienteService {

  constructor() { }
  getClintes = (): Observable<Cliente[]> => of(CLIENTES);
}
