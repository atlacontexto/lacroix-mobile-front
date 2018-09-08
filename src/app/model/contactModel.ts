export class ContactModel {
  private _id: string;
  private type: string;
  private checked: boolean;
  private address: string;
  constructor() {}

  /**
   * Getter $address
   * @return {string}
   */
  public get $address(): string {
    return this.address;
  }

  /**
   * Setter $address
   * @param {string} value
   */
  public set $address(value: string) {
    this.address = value;
  }

  /**
   * Getter $type
   * @return {string}
   */
  public get $type(): string {
    return this.type;
  }

  /**
   * Setter $type
   * @param {string} value
   */
  public set $type(value: string) {
    this.type = value;
  }

  /**
   * Getter $checked
   * @return {boolean}
   */
  public get $checked(): boolean {
    return this.checked;
  }

  /**
   * Setter $checked
   * @param {boolean} value
   */
  public set $checked(value: boolean) {
    this.checked = value;
  }
}
