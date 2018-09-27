/**
 * objekt transakce
 */
export class Transaction {
  private _amount: number;
  private _subject;
  private _date: Date;
  private _id: number;

  /**
   * @param {number} amount
   * @param {string} subject
   * @param {Date} date
   * @param {number} id
   */
  constructor(amount: number, subject: string, date: Date, id?: number) {
    this.amount = amount;
    this.subject = subject;
    this.date = date;
    this.id = id;
  }
  get amount(): number {
    return this._amount;
  }
  set amount(value: number) {
    this._amount = value;
  }
  get subject() {
    return this._subject;
  }
  set subject(value) {
    this._subject = value;
  }
  get date() {
    return this._date;
  }
  set date(value) {
    this._date = value;
  }
  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
}
