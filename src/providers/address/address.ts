import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthProvider } from "../auth/auth";
import { Platform } from "ionic-angular";
import { ENV } from "@environment";

/*
  Generated class for the AddressProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AddressProvider {
  private apiUrl = ENV.API_LOCAL;
  headers: { headers: { "x-access-token": string } };

  constructor(
    public http: HttpClient,
    private authProvider: AuthProvider,
    platform: Platform
  ) {
    console.log("Hello AddressProvider Provider");
    if (platform.is("cordova")) {
      this.apiUrl = ENV.API_ENDPOINT;
    }
    this.authProvider.isLoggedIn.subscribe(value => {
      if (value) {
        this.headers = {
          headers: { "x-access-token": localStorage.getItem("token") }
        };
      }
    });
  }

  searchCEP(cep: any): Promise<any> {
    return new Promise((resolve, reject) => {
      // Nova variável "cep" somente com dígitos.
      cep = cep.replace(/\D/g, "");

      // Verifica se campo cep possui valor informado.
      if (cep !== "") {
        // Expressão regular para validar o CEP.
        const validacep = /^[0-9]{8}$/;

        // Valida o formato do CEP.
        if (validacep.test(cep)) {
          this.http.get(`//viacep.com.br/ws/${cep}/json`).subscribe(
            response => {
              resolve(response);
            },
            error => {
              reject(error);
            }
          );
        }
      }
    });
  }

  getCurrentUserAdrress(): Promise<any> {
    console.log("here?promise");
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.apiUrl}/address/address-info`, this.headers)
        .subscribe(
          response => {
            console.log("here?resolve");

            resolve(response["data"]["address"]);
          },
          error => {
            console.log("here?reject");

            reject(error);
          }
        );
    });
  }

  updateCurrentUserAddress(address: any): Promise<any> {
    console.log(address);
    return new Promise((resolve, reject) => {
      this.http
        .put(`${this.apiUrl}/address/address-info`, address, this.headers)
        .subscribe(
          response => {
            resolve(response["data"]["address"]);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  createCurrentUserAddress(address: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.apiUrl}/address/address-info`, address, this.headers)
        .subscribe(
          response => {
            resolve(response["data"]["address"]);
          },
          error => {
            reject(error);
          }
        );
    });
  }
}
