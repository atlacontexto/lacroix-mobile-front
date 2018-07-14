import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import subjectsEf from "../../fakedb/subjects";

/*
  Generated class for the SubjectsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SubjectsProvider {
  subjectsEf;
  constructor(public http: HttpClient) {
    this.subjectsEf = subjectsEf;
  }

  getSubjectsFake() {
    return this.subjectsEf.subjectsEf;
  }
}
