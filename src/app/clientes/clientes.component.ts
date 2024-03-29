import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { Paginator } from '../models/paginator';
import { Cliente } from '../models/cliente';
import { ClienteService } from './cliente.service';
import { ModalService } from './detalle/modal.service';

const PAGINATOR_LINK = '/clientes/page';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  paginator: Paginator;
  clienteSeleccionado: Cliente;
  FILE_ROUTE: string = `${environment.URL}api/uploads/img/`;
  FILE_DEFAULT_ROUTE: string = `${environment.URL}images/`;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute, private modalService: ModalService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.clienteService.getClientes(page).subscribe({
        next: response => {
          this.clientes = response.content;
          this.paginator = response;
          this.paginator.link = PAGINATOR_LINK;
        },
        error: (message) =>
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
          })
      });
    });
    this.modalService.uploadNotification.subscribe(cliente => this.clientes.map(c => {
      if (c.id == cliente.id) {
        c.foto = cliente.foto;
      }
      return c;
    })
    );
  }

  abrirModal = (cliente) => {
    this.clienteSeleccionado = cliente;
    this.modalService.openModal()
  };

  delete = ({ nombre, apellido, id }): void => {
    Swal.fire({
      title: `Segudo que desea eliminar el cliente ${nombre} ${apellido}`,
      text: "Esta accion no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(id).subscribe({
          next: () => {
            this.clientes = this.clientes.filter(c => c.id != id)
            Swal.fire(
              'Eliminado!',
              `El cliente ${nombre} ${apellido} ha sido eliminado.`,
              'success'
            )
          },
          error: (message) =>
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: message,
            })
        })
      }
    })
  }
}
