import {Component, OnInit} from '@angular/core';
import {ModalService} from './services/modal.service';
import {BoardService} from '../game/services/board.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private modalService: ModalService,
              private boardService: BoardService) {
  }

  close() {
    this.modalService.close();
  }

  get userScore(): number {
    return this.boardService.userScore;
  }

  get compScore(): number {
    return this.boardService.compScore;
  }

  ngOnInit() {
  }

}
