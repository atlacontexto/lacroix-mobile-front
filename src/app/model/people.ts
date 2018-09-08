import { AddressModel } from "./addressModel";

export class People {
  private _id: string;
  private name: string;
  private user: string;
  private address: AddressModel;

  constructor(jsonString?: string) {
    // let jsonObj: any = JSON.parse(jsonString);
    // for (let prop in jsonObj) {
    //   this[prop] = jsonObj[prop];
    // }
  }

  /**
   * Getter id
   * @return {string}
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Getter $name
   * @return {string}
   */
  public get $name(): string {
    return this.name;
  }

  /**
   * Getter $user
   * @return {string}
   */
  public get $user(): string {
    return this.user;
  }

  /**
   * Getter $address
   * @return {AddressModel}
   */
  public get $address(): AddressModel {
    return this.address;
  }

  /**
   * Setter id
   * @param {string} value
   */
  public set id(value: string) {
    this._id = value;
  }

  /**
   * Setter $name
   * @param {string} value
   */
  public set $name(value: string) {
    this.name = value;
  }

  /**
   * Setter $user
   * @param {string} value
   */
  public set $user(value: string) {
    this.user = value;
  }

  /**
   * Setter $address
   * @param {AddressModel} value
   */
  public set $address(value: AddressModel) {
    this.address = value;
  }
}
