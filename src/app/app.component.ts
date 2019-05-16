import {Component} from '@angular/core';
import {ModalService} from './modal/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Test';

  get isModalOpen(): boolean {
    return this.modalService.isOpen;
  }

  constructor(private modalService: ModalService) {

  }
}
