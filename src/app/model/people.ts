import { AddressModel } from "./addressModel";

export class People {
  _id: string;
  name: string;
  user: string;
  private address: AddressModel;
  constructor(jsonString?: string) {
    // let jsonObj: any = JSON.parse(jsonString);
    // for (let prop in jsonObj) {
    //   this[prop] = jsonObj[prop];
    // }
  }
}
