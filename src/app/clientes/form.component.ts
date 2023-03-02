import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  public cliente: Cliente = new Cliente();
  public title: string = "Crear Cliente";

  constructor(private clienteService: ClienteService, private router: Router) {
  }
  create = () => this.clienteService.create(this.cliente).subscribe({
    next: (response) => {
      console.log(response)
      this.router.navigate(['/clientes']);
    },
    error: err => console.log("Error al guardar " + err)
  });

}
