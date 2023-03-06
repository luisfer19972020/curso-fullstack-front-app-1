import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public title: string = "Crear Cliente";

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.cargarCliente();
  }


  cargarCliente = () => {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clienteService.getCliente(id).subscribe({
          next: (response) => this.cliente = response,
          error: (message) =>
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: message,
            })
        });
      }
    });
  }

  create = () => this.clienteService.create(this.cliente).subscribe({
    next: ({ nombre, apellido }) => {
      this.router.navigate(['/clientes']);
      Swal.fire({
        title: `Cliente ${nombre} ${apellido} ha sido creado con exito!`,
        icon: 'success',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    },
    error: (message) =>
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
      })
  });

  update = () => {
    this.clienteService.update(this.cliente).subscribe({
      next: () => {
        this.router.navigate(['/clientes']);
        Swal.fire({
          title: `Cliente ${this.cliente.nombre} ${this.cliente.apellido} ha sido actualizado con exito!`,
          icon: 'success',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      },
      error: (message) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
      })
    })
  }
}
