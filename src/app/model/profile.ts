export class Profile {
  private _id: string;
  private createdAt: Date;
  private icon: string;
  private profileType: string;
  private kinship: any;
  showType: string;

  constructor() {}

  getProfileType(): string {
    return this.profileType;
  }

  getKinship(): string {
    return this.kinship;
  }
  getId(): string {
    return this._id;
  }

  getShowType(): string {
    if (this.profileType === "ProfileProfessor") {
      this.showType = "Professor";
    } else if (this.profileType === "ProfileParent") {
      this.showType = "Família";
    } else if (this.profileType === "ProfileStudent") {
      this.showType = "Aluno";
    }
    return this.showType;
  }

  update(number: number) {}
}
