import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { catchError, Observable, throwError, map, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { formatDate, DatePipe } from '@angular/common';


@Injectable()
export class ClienteService {

  private url: string = environment.URL;
  private BAD_REQUEST: number = environment.BAD_REQUEST;
  private urlClientes: string = 'api/clientes';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'Application/json' });

  constructor(private httpClient: HttpClient) { }

  getClientes = (): Observable<Cliente[]> =>
    this.httpClient.get<Cliente[]>(this.url + this.urlClientes, { headers: this.httpHeaders }).pipe(
      tap(response => response.forEach(c => console.log(c.nombre))),
      map(response => response.map(c => {
        c.nombre = c.nombre.toUpperCase();
        //OPCION 1
        //c.createdAt = formatDate(c.createdAt,this.FORMAT_FULL_DATE,'es-MX');
        //OPCION 2
        //let datePipe= new DatePipe('en-US');
        //c.createdAt = datePipe.transform(c.createdAt,this.FORMAT_FULL_DATE);
        //OPCION 3 pipe en la plantilla
        return c;
      })),
      tap(response => response.forEach(c => console.log(c.nombre))),
      catchError((response) => throwError(() => response.error.message))
    );

  create = (cliente: Cliente): Observable<Cliente> =>
    this.httpClient.post<Cliente>(this.url + this.urlClientes, cliente, { headers: this.httpHeaders }).pipe(
      catchError((response) => {
        if (response.status == this.BAD_REQUEST) {
          response.error.message = response.error.errors.toString().replace(",", "<br>")
        }
        return throwError(() => response.error.message)
      })
    );

  getCliente = (id: number): Observable<Cliente> =>
    this.httpClient.get<Cliente>(`${this.url}${this.urlClientes}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError((response) => throwError(() => response.error.message))
    );

  update = (cliente: Cliente): Observable<Cliente> =>
    this.httpClient.put<Cliente>(`${this.url}${this.urlClientes}/${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
      catchError((response) => {
        if (response.status == this.BAD_REQUEST) {
          response.error.message = response.error.errors.toString().replace(",", "<br>")
        }
        return throwError(() => response.error.message)
      })
    );

  delete = (id: number): Observable<Cliente> =>
    this.httpClient.delete<Cliente>(`${this.url}${this.urlClientes}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError((response) => {
        console.log(response);
        return throwError(() => response.error.message)
      })
    );
}
