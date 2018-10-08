import { Profile } from "./profile";
import { People } from "./people";
import { ProfilesProvider } from "../../providers/profiles/profiles";
import { ContactModel } from "./contactModel";

export class User {
  private _id: number;
  private profiles: Profile[] = new Array<Profile>();
  private people: People;
  private mainProfile: string;
  private shortName: string;
  private mainContact: ContactModel;

  constructor(public profilesProvider?: ProfilesProvider) {}

  /**
   * Getter $people
   * @return {People}
   */
  public get $people(): People {
    return this.people;
  }

  /**
   * Setter $people
   * @param {People} value
   */
  public set $people(value: People) {
    this.people = Object.assign(new People(), value);
  }

  /**
   * Getter $shortName
   * @return {string}
   */
  public get $shortName(): string {
    return this.shortName;
  }

  /**
   * Setter $shortName
   * @param {string} value
   */
  public set $shortName(value: string) {
    this.shortName = value;
  }

  /**
   * Getter id
   * @return {number}
   */
  public get id(): number {
    return this._id;
  }

  /**
   * Setter id
   * @param {number} value
   */
  public set id(value: number) {
    this._id = value;
  }

  /**
   * Getter $mainProfile
   * @return {string}
   */
  public get $mainProfile(): string {
    return this.mainProfile;
  }

  /**
   * Setter $mainProfile
   * @param {string} value
   */
  public set $mainProfile(value: string) {
    this.mainProfile = value;
  }

  /**
   * Getter $mainContact
   * @return {ContactModel}
   */
  public get $mainContact(): ContactModel {
    return this.mainContact;
  }

  /**
   * Setter $mainContact
   * @param {ContactModel} value
   */
  public set $mainContact(value: ContactModel) {
    this.mainContact = Object.assign(new ContactModel(), value);
  }

  hasProfiles(): boolean {
    return this.profiles.length > 0;
  }

  getProfiles(): Profile[] {
    return this.profiles;
  }

  setProfiles(profiles: any): any {
    console.log(profiles);
    this.profiles = new Array();
    if (profiles) {
      profiles.forEach(element => {
        let profile = Object.assign(new Profile(), element);
        if (element._id == this.$mainProfile) {
          profile.$main = true;
        }
        this.profiles.push(profile);
      });
      console.log(this.profiles);
      this.profilesProvider.listProfiles.next(this.profiles);
    }
  }

  getMainProfileAsProfile(): Profile {
    let a = this.profiles.find(profile => {
      return profile.id === this.mainProfile;
    });
    return a;
  }
}
