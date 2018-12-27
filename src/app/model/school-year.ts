import { Period } from "./period";

export class SchoolYear {
  private _id: String;
  private year: Date;
  private county: String;
  private createdBy: String;
  private regime: String;
  private periods: Period[];
  constructor() {}

  /**
   * Getter id
   * @return {String}
   */
  public get id(): String {
    return this._id;
  }

  /**
   * Getter $year
   * @return {Date}
   */
  public get $year(): Date {
    return this.year;
  }

  /**
   * Getter $county
   * @return {String}
   */
  public get $county(): String {
    return this.county;
  }

  /**
   * Getter $createdBy
   * @return {String}
   */
  public get $createdBy(): String {
    return this.createdBy;
  }

  /**
   * Getter $regime
   * @return {String}
   */
  public get $regime(): String {
    return this.regime;
  }

  /**
   * Getter $periods
   * @return {Period[]}
   */
  public get $periods(): Period[] {
    return this.periods;
  }

  /**
   * Setter id
   * @param {String} value
   */
  public set id(value: String) {
    this._id = value;
  }

  /**
   * Setter $year
   * @param {Date} value
   */
  public set $year(value: Date) {
    this.year = value;
  }

  /**
   * Setter $county
   * @param {String} value
   */
  public set $county(value: String) {
    this.county = value;
  }

  /**
   * Setter $createdBy
   * @param {String} value
   */
  public set $createdBy(value: String) {
    this.createdBy = value;
  }

  /**
   * Setter $regime
   * @param {String} value
   */
  public set $regime(value: String) {
    this.regime = value;
  }

  /**
   * Setter $periods
   * @param {Period[]} value
   */
  public set $periods(value: Period[]) {
    this.periods = value;
  }
}
