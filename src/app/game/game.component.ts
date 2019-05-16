import {Component, OnInit} from '@angular/core';
import {BoardService} from './services/board.service';
import {Cell} from './models/cell';
import {Validator} from './utilities/validator';
import {ModalService} from '../modal/services/modal.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  get board(): Cell[][] {
    return this.boardService.board;
  }

  get userScore(): number {
    return this.boardService.userScore;
  }

  get compScore(): number {
    return this.boardService.compScore;
  }

  constructor(private boardService: BoardService,
              private modalService: ModalService) {
  }

  ngOnInit() {
  }

  startGame(timerValue: string) {
    if (!Validator.isOnlyDigits(timerValue) || !Validator.isPositiveNumber(timerValue)) {
      console.log('Значение не верно');
      return;
    }
    this.boardService.startGame(Number(timerValue)).subscribe((isGameOver) => {
      if (isGameOver)
       this.modalService.open();
    });
  }

  userClick(row: number, col: number) {
    this.boardService.userClick(row, col);
  }


}
