import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
@Injectable()
export class ClienteService {

  private url: string = environment.URL;
  private urlClientes: string = 'api/clientes';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'Application/json' });

  constructor(private httpClient: HttpClient) { }

  getClintes = (): Observable<Cliente[]> =>
    this.httpClient.get<Cliente[]>(this.url + this.urlClientes, { headers: this.httpHeaders }).pipe(
      catchError((response) => throwError(() => response))
    );

  create = (cliente: Cliente): Observable<Cliente> =>
    this.httpClient.post<Cliente>(this.url + this.urlClientes, cliente, { headers: this.httpHeaders }).pipe(
      catchError((response) => throwError(() => response))
    );
}
