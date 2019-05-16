import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private _isOpen: boolean = false;

  open() {
    this._isOpen = true;
  }

  close() {
    this._isOpen = false;
  }


  get isOpen(): boolean {
    return this._isOpen;
  }
}
