import { Profile } from "./profile";

export class ProfileSchoolInstitutional extends Profile {
  private inep_properties: Object;
  private institution: any;
  private countyInstitutional: any;
  private school_managers: any;
  private students: any;

  constructor() {
    super();
  }

  /**
   * Getter $countyInstitutional
   * @return {any}
   */
  public get $countyInstitutional(): any {
    return this.countyInstitutional;
  }

  /**
   * Getter $school_managers
   * @return {any}
   */
  public get $school_managers(): any {
    return this.school_managers;
  }

  /**
   * Getter $students
   * @return {any}
   */
  public get $students(): any {
    return this.students;
  }

  /**
   * Setter $countyInstitutional
   * @param {any} value
   */
  public set $countyInstitutional(value: any) {
    this.countyInstitutional = value;
  }

  /**
   * Setter $school_managers
   * @param {any} value
   */
  public set $school_managers(value: any) {
    this.school_managers = value;
  }

  /**
   * Setter $students
   * @param {any} value
   */
  public set $students(value: any) {
    this.students = value;
  }

  /**
   * Getter $inep_properties
   * @return {Object}
   */
  public get $inep_properties(): Object {
    return this.inep_properties;
  }

  /**
   * Getter $institution
   * @return {string}
   */
  public get $institution(): string {
    return this.institution;
  }

  /**
   * Setter $inep_properties
   * @param {Object} value
   */
  public set $inep_properties(value: Object) {
    this.inep_properties = value;
  }

  /**
   * Setter $institution
   * @param {string} value
   */
  public set $institution(value: string) {
    this.institution = value;
  }
}
