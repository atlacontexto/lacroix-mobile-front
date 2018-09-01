import { Profile } from "./profile";
import { People } from "./people";
import { ProfilesProvider } from "../../providers/profiles/profiles";

export class User {
  private _id: number;
  private profiles: Profile[] = new Array<Profile>();
  private people: People;
  private mainProfile: any;
  private shortName: any;

  constructor(public profilesProvider?: ProfilesProvider) {}

  setProfiles(profiles: any): any {
    if (profiles) {
      profiles.forEach(element => {
        let profile = Object.assign(new Profile(), element);
        this.profiles.push(profile);
      });
      this.profilesProvider.listProfiles.next(this.profiles);
    }
  }

  setPeople(people: any): any {
    if (people) {
      this.people = Object.assign(new People(), people);
    }
  }

  getPeople(): People {
    return this.people;
  }

  setShortName(shortname: any): any {
    this.shortName = shortname;
  }

  setId(id: any): any {
    this._id = id;
  }

  getProfiles(): Profile[] {
    return this.profiles;
  }

  setMainProfile(id: any): any {
    this.mainProfile = id;
  }

  getMainProfile(): Profile {
    let a = this.profiles.find(profile => {
      return profile.getId() === this.mainProfile;
    });
    return a;
  }

  getShortName(): string {
    return this.shortName;
  }
}
