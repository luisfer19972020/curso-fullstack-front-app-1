import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  constructor(private clienteService: ClienteService) { }
  ngOnInit(): void {
    this.clienteService.getClientes().subscribe({
      next: response => this.clientes = response,
      error: (message) =>
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: message,
        })
    });
  }

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
