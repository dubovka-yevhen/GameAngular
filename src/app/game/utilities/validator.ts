export class Validator {
  static isPositiveNumber(value: string): boolean {
    let regexp = new RegExp('[1-9][0-9]*');
    return regexp.test(value);
  }
  static isOnlyDigits(value: string): boolean{
    let regexp = new RegExp('^[0-9]*$');
    return regexp.test(value);
  }
}
