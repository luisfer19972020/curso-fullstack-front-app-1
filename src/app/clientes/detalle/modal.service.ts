import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  open: boolean = false;
  private _uploadNotification = new EventEmitter<any>();

  constructor() { }
  
  get uploadNotification(): EventEmitter<any> {
    return this._uploadNotification;
  }
  openModal = () => this.open = true;
  closeModal = () => this.open = false;
}
