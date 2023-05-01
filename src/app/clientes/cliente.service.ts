import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { catchError, Observable, throwError, map, tap } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Region } from '../models/region';


@Injectable()
export class ClienteService {

  private url: string = environment.URL;
  private BAD_REQUEST: number = environment.BAD_REQUEST;
  private urlClientes: string = 'api/clientes';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'Application/json' });
  private httpFileHeaders = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });

  constructor(private httpClient: HttpClient) { }

  getClientes = (page: number): Observable<any> =>
    this.httpClient.get<any>(this.url + this.urlClientes + `/page/${page}`, { headers: this.httpHeaders }).pipe(
      map((response: any) => response),
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
      catchError((response) => throwError(() => response.error.message))
    );

  upload = (file: File, id): Observable<HttpEvent<{}>> => {
    let formData = new FormData();
    formData.append("archivo", file);
    formData.append("id", id);
    return this.httpClient.request(new HttpRequest('POST', `${this.url}${this.urlClientes}/upload`,
      formData,
      { reportProgress: true }));
  }

  getRegiones = (): Observable<Region[]> =>
    this.httpClient.get<Region[]>(`${this.url}${this.urlClientes}/regiones`, { headers: this.httpHeaders }).pipe(
      catchError((response) => throwError(() => response.error.message))
    );
}
