import {Injectable} from '@angular/core';
import {Cell} from '../models/cell';
import {CellStatus} from '../enums/cell-status.enum';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private _board: Cell[][];

  private _timerValue: number;
  private _timerToken: number;

  private _userScore: number = 0;
  private _compScore: number = 0;

  private _gameOverSubject: BehaviorSubject<boolean>;

  constructor() {
    this.initBoard();
  }

  get board(): Cell[][] {
    return this._board;
  }

  get userScore(): number {
    return this._userScore;
  }

  get compScore(): number {
    return this._compScore;
  }

  startGame(timerValue: number): BehaviorSubject<boolean> {
    if (this._gameOverSubject) return this._gameOverSubject;

    this.clear();

    this._gameOverSubject = new BehaviorSubject<boolean>(false);
    this._timerValue = timerValue;
    this.startIterations();

    return this._gameOverSubject;
  }

  isGameOver(): boolean {
    return this._userScore === 10 || this._compScore === 10;
  }

  userClick(row: number, col: number): number {
    if (this.isActive(row, col)) {
      this.clearTimeOut();
      this.setUserClick(row, col);
      this.nextIteration();
      return;
    }
  }

  private clear() {
    this._userScore = this._compScore = 0;
    this.initBoard();
  }

  private startIterations() {
    this.nextIteration();
  }

  private nextIteration() {
    if (this.isGameOver()) {

      this._gameOverSubject.next(true);
      this._gameOverSubject.complete();

      this._gameOverSubject = undefined;

      return;
    }

    let cell = this.generateNewCell();
    this.setCellActive(cell.row, cell.col);

    this.setTimeOut(() => {
      this.setCompClick(cell.row, cell.col);
      this.nextIteration();
    }, this._timerValue);
  }

  private setTimeOut(handler: Function, timerValue: number) {
    this._timerToken = setTimeout(handler, timerValue);
  }

  private clearTimeOut() {
    clearTimeout(this._timerToken);
  }

  private generateNewCell(): { row: number, col: number } {
    let i = this.generateNum();
    let j = this.generateNum();
    if (this.isUsed(i, j)) return this.generateNewCell();

    return {row: i, col: j};
  }

  private generateNum(): number {
    return Math.floor(Math.random() * 10);
  }

  private isUsed(i: number, j: number): boolean {
    return !(this.board[i][j].status === CellStatus.NotActive);
  }

  private isActive(row: number, col: number): boolean {
    return this.board[row][col].status === CellStatus.Active;
  }

  private setCellActive(i: number, j: number) {
    this.board[i][j].status = CellStatus.Active;
  }

  private setCompClick(i: number, j: number) {
    this._compScore += 1;
    this.board[i][j].status = CellStatus.ComputerClick;
  }

  private setUserClick(i: number, j: number) {
    this._userScore += 1;
    this.board[i][j].status = CellStatus.UserClick;
  }

  private initBoard() {
    this._board = [];

    for (let i: number = 0; i < 10; i++) {
      this._board[i] = [];
      for (let j: number = 0; j < 10; j++) {
        this._board[i][j] = new Cell(CellStatus.NotActive);
      }
    }
  }
}
