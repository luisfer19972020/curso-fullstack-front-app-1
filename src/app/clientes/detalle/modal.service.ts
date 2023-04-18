import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  open: boolean = false;

  constructor() { }

  openModal = () => this.open = true;
  closeModal = () => this.open = false;
}
