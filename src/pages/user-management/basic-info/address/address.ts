import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AddressProvider } from "../../../../providers/address/address";
import { GeoProvider } from "../../../../providers/geo/geo";
import { UserProvider } from "../../../../providers/user/user";
import { AlertController, LoadingController } from "ionic-angular";

/**
 * Generated class for the AddressComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "user-address",
  templateUrl: "address.html"
})
export class AddressComponent implements OnInit, OnDestroy {
  text: string;
  addressForm: FormGroup;
  states: any;

  constructor(
    private formBuilder: FormBuilder,
    private _addressProvider: AddressProvider,
    private _geoProvider: GeoProvider,
    private _userProvider: UserProvider,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    console.log("Hello AddressComponent Component");
    this.text = "Hello World";
  }

  ngOnDestroy(): void {}
  ngOnInit(): void {
    let getLoading = this.loadingCtrl.create({
      content: "Buscando..."
    });
    getLoading.present();
    this.states = this._geoProvider.getStates(0);
    this.addressForm = this.formBuilder.group({
      street: [null, Validators.required],
      number: [null, Validators.required],
      complement: [null],
      block: [null],
      cep: [null, Validators.required],
      county: [null, Validators.required],
      uf: [null, Validators.required]
    });

    if (this._userProvider.user.value.$people.$address) {
      this._addressProvider
        .getCurrentUserAdrress()
        .then(address => {
          if (address) {
            this.addressForm.controls["street"].setValue(address.street);
            this.addressForm.controls["number"].setValue(address.number);
            this.addressForm.controls["complement"].setValue(
              address.complement
            );
            this.addressForm.controls["block"].setValue(address.block);
            this.addressForm.controls["cep"].setValue(address.cep);
            this.addressForm.controls["county"].setValue(address.county);
            this.addressForm.controls["uf"].setValue(address.uf);
          }
          getLoading.dismiss();
        })
        .catch(err => {
          console.log(err);
          getLoading.dismiss();
          let getFailed = this.alertCtrl.create({
            title: "Erro na busca",
            message:
              "Ocorreu um erro na busca por suas informações de Endereço. Por favor, tente novamente mais tarde.",
            buttons: ["Ok"]
          });
          getFailed.present();
        });
    } else {
      getLoading.dismiss();
    }
  }

  searchCEP() {
    console.log(this.addressForm.get("cep"));
    this._addressProvider
      .searchCEP(this.addressForm.value.cep)
      .then(address => {
        console.log(address);
        this.addressForm.controls["street"].setValue(address.logradouro);
        this.addressForm.controls["complement"].setValue(address.complemento);
        this.addressForm.controls["block"].setValue(address.bairro);
        this.addressForm.controls["county"].setValue(address.localidade);
        this.addressForm.controls["uf"].setValue(address.uf);
      })
      .catch(error => {
        console.log(error);
      });
  }

  onSubmit() {
    if (this.addressForm.valid) {
      if (
        this._userProvider.user.value.$people &&
        this._userProvider.user.value.$people.$address
      ) {
        console.log("update");
        this._addressProvider
          .updateCurrentUserAddress(this.addressForm.value)
          .then(() => {
            let updateSuccess = this.alertCtrl.create({
              title: "Endereço atualizado com sucesso!",
              message: "Seu endereço foi atualizado com sucesso.",
              buttons: ["OK"]
            });
            updateSuccess.present();
          })
          .catch(err => {
            console.log(err);
            let updateError = this.alertCtrl.create({
              title: "Erro na atualização",
              message:
                "Ocorreu um erro interno na atualização do seu endereço. Tente Novamente mais tarde.",
              buttons: ["OK"]
            });
            updateError.present();
          });
      } else {
        console.log("create");
        this._addressProvider
          .createCurrentUserAddress(this.addressForm.value)
          .then(() => {
            let createSucess = this.alertCtrl.create({
              title: "Endereço cadastrado com sucesso!",
              message: "Seu novo endereço foi registrado com sucesso.",
              buttons: ["OK"]
            });
            createSucess.present();
          })
          .catch(err => {
            console.log(err);
            let createError = this.alertCtrl.create({
              title: "Erro na criação",
              message:
                "Ocorreu um erro interno no cadastro do seu endereço. Tente Novamente mais tarde.",
              buttons: ["OK"]
            });
            createError.present();
          });
      }
    } else {
      let addressAlert = this.alertCtrl.create({
        title: "Endereço Inválido",
        message:
          "Suas informações estão incompletas. Por favor, verifique e corrija.",
        buttons: ["OK"]
      });
      addressAlert.present();
    }
  }
}
