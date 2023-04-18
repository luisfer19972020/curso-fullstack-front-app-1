import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})

export class DetalleComponent implements OnInit {
  FILE_ROUTE: string = `${environment.URL}api/uploads/img/`;
  @Input() cliente: Cliente;
  public photoSelected: File;
  public progreso: number = 0;
  constructor(private clienteService: ClienteService, public modalService: ModalService) {
  }

  ngOnInit(): void {
  }

  selectPhoto = (event) => {
    if (event.target.files[0].type.indexOf('image') > -1) {
      this.photoSelected = event.target.files[0];
      this.progreso = 0;
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Formato de imagen incorrecto',
        html: 'La imagen debe ser seleciconada con los siguientes formatos: .JPG|.PNG',
      });
    }
  }

  uploadPhoto = () => this.photoSelected ? this.clienteService.upload(this.photoSelected, this.cliente.id).subscribe({
    next: (event) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progreso = Math.round((event.loaded / event.total) * 100);
      } else if (event.type === HttpEventType.Response) {
        this.cliente = event.body as Cliente;
        Swal.fire({
          title: `Foto cargada para el cliente ${this.cliente.nombre} ${this.cliente.apellido} con exito!`,
          icon: 'success',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      }
    },
    error: (message) => Swal.fire({
      icon: 'error',
      title: 'Oops...',
      html: message,
    })
  }) : Swal.fire({
    icon: 'error',
    title: 'Imagen requerida',
    html: 'Debes seleccionar una imagen',
  });

  closeModal = () => {
    this.modalService.closeModal();
    this.photoSelected = null;
    this.progreso = 0;
  }
}
