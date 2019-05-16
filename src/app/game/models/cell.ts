import {CellStatus} from '../enums/cell-status.enum';

export class Cell {
  private _status: CellStatus;

  constructor(status: CellStatus) {
    this._status = status;
  }

  get status(): CellStatus {
    return this._status;
  }

  set status(value: CellStatus) {
    this._status = value;
  }
}
