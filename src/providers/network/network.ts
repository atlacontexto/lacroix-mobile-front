import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Network } from "@ionic-native/network";

/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkProvider {
  constructor(public http: HttpClient, public network: Network) {
    this.network.onConnect().subscribe(
      data => {
        console.log(data);
      },
      error => console.error(error)
    );

    this.network.onDisconnect().subscribe(
      data => {
        console.log(data);
      },
      error => console.error(error)
    );
  }
}
